import { Navigate } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/layout/Section";

export function AdminLoginPage() {
  const { session, isAdmin, isLoading } = useAuth();
  if (!isLoading && session && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Container>
      <Section className="flex justify-center">
        <Card className="w-full max-w-md">
          <h1 className="mb-6 text-2xl font-semibold">Admin Sign In</h1>
          <LoginForm />
        </Card>
      </Section>
    </Container>
  );
}

