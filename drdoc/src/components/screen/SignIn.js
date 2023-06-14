import React, { useState, useContext, useEffect } from "react";
import "../css/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../../context/LoginContext";

export default function SignIn() {
  const token = localStorage.getItem("jwt");
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    }
    // Sending data to server
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          setUserLogin(true);
          navigate("/home");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        console.log(data);
      });
  };

  return (
    <div className="signBackground">
      {!token ? (
        <div className="signIn">
          <div>
            <div className="loginForm form-container">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <input
                type="submit"
                id="login-btn"
                onClick={() => {
                  postData();
                }}
                value="Sign In"
              />
            </div>
            <div className="loginForm2">
              Don't have an account ?
              <Link to="/signup">
                <span style={{ color: "blue", cursor: "pointer" }}>
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
