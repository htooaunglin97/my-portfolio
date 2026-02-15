import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/loginSchema";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuth();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginInput) => {
    try {
      await login(values);
      toast.success("Signed in successfully.");
      navigate("/admin");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in.";
      toast.error(message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-200" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" placeholder="admin@portfolio.dev" {...form.register("email")} />
        {form.formState.errors.email ? (
          <p className="text-xs text-red-300">{form.formState.errors.email.message}</p>
        ) : null}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-200" htmlFor="password">
          Password
        </label>
        <Input id="password" type="password" placeholder="********" {...form.register("password")} />
        {form.formState.errors.password ? (
          <p className="text-xs text-red-300">{form.formState.errors.password.message}</p>
        ) : null}
      </div>
      <Button type="submit" className="w-full" isLoading={isLoggingIn}>
        Sign In
      </Button>
    </form>
  );
}
