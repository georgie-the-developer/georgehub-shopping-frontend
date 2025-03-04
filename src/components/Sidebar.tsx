"use client";
import sidebar from "@/styles/modules/sidebar.module.scss";
import CloseSvg from "/assets/icons/close.svg";
import SidebarLinks from "./SidebarLinks";
export default function Sidebar({ isOpen, closeSidebar }) {
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
        <div className={sidebar.linksContainer}>
          <SidebarLinks userRole={"guest"} />
        </div>
      </div>
    </div>
  );
}
