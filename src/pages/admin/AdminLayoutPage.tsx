import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ADMIN_LOGIN_PATH } from "@/app/routes/adminPaths";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/messages", label: "Messages" },
];

export function AdminLayoutPage() {
  const navigate = useNavigate();
  const { logout, isLoggingOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out.");
      navigate(ADMIN_LOGIN_PATH);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign out.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-white">
      <header className="border-b border-border">
        <Container className="flex h-16 items-center justify-between">
          <Link to="/" className="font-semibold text-primary">
            &lt;- Public Site
          </Link>
          <Button variant="secondary" onClick={handleLogout} isLoading={isLoggingOut}>
            Sign Out
          </Button>
        </Container>
      </header>
      <Container className="grid gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border border-border bg-surface/70 p-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-3 py-2 text-sm text-muted transition hover:bg-slate-800 hover:text-white",
                    isActive && "bg-slate-800 text-white",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </Container>
    </div>
  );
}
