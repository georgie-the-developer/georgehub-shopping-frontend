import React from "react";
import pageError from "@/styles/modules/page-error.module.scss";
export default function NotFound() {
  return (
    <div className={pageError.container}>
      <span className={pageError.heading}>404</span>
      <span className={pageError.border}></span>
      <span className={pageError.text}>This page can't be found.</span>
    </div>
  );
}
