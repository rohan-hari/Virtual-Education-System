import React from "react";
import { NavLink } from "react-router-dom";
import "./button.css";

export default function Button({ classes, href, label, isNavLink = "false" }) {
  return (
    <>
      {isNavLink === "true" ? (
        <NavLink className={`${classes}`} to={href}>
          {label}
        </NavLink>
      ) : (
        <a className={classes} href={href}>
          {label}
        </a>
      )}
    </>
  );
}
