import React from "react";
import Button from "../Button/Button";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <Button
        isNavLink="true"
        label="Virtual Education System"
        classes="logo"
        href="/"
      />
      <Button
        isNavLink="true"
        label="Register"
        classes="nav-link btn btn-primary"
        href="/register"
      />
      <Button
        isNavLink="true"
        label="Login"
        classes="nav-link btn btn-primary"
        href="/login"
      />
      <Button
        isNavLink="true"
        label="Home"
        classes="nav-link btn btn-primary"
        href="/"
      />
    </div>
  );
}
