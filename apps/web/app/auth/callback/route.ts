import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client"; // Adjust path if needed
import { encrypt } from "@/lib/encryption"; // Adjust path if needed

import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    if (data.session) {
      const { user, session } = data;
      const { provider_token, provider_refresh_token, expires_in } = session;

      // Check if this was a "Connect" flow by looking for the refresh token.
      if (provider_token && provider_refresh_token) {
        try {
          // Encrypt the tokens before storing
          const encryptedAccessToken = encrypt(provider_token);
          const encryptedRefreshToken = encrypt(provider_refresh_token);

          // Calculate the expiry date
          const tokenExpiresAt = new Date(Date.now() + expires_in! * 1000);

          // Use Prisma's upsert to create or update the integration
          await prisma.integration.upsert({
            where: {
              // Your unique constraint
              userId_provider: {
                userId: user.id,
                provider: "gmail", // Matches your enum
              },
            },
            update: {
              // Fields to update if the integration already exists
              accessToken: encryptedAccessToken,
              refreshToken: encryptedRefreshToken,
              tokenExpiresAt: tokenExpiresAt,
              scopes: session.user.user_metadata?.scopes || [],
              isActive: true,
              lastSyncAt: new Date(),
            },
            create: {
              // Fields to set when creating a new integration
              userId: user.id,
              provider: "gmail",
              email: user.email, // The primary email of the Supabase user
              accessToken: encryptedAccessToken,
              refreshToken: encryptedRefreshToken,
              tokenExpiresAt: tokenExpiresAt,
              scopes: session.user.user_metadata?.scopes || [],
              providerAccountId: user.id,
              isActive: true,
            },
          });
          console.log(
            `Successfully upserted Gmail integration for user ${user.id}`
          );
        } catch (prismaError) {
          console.error("Prisma Error saving integration:", prismaError);
          // Redirect to an error page if the database operation fails
          return NextResponse.redirect(`${origin}/auth/auth-code-error`);
        } finally {
          await prisma.$disconnect();
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
