import type { MouseEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ADMIN_LOGIN_PATH } from "@/app/routes/adminPaths";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
];

export function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!event.shiftKey) {
      return;
    }

    event.preventDefault();
    if (event.detail >= 2) {
      navigate(ADMIN_LOGIN_PATH);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="text-lg font-bold tracking-tight text-white"
        >
          dev<span className="text-primary">folio</span>
        </Link>
        <nav className="flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm text-muted transition hover:text-white",
                  isActive && "bg-surface text-white",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href="/htoo-aung-lin-cv.pdf"
            download="htoo_aung_lin_cv.pdf"
            className="rounded-md px-3 py-2 text-sm text-muted transition hover:text-white"
          >
            Download CV
          </a>
        </nav>
      </Container>
    </header>
  );
}
