import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import UserImageGif from "./lottiejson/user.json";
import "./css/Contact.css";
import "./css/Chatcontainer.css";
import "./css/ChatComponent.css";
import { io } from "socket.io-client";

function ChatComponent() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messageContainerHinder, setMessageContainerHinder] =
    useState("hinderChat");
  const [contactContainerHinder, setContactContainerHinder] = useState("");
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const [accountType, setAccountType] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [usersSearch, setUsersSearch] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState("");
  const socket = useRef();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [accountSearch, setAccountSearch] = useState("");

  useEffect(() => {
    setMessageContainerHinder(chatOpen ? "" : "hinderChat");
    setContactContainerHinder(chatOpen ? "hinderChat" : "");
  }, [chatOpen]);

  useEffect(() => {
    setAccountType(loggedInUser.account === "doctor" ? "regular" : "doctor");
  });

  useEffect(() => {
    if (currentChatUser !== "") {
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", loggedInUser._id);
    }
  });
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          `http://localhost:5000/message/${accountType}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    }
    if (loggedInUser._id) {
      fetchUsers();
    }
  }, [accountType]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch(
          `http://localhost:5000/message/${loggedInUser._id}/${currentChatUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        const result = await response.json();
        setMessages(result);
      } catch (error) {
        console.error(error);
      }
    }

    if (currentChatUser._id) {
      fetchMessages();
    }
  }, [currentChatUser._id, loggedInUser._id]);

  const sendMessage = () => {
    const newMessage = {
      myself: true,
      message: inputMessage,
    };
    socket.current.emit("send-msg", {
      to: currentChatUser._id,
      from: loggedInUser._id,
      message: inputMessage,
    });
    fetch("http://localhost:5000/message/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        from: loggedInUser._id,
        to: currentChatUser._id,
        message: inputMessage,
      }),
    })
      .then(() => {
        setMessages([...messages, newMessage]);
        setInputMessage("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ myself: false, message: msg });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((pre) => [...pre, arrivalMessage]);
  });

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //lottis file run
  const options = {
    loop: true,
    autoplay: true,
    animationData: UserImageGif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //search user
  const handelSearch = async (value) => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          `http://localhost:5000/message/search/${accountType}/${value}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        const result = await response.json();
        setUsersSearch(result);
      } catch (error) {
        console.log(error);
      }
    }
    if (loggedInUser._id) {
      fetchUsers();
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="" id="chat3">
          <div className="">
            <div className="row ">
              {/*user*/}
              {
                <div
                  className={`col-md-12 col-lg-6 col-xl-6  mb-md-0 ${contactContainerHinder} DivideLine`}
                >
                  <div className=" ">
                    <div className="DivideBottom chatTopColor">
                      <div className="input-group rounded mb-3 ">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                          value={accountSearch}
                          onChange={(e) => {
                            setAccountSearch(e.target.value);
                            handelSearch(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div
                      data-mdb-perfect-scrollbar="true"
                      style={{
                        position: "relative",
                        height: "480px",
                        overflow: "auto",
                      }}
                    >
                      <ul className="list-unstyled mb-0 paddingForList">
                        {!accountSearch ? (
                          <>
                            {users?.map((item) => (
                              <li
                                key={item._id}
                                className="p-2 UserList"
                                onClick={() => {
                                  setChatOpen(true);
                                  setCurrentChatUser(item);
                                  setMessages([]);
                                }}
                              >
                                <a className="d-flex justify-content-between">
                                  <div className="d-flex flex-row">
                                    <div>
                                      {item.Photo ? (
                                        <img
                                          src={item.Photo}
                                          className="userProfileimg"
                                        />
                                      ) : (
                                        <div
                                          style={{
                                            width: "45px",
                                            height: "100%",
                                          }}
                                        >
                                          <Lottie
                                            options={options}
                                            height={50}
                                            width={50}
                                            isPaused={false}
                                            eventListeners={[
                                              {
                                                eventName: "complete",
                                              },
                                            ]}
                                          />
                                        </div>
                                      )}
                                      <span className="badge bg-success badge-dot"></span>
                                    </div>
                                    <div className="pt-1">
                                      <p className="fw-bold mb-0">
                                        {item.name}
                                      </p>
                                      <p className="small text-muted">
                                        {item.userName}
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              </li>
                            ))}
                          </>
                        ) : (
                          <>
                            {usersSearch?.map((item) => (
                              <li
                                key={item._id}
                                className="p-2 UserList"
                                onClick={() => {
                                  setChatOpen(true);
                                  setCurrentChatUser(item);
                                  setMessages([]);
                                }}
                              >
                                <a className="d-flex justify-content-between">
                                  <div className="d-flex flex-row">
                                    <div>
                                      {item.Photo ? (
                                        <img
                                          src={item.Photo}
                                          className="userProfileimg"
                                        />
                                      ) : (
                                        <div
                                          style={{
                                            width: "45px",
                                            height: "100%",
                                          }}
                                        >
                                          <Lottie
                                            options={options}
                                            height={50}
                                            width={50}
                                            isPaused={false}
                                            eventListeners={[
                                              {
                                                eventName: "complete",
                                              },
                                            ]}
                                          />
                                        </div>
                                      )}
                                      <span className="badge bg-success badge-dot"></span>
                                    </div>
                                    <div className="pt-1">
                                      <p className="fw-bold mb-0">
                                        {item.name}
                                      </p>
                                      <p className="small text-muted">
                                        {item.userName}
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              }
              {/*message*/}
              {
                <div
                  className={`col-md-12 col-lg-6 col-xl-6 ${messageContainerHinder} `}
                  style={{ padding: "0" }}
                >
                  <div className="">
                    <div
                      className="card-header d-flex justify-content-between align-items-center p-3 DivideBottom chatTopColor"
                      style={{ height: "80px" }}
                    >
                      {currentChatUser && (
                        <>
                          <div
                            className="backToUser"
                            onClick={() => {
                              setChatOpen(false);
                            }}
                          >
                            Back
                          </div>
                          <h5 className="mb-0" style={{ textAlign: "center" }}>
                            Chat messages
                          </h5>
                          <div className="d-flex">
                            {currentChatUser.Photo ? (
                              <img
                                src={[currentChatUser.Photo]}
                                className="userProfileimg"
                                alt=""
                              />
                            ) : (
                              <Lottie
                                options={options}
                                height={50}
                                width={50}
                                isPaused={false}
                                eventListeners={[
                                  {
                                    eventName: "complete",
                                  },
                                ]}
                              />
                            )}
                            <p className="user-profile-namecontainer">
                              {currentChatUser.name}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      className="paddingForList "
                      data-mdb-perfect-scrollbar="true"
                      style={{
                        position: "relative",
                        height: "400px",
                        overflow: "auto",
                      }}
                    >
                      {!chatOpen ? (
                        <>
                          {
                            <div className=" align-items-center">
                              <div
                                style={{
                                  textAlign: "center",
                                  marginTop: "100px",
                                }}
                                className="text-muted"
                              >
                                {" "}
                                Click on User Start Conversation{" "}
                              </div>
                            </div>
                          }
                        </>
                      ) : (
                        <>
                          {messages.length !== 0 ? (
                            <>
                              {messages?.map((msg) => (
                                <>
                                  {msg.myself === false ? (
                                    <div
                                      key={msg._id}
                                      className="LeftBox"
                                      ref={chatContainerRef}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <p className="small mb-1">
                                          {" "}
                                          {currentChatUser.name}
                                        </p>
                                        <p className="small mb-1 text-muted">
                                          {msg.time}
                                        </p>
                                      </div>
                                      <div className="d-flex flex-row justify-content-start">
                                        {currentChatUser.Photo ? (
                                          <img
                                            className="userProfileimg"
                                            src={[currentChatUser.Photo]}
                                            alt="avatar 1"
                                          />
                                        ) : (
                                          <div
                                            style={{
                                              width: "45px",
                                              height: "100%",
                                            }}
                                          >
                                            <Lottie
                                              options={options}
                                              height={50}
                                              width={50}
                                              isPaused={false}
                                              eventListeners={[
                                                {
                                                  eventName: "complete",
                                                },
                                              ]}
                                            />
                                          </div>
                                        )}
                                        <div>
                                          <p
                                            className="small p-2 ms-3 mb-3 rounded-3"
                                            style={{
                                              backgroundColor: "#f5f6f7",
                                            }}
                                          >
                                            {msg.message}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      key={msg._id}
                                      className="RightBox"
                                      ref={chatContainerRef}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <p className="small mb-1 text-muted">
                                          {msg.time ? msg.time : "Just Now"}
                                        </p>
                                        <p className="small mb-1">
                                          {" "}
                                          {loggedInUser.name}
                                        </p>
                                      </div>
                                      <div className="d-flex flex-row justify-content-end  pt-1">
                                        <div>
                                          <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                                            {msg.message}
                                          </p>
                                        </div>
                                        {loggedInUser.Photo ? (
                                          <img
                                            className="userProfileimg"
                                            src={[loggedInUser.Photo]}
                                            alt="avatar 1"
                                          />
                                        ) : (
                                          <div
                                            style={{
                                              width: "45px",
                                              height: "100%",
                                            }}
                                          >
                                            <Lottie
                                              options={options}
                                              height={50}
                                              width={50}
                                              isPaused={false}
                                              eventListeners={[
                                                {
                                                  eventName: "complete",
                                                },
                                              ]}
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </>
                              ))}
                            </>
                          ) : (
                            <div
                              style={{
                                textAlign: "center",
                                marginTop: "100px",
                              }}
                              className="text-muted"
                            >
                              {" "}
                              No Message Present{" "}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="chatTopColor text-muted d-flex justify-content-start align-items-center p-3">
                      <div
                        className="input-group mb-0"
                        style={{ height: "50px" }}
                      >
                        {chatOpen && (
                          <>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Type message"
                              aria-label="Recipient's username"
                              value={inputMessage}
                              aria-describedby="button-addon2"
                              onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <button
                              className="sendButton"
                              onClick={sendMessage}
                              disabled={!inputMessage}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="20"
                                fill="currentColor"
                                class="bi bi-send"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
