"use client";
import { AuthProvider } from "@/lib/hooks/useAuth";

export default function AuthClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
