import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useCreateMessage } from "@/features/contact/hooks/useMessages";
import { contactSchema, type ContactInput } from "@/features/contact/schemas/contactSchema";

export function ContactForm() {
  const createMessageMutation = useCreateMessage();
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      await createMessageMutation.mutateAsync(values);
      toast.success("Message sent successfully.");
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your message.";
      toast.error(message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm">
          Name
        </label>
        <Input id="name" placeholder="Your name" {...form.register("name")} />
        {form.formState.errors.name ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.name.message}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm">
          Email
        </label>
        <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} />
        {form.formState.errors.email ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.email.message}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm">
          Message
        </label>
        <Textarea id="message" placeholder="Tell me about your project..." {...form.register("message")} />
        {form.formState.errors.message ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.message.message}</p>
        ) : null}
      </div>
      <Button type="submit" isLoading={createMessageMutation.isPending}>
        Send Message
      </Button>
    </form>
  );
}

