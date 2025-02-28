import sidebar from "@/styles/modules/sidebar.module.scss";
import CloseSvg from "/assets/icons/close.svg";
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
          <a href="#" className={`${sidebar.link} ${sidebar.active}`}>
            Welcome
          </a>
          <a href="#" className={sidebar.link}>
            Login
          </a>
          <a href="#" className={sidebar.link}>
            Register
          </a>
          <a href="#" className={sidebar.link}>
            Home (Browse only)
          </a>
        </div>
      </div>
    </div>
  );
}
