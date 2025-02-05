// app/api/auth/webhook/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { type, record } = await req.json();
  const { id, email } = record;

  if (type === "INSERT") {
    await prisma.user.create({
      data: {
        id,
        email,
      },
    });
  }

  console.log(record);

  return NextResponse.json({ success: true });
}

// {
//   type: 'INSERT',
//   table: 'users',
//   record: {
//     id: '19fa2dcd-e046-453b-ad52-22c8d8eae911',
//     aud: 'authenticated',
//     role: '',
//     email: 'emmanuel.sylvester22+1@gmail.com',
//     phone: null,
//     created_at: '2025-02-05T00:38:40.502113+00:00',
//     deleted_at: null,
//     invited_at: null,
//     updated_at: '2025-02-05T00:38:40.502113+00:00',
//     instance_id: '00000000-0000-0000-0000-000000000000',
//     is_sso_user: false,
//     banned_until: null,
//     confirmed_at: null,
//     email_change: '',
//     is_anonymous: false,
//     phone_change: '',
//     is_super_admin: null,
//     recovery_token: '',
//     last_sign_in_at: null,
//     recovery_sent_at: null,
//     raw_app_meta_data: { provider: 'email', providers: [Array] },
//     confirmation_token: '',
//     email_confirmed_at: null,
//     encrypted_password: '',
//     phone_change_token: '',
//     phone_confirmed_at: null,
//     raw_user_meta_data: {},
//     confirmation_sent_at: null,
//     email_change_sent_at: null,
//     phone_change_sent_at: null,
//     email_change_token_new: '',
//     reauthentication_token: '',
//     reauthentication_sent_at: null,
//     email_change_token_current: '',
//     email_change_confirm_status: 0
//   },
//   schema: 'auth',
//   old_record: null
// }
