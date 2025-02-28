import React from "react";
import header from "@/styles/modules/header.module.scss";
import MenuSvg from "/assets/icons/menu.svg";
import CartSvg from "/assets/icons/cart.svg";
export default function Header({ openSidebar }) {
  return (
    <div className={header.container}>
      <div className={header.iconContainer} onClick={openSidebar}>
        <MenuSvg />
      </div>
      <div className={header.rightContainer}>
        <a href="#" className={header.link}>
          GeorgeHub Shopping
        </a>
        <div className={header.iconContainer}>
          <CartSvg />
          <span className={header.dot}></span>
        </div>
      </div>
    </div>
  );
}
