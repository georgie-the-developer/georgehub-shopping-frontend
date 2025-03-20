"use client";
import sidebar from "@/styles/modules/sidebar.module.scss";
import CloseSvg from "@/assets/icons/close.svg";
import MoonSvg from "@/assets/icons/moon.svg";
import SunSvg from "@/assets/icons/sun.svg";
import SidebarLinks from "./SidebarLinks";
import { useTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
export default function Sidebar({ isOpen, closeSidebar }) {
  const { toggleTheme, darkTheme } = useTheme();
  const { user } = useUser();
  return (
    <div
      className={`${sidebar.container} ${
        isOpen ? sidebar.open : sidebar.closed
      }`}
    >
      <div className={sidebar.overflow} onClick={closeSidebar}></div>
      <div className={sidebar.contents}>
        <div className={sidebar.headerContainer}>
          <div className={sidebar.header}>GeorgeHub Shopping</div>
          <div className={sidebar.iconContainer} onClick={closeSidebar}>
            <CloseSvg />
          </div>
        </div>
        <div className={sidebar.themeToggleContainer}>
          <div className={sidebar.themeIconContainer} onClick={toggleTheme}>
            {darkTheme ? <SunSvg /> : <MoonSvg />}
          </div>
        </div>
        <div className={sidebar.linksContainer}>
          <SidebarLinks userRole={user.role} />
        </div>
      </div>
    </div>
  );
}
