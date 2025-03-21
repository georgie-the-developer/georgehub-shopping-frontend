import { useUser } from "@/contexts/UserContext";
import { forbidden } from "next/navigation";

type role = "guest" | "buyer" | "seller" | "admin";

// Grants access only to provided array of roles
export function limitAccesByRole(roles: role[]) {
  const { user } = useUser();
  if (!roles.includes(user.role)) {
    forbidden();
  }
}
