import { createClient } from "@/utils/supabase/server";

export async function getUserIdFromAuth(): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user.id;
}
