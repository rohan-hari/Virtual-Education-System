import React from "react";
import "./authPage.css";

export default function Login() {
  return (
    <>
      <div className="form-align">
        <form className="form-box" action="/user/login" method="POST">
          <h1>Login</h1>
          <label className="pure-material-textfield-outlined">
            <input
              placeholder=" "
              type="email"
              id="email"
              name="email"
              required
            />
            <span>Email</span>
          </label>
          <label className="pure-material-textfield-outlined">
            <input
              placeholder=" "
              type="password"
              id="password"
              name="password"
              required
            />
            <span>Password</span>
            <span
              toggle="#password"
              className="far fa-eye field-icon toggle-password"
            ></span>
          </label>
          <div className="form-button">
            <a className="btn btn-primary" href="/user/register">
              Create an Account
            </a>
            <button className="btn btn-primary-contained" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
