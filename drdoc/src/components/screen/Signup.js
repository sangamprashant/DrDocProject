import React, { useEffect, useState } from "react";
import "../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import sendingEmail from "../lottiejson/sending-email.json";
import sentEmail from "../lottiejson/otp-message-sent.json";
import EnterOtp from "../lottiejson/enter-otp.json";

export default function SignUp() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate(); // move definition here

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);
  const [account, setAccount] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [errorPassword, seterrorPassword] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isAvailableEmail, setIsAvailableEmail] = useState(null);
  const [otpContainerOpen, setOtpContainerOpen] = useState(false);
  const [sedingOtp, setSendingOtp] = useState(false);
  const [sentOtp, setSentOtp] = useState(false);
  const [enterOtp, setEnterOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpCheckMsg, setOtpCheckMsg] = useState(false);
  const [ifSingUp, setIfSignUp] = useState(false);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    if (
      account === "" ||
      name === "" ||
      email === "" ||
      userName === "" ||
      password === ""
    ) {
      notifyA("Please enter all the fields.");
      return;
    } else {
      //checking email
      if (!emailRegex.test(email)) {
        notifyA("Invalid email");
        return;
      } else if (!passRegex.test(password)) {
        seterrorPassword(true);
        notifyA(
          "Password must contain at least 8 characters, including at least 1 number and 1 includes both lower and uppercase letters and special characters for example #,?,!"
        );
        return;
      }
      setOtpContainerOpen(true);
      setSendingOtp(true);
      setSentOtp(false);
      setEnterOtp(false);

      fetch("/api/send-email", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          name: name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB(data.message);
            setGeneratedOtp(data.otp);
            setSendingOtp(false);
            setSentOtp(true);
            setEnterOtp(false);
            delayToDisplay();
          }
        });
    }
  };
  //delay
  const delayToDisplay = () => {
    // Delay for 4 seconds before changing the containing value
    setTimeout(() => {
      setSendingOtp(false);
      setSentOtp(false);
      setEnterOtp(true);
    }, 4000);
  };
  //username avibility check
  const handelUserNameCheck = async (checkUserName) => {
    try {
      const response = await fetch("/api/check-username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: checkUserName }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsAvailable(data.available);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  //email aivbility check
  const handelEmailCheck = async (checkEmail) => {
    try {
      const response = await fetch("/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: checkEmail }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsAvailableEmail(data.available);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  //signup process begins
  const handelSingup = () => {
    const EnteredOTPInNUMBER = Number(enteredOtp);
    if (generatedOtp === EnteredOTPInNUMBER) {
      setIfSignUp(true);
      // Sending data to server
      fetch("/api/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          userName: userName,
          email: email,
          password: password,
          account: account,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB(data.message);
            navigate("/signin");
          }
          console.log(data);
        });
    } else {
      setOtpCheckMsg(true);
      setIfSignUp(false);
    }
  };

  //lottis file run
  const optionsSending = {
    loop: true,
    autoplay: true,
    animationData: sendingEmail,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const optionsSent = {
    loop: true,
    autoplay: true,
    animationData: sentEmail,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const optionsEnter = {
    loop: true,
    autoplay: true,
    animationData: EnterOtp,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="signBackground">
      {!token ? (
        <div className="signUp">
          <div className="form-container">
            {!otpContainerOpen ? (
              <>
                <div className="form">
                  <p className="loginPara">
                    Sign up to upload and store your medical documents securely.
                  </p>

                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        handelUserNameCheck(e.target.value);
                      }}
                    />
                    {isAvailable === null ? null : isAvailable ? (
                      <p style={{ color: "green" }}>Username is available</p>
                    ) : (
                      <p style={{ color: "red" }}>Username is not available</p>
                    )}
                  </div>
                  <div>
                    <select
                      value={account}
                      onChange={(e) => {
                        setAccount(e.target.value);
                      }}
                    >
                      <option value="">Select Account Type:</option>
                      <option value="regular">Regular</option>
                      <option value="doctor">Doctor</option>
                      <option value="seller">Seller</option>
                    </select>
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handelEmailCheck(e.target.value);
                      }}
                    />
                    {isAvailableEmail === null ? null : isAvailableEmail ? (
                      <p style={{ color: "green" }}>Email is available</p>
                    ) : (
                      <p style={{ color: "red" }}>Email is not available</p>
                    )}
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
                    {errorPassword && (
                      <p
                        className="loginPara"
                        style={{
                          fontSize: "12px",
                          margin: "3px 0px",
                          color: "red",
                        }}
                      >
                        "Password must contain
                        <br />
                        at least 8 characters, including 1 number
                        <br /> 1 includes both lower and uppercase letters
                        <br />
                        special characters for example #,?,!"
                      </p>
                    )}
                  </div>
                  <div>
                    <p
                      className="loginPara"
                      style={{ fontSize: "12px", margin: "3px 0px" }}
                    >
                      By signing up, you agree to out Terms, <br /> privacy
                      policy and cookies policy.
                    </p>
                  </div>
                  <div>
                    <input
                      type="submit"
                      id="submit-btn"
                      value="Register"
                      onClick={() => {
                        postData();
                      }}
                    />
                  </div>
                </div>
                <div className="form2">
                  <div>
                    Already have an account ?
                    <Link to="/signin">
                      <span style={{ color: "blue", cursor: "pointer" }}>
                        Sign In
                      </span>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="form">
                {sedingOtp && (
                  <div className="sendingGif">
                    <Lottie
                      options={optionsSending}
                      height={200}
                      width={200}
                      isPaused={false}
                      eventListeners={[
                        {
                          eventName: "complete",
                        },
                      ]}
                    />
                    <p style={{ color: "green", textAlign: "center" }}>
                      Sending Otp.
                    </p>
                  </div>
                )}
                {sentOtp && (
                  <div className="sentGif">
                    <Lottie
                      options={optionsSent}
                      height={200}
                      width={200}
                      isPaused={false}
                      eventListeners={[
                        {
                          eventName: "complete",
                        },
                      ]}
                    />
                    <p style={{ color: "green", textAlign: "center" }}>
                      {" "}
                      Otp sent.
                    </p>
                  </div>
                )}
                {enterOtp && (
                  <div className="enter-otp">
                    <Lottie
                      options={optionsEnter}
                      height={200}
                      width={200}
                      isPaused={false}
                      eventListeners={[
                        {
                          eventName: "complete",
                        },
                      ]}
                    />
                    {!ifSingUp ? (
                      <>
                        {!otpCheckMsg ? (
                          <p
                            style={{
                              color: "green",
                              textAlign: "center",
                              fontSize: "10px",
                            }}
                          >
                            {" "}
                            Enter your otp.
                          </p>
                        ) : (
                          <p
                            style={{
                              color: "red",
                              textAlign: "center",
                              fontSize: "10px",
                            }}
                          >
                            {" "}
                            Wrong otp, Please write correct otp.
                          </p>
                        )}
                      </>
                    ) : (
                      <p
                        style={{
                          color: "green",
                          textAlign: "center",
                          fontSize: "10px",
                        }}
                      >
                        {" "}
                        Creating your Account.
                      </p>
                    )}
                    <input
                      placeholder="******"
                      value={enteredOtp}
                      onChange={(e) => {
                        setEnteredOtp(e.target.value);
                      }}
                    />
                    <input
                      type="submit"
                      id="submit-btn"
                      value="Sign Up"
                      onClick={() => {
                        handelSingup();
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
