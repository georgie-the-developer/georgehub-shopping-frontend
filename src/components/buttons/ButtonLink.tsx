import React from "react";
import buttonLink from "@/styles/modules/button-link.module.scss";
type ButtonLinkType = {
  link: string;
  text: string;
  type: "primary" | "secondary";
};
export default function ButtonLink({ link, text, type }: ButtonLinkType) {
  return (
    <a
      className={`${buttonLink.button} ${
        type === "primary" ? buttonLink.primary : buttonLink.secondary
      }`}
      href={link}
    >
      {text}
    </a>
  );
}
