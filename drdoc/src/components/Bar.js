import React from "react";

import logo from "./img/logo.png";
import { Link } from "react-router-dom";

export default function Bar({ login }) {
  const loggeduser = JSON.parse(localStorage.getItem("user"));
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");

    if (login || token) {
      return [
        <>
          <Link to="/home" class="nav-item">
            <a class="nav-link" aria-current="page">
              Home
            </a>
          </Link>
          <Link to="/message" class="nav-item">
            <a class="nav-link" aria-current="page">
              Message
            </a>
          </Link>
          <Link to="/createpost" class="nav-item">
            <a class="nav-link" aria-current="page">
              CreatePost
            </a>
          </Link>
          <Link to="/store" class="nav-item">
            <a class="nav-link" aria-current="page">
              Store
            </a>
          </Link>
          <Link to={`/${loggeduser.userName}/settings`} class="nav-item">
            <a class="nav-link" aria-current="page">
              Settings
            </a>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/Signin" class="nav-item">
            <a class="nav-link" aria-current="page">
              SignIn
            </a>
          </Link>
          <Link to="/Signup" class="nav-item">
            <a class="nav-link" aria-current="page">
              SignUp
            </a>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div style={{ marginTop: "-200px", zIndex: "999" }}>
      <nav class="navbar navbar-expand-lg  header">
        <div class="container-fluid">
          <img src={logo} alt="" className="logo-image-brand " />
          <i className="nav__nav__logo">DrDoc</i>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">{loginStatus()}</ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
