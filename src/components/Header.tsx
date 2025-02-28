import React from 'react'
import header from "@/styles/modules/header.module.scss"
import CartSvg from "/assets/icons/cart.svg"
export default function Header() {
  return (
    <div className={header.container}>
        <div className={header.iconContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" className={header.icon} viewBox="0 0 448 448" fill='currentColor'>
            {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
            <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
            </svg>
        </div>
        <div className={header.rightContainer}>
            <a href="#" className={header.link}>
                GeorgeHub Shopping
            </a>
            <div className={header.iconContainer}>
              <CartSvg/>
            </div>
        </div>
    </div>
  )
}
