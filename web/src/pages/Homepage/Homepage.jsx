import React from "react";
import "./homepage.css";

export default function Homepage() {
  return (
    <>
      <div className="container">
        <img
          alt="design"
          src={process.env.PUBLIC_URL + "/images/homepage.png"}
        />
        <div className="welcome-card">
          <div className="card-head">
            <h1>Welcome</h1>
            <hr className="divider" />
          </div>
          <div className="card-body">
            Already have an account ? <br />
            <a href="/login" className="btn btn-primary">
              Login
            </a>
          </div>
          <div className="card-body">
            Create New Account ? <br />
            <a href="/register" className="btn btn-primary">
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
