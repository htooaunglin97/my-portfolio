import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSession,
  isCurrentUserAdmin,
  signInWithEmail,
  signOutSession,
} from "@/features/auth/api/authApi";
import { supabase } from "@/lib/supabase";
import type { LoginInput } from "@/features/auth/schemas/loginSchema";

const AUTH_SESSION_QUERY_KEY = ["auth", "session"] as const;
const AUTH_ADMIN_QUERY_KEY = ["auth", "isAdmin"] as const;

export function useAuth() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, session);
      queryClient.invalidateQueries({ queryKey: AUTH_ADMIN_QUERY_KEY });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  const sessionQuery = useQuery({
    queryKey: AUTH_SESSION_QUERY_KEY,
    queryFn: getSession,
  });

  const adminQuery = useQuery({
    queryKey: AUTH_ADMIN_QUERY_KEY,
    queryFn: isCurrentUserAdmin,
    enabled: Boolean(sessionQuery.data),
  });

  const loginMutation = useMutation({
    mutationFn: (input: LoginInput) => signInWithEmail(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
      await queryClient.invalidateQueries({ queryKey: AUTH_ADMIN_QUERY_KEY });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: signOutSession,
    onSuccess: async () => {
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, null);
      queryClient.setQueryData(AUTH_ADMIN_QUERY_KEY, false);
    },
  });

  return {
    session: sessionQuery.data ?? null,
    isLoading: sessionQuery.isLoading || adminQuery.isLoading,
    isAdmin: adminQuery.data ?? false,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}

