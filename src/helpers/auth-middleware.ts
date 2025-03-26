import { useUser } from "@/contexts/UserContext";
import { forbidden, redirect } from "next/navigation";

type role = "guest" | "buyer" | "seller" | "admin";

// Grants access only to provided array of roles
export function useLimitAccessByRole(roles: role[]) {
  const { user } = useUser();
  if (!roles.includes(user.role)) {
    forbidden();
  }
}
export function useRedirectByRole(roles: role[], redirectRoute: string) {
  const { user } = useUser();
  if (roles.includes(user.role)) redirect(redirectRoute);
}
