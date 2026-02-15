import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/layout/Section";

export function NotFoundPage() {
  return (
    <Container>
      <Section className="text-center">
        <h1 className="mb-3 text-4xl font-bold">404</h1>
        <p className="mb-6 text-muted">The page you requested does not exist.</p>
        <Link to="/">
          <Button>Return Home</Button>
        </Link>
      </Section>
    </Container>
  );
}

