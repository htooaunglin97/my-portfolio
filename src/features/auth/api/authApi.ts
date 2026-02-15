import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { LoginInput } from "@/features/auth/schemas/loginSchema";

export async function signInWithEmail(input: LoginInput) {
  const { error } = await supabase.auth.signInWithPassword(input);
  if (error) {
    throw new Error(error.message);
  }
}

export async function signOutSession() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  return data.session;
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    throw new Error(userError.message);
  }
  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}

