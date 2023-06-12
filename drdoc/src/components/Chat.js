import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./css/Contact.css";
import "./css/Chatcontainer.css";
import { io } from "socket.io-client";

function Chat() {
  const navigate = useNavigate();
  const [messageContainerHinder, setMessageContainerHinder] = useState("hinder");
  const [contactContainerHinder, setContactContainerHinder] = useState("");
  const chatContainerRef = useRef(null);
  const [accountType, setAccountType] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState("");
  const socket = useRef();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    setMessageContainerHinder(showMessage ? "" : "hinder");
    setContactContainerHinder(showMessage ? "hinder" : "");
  }, [showMessage]);

  useEffect(() => {
    setAccountType(loggedInUser.account === "doctor" ? "regular" : "doctor");
  }, [loggedInUser.account]);

  useEffect(() => {
    if (currentChatUser !== "") {
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", loggedInUser._id);
    }
  }, [loggedInUser]);

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
        console.error(error);
      }
    }

    fetchUsers();
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

  const handleUserClick = (user) => {
    setCurrentChatUser(user);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ myself: false, message: msg });
      });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage && setMessages((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="Chat-horizontal-controll">
      <div className={contactContainerHinder}>
        <>
          <div className="mainContactContainer ">
            <div className="containerforsearchbarcontact">
              <div className="navigate-bw-chat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="60"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </div>
              <input
                type="search"
                className="searchbarforcontact"
                placeholder="search your friende"
              />
            </div>
          </div>
        </>
        <div className="usersDetailcontainer">
          {users?.map((item) => (
            <div>
              {item?._id ? (
                <div
                  key={users._id}
                  className="userContainer"
                  onClick={(e) => {
                    setShowMessage(!showMessage);
                    setCurrentChatUser(item);
                  }}
                >
                  <img className="Chatuserimage" src={item.Photo} alt="" />
                  <div style={{ marginLeft: "10px" }}>
                    <p className="ChatUserName">{item.name}</p>

                    <p className="Chatuserchatdescription">{item.userName}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      {/*message*/}
      {currentChatUser !== "" ? (
        <div className={messageContainerHinder}>
          <div className="mainChatContainer" style={{ display: "block " }}>
            <div className="userprofilecontainer">
              <div className="navigate-bw-chat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="45"
                  fill="currentColor"
                  class="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    setShowMessage(!showMessage);
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </div>

              <img
                src={[currentChatUser.Photo]}
                className="userProfileimg"
                alt=""
              />
              <p className="user-profile-namecontainer">
                {currentChatUser.name}
              </p>
            </div>
            <div className="msgContainer">
              {messages ? (
                <div >
                  {messages.map((msg) => (
                    <div  >
                      {msg.myself === false ? (
                        <div className="Message-send-body chatContainer" ref={chatContainerRef}>
                          <img
                            src={[currentChatUser.Photo]}
                            className="chatuserProfileimg"
                            alt=""
                          />
                          <p className="Message-send-body-text">
                            {msg.message}
                          </p>
                        </div>
                      ) : (
                        <div className="Message-send-body Message-send-body-right chatContainer" ref={chatContainerRef}>
                          <p className="Message-send-body-text">
                            {msg.message}
                          </p>
                          <img
                            src={[loggedInUser.Photo]}
                            className="chatuserProfileimg"
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="msgSenderContainer">
              <input
                type="text"
                placeholder="Write your message"
                name=" id="
                className="msgInput"
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button className="msg-send-btn" onClick={sendMessage}>
                Send
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="15"
                  fill="currentColor"
                  class="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p> Tap on contact to start the chat.</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
