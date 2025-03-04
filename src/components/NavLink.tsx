"use client";
import { usePathname } from "next/navigation";
import sidebar from "@/styles/modules/sidebar.module.scss";
type NavLinkProps = {
  title: string;
  route: string;
};
export default function NavLink({ title, route }: NavLinkProps) {
  const isActive = usePathname() == route;
  return (
    <a
      href={route}
      className={`${sidebar.link} ${isActive ? sidebar.active : ""}`}
    >
      {title}
    </a>
  );
}
