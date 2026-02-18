import { Navigate, Outlet } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function ProtectedAdminRoute() {
  const { session, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
