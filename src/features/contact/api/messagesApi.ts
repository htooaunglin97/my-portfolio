import { supabase } from "@/lib/supabase";
import type { ContactInput } from "@/features/contact/schemas/contactSchema";
import type { Message } from "@/features/contact/types/message";

export async function createMessage(input: ContactInput) {
  const { error } = await supabase.from("messages").insert(input);
  if (error) {
    throw new Error(error.message);
  }
}

export async function getMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

