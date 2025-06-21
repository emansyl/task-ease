import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export async function getUserIdFromAuth(): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user.id;
}

export async function getUserIdFromRequest(
  request: NextRequest
): Promise<string | null> {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Create a Supabase client to verify the token
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return null;
    }

    return data.user.id;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
