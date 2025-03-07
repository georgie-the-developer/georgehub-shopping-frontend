import React from "react";
import pageError from "@/styles/modules/page-error.module.scss";
export default function Forbidden() {
  return (
    <div className={pageError.container}>
      <span className={pageError.heading}>403</span>
      <span className={pageError.border}></span>
      <span className={pageError.text}>You have no access to this page</span>
    </div>
  );
}
