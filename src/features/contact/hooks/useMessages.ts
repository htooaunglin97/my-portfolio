import { useMutation, useQuery } from "@tanstack/react-query";
import { createMessage, getMessages } from "@/features/contact/api/messagesApi";
import type { ContactInput } from "@/features/contact/schemas/contactSchema";

export function useCreateMessage() {
  return useMutation({
    mutationFn: (input: ContactInput) => createMessage(input),
  });
}

export function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
}

