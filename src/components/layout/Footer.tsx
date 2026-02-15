import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row">
        <p>(c) {new Date().getFullYear()} Developer Portfolio</p>
        <p>Built with React, Supabase, and TypeScript.</p>
      </Container>
    </footer>
  );
}
