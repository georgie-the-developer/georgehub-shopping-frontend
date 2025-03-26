import React from "react";
import header from "@/styles/modules/header.module.scss";
import MenuSvg from "@/assets/icons/menu.svg";
import CartSvg from "@/assets/icons/cart.svg";
import { useUser } from "@/contexts/UserContext";
export default function Header({ openSidebar }) {
  const { user } = useUser();
  return (
    <div className={header.container}>
      <div className={header.iconContainer} onClick={openSidebar}>
        <MenuSvg />
      </div>
      <div className={header.rightContainer}>
        <a href="#" className={header.link}>
          GeorgeHub Shopping
        </a>
        {user.role == "buyer" ? (
          <div className={header.iconContainer}>
            <CartSvg />
            {/* <span className={header.dot}></span> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
