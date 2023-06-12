import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./css/ChatComponent.css";
import { io } from "socket.io-client";

function ChatComponent() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messageContainerHinder, setMessageContainerHinder] = useState("hinderChat");
  const [contactContainerHinder, setContactContainerHinder] = useState("");
  const navigate = useNavigate();
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
    setMessageContainerHinder(chatOpen ? "" : "hinderChat");
    setContactContainerHinder(chatOpen ? "hinderChat" : "");
  }, [chatOpen]);
  return (
    <div class="container ">
      <div class="row">
        <div class="col-md-12">
          <div class="" id="chat3">
            <div class="">
              <div class="row " style={{ backgroundColor: "black" }}>
                {
                  <div
                    class={`col-md-6 col-lg-5 col-xl-4  mb-md-0 ${contactContainerHinder} `}
                    style={{
                      backgroundColor: "yellow",
                      border: "1px solid white",
                    }}
                  >
                    <div class="p-3">
                      <div class="input-group rounded mb-3">
                        <input
                          type="search"
                          class="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                      </div>

                      <div
                        data-mdb-perfect-scrollbar="true"
                        style={{
                          position: "relative",
                          height: "400px",
                          overflow: "auto",
                        }}
                      >
                        <ul class="list-unstyled mb-0">
                          <li
                            class="p-2 border-bottom"
                            onClick={() => {
                              setChatOpen(true);
                            }}
                          >
                            <a href="#!" class="d-flex justify-content-between">
                              <div class="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    alt="avatar"
                                    class="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span class="badge bg-success badge-dot"></span>
                                </div>
                                <div class="pt-1">
                                  <p class="fw-bold mb-0">Marie Horwitz</p>
                                  <p class="small text-muted">
                                    Hello, Are you there?
                                  </p>
                                </div>
                              </div>
                              <div class="pt-1">
                                <p class="small text-muted mb-1">Just now</p>
                                <span class="badge bg-danger rounded-pill float-end">
                                  3
                                </span>
                              </div>
                            </a>
                          </li>
                          <li
                            class="p-2 border-bottom"
                            onClick={() => {
                              setChatOpen(true);
                            }}
                          >
                            <a href="#!" class="d-flex justify-content-between">
                              <div class="d-flex flex-row">
                                <div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                    alt="avatar"
                                    class="d-flex align-self-center me-3"
                                    width="60"
                                  />
                                  <span class="badge bg-success badge-dot"></span>
                                </div>
                                <div class="pt-1">
                                  <p class="fw-bold mb-0">Marie Horwitz</p>
                                  <p class="small text-muted">
                                    Hello, Are you there?
                                  </p>
                                </div>
                              </div>
                              <div class="pt-1">
                                <p class="small text-muted mb-1">Just now</p>
                                <span class="badge bg-danger rounded-pill float-end">
                                  3
                                </span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                }

                {
                  <div
                    className={`col-md-8 col-lg-6 col-xl-4 ${messageContainerHinder}`}
                  >
                    <div class="card">
                      <div class="card-header d-flex justify-content-between align-items-center p-3">
                        <>back</>
                        <h5 class="mb-0">Chat messages</h5>
                      </div>
                      <div
                        class="card-body"
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
                              <div class=" align-items-center">
                                
                                <div
                                  style={{ textAlign: "center" }}
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

                            {<div
                                  style={{ textAlign: "center" }}
                                  className="text-muted"
                                >
                                  {" "}
                                  No Message Present{" "}
                                </div>}

                            {
                              <div className="LeftBox">
                                <div class="d-flex justify-content-between">
                                  <p class="small mb-1">Timona Siera</p>
                                  <p class="small mb-1 text-muted">
                                    23 Jan 2:00 pm
                                  </p>
                                </div>
                                <div class="d-flex flex-row justify-content-start">
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                    alt="avatar 1"
                                    style={{ width: "45px", height: "100%" }}
                                  />
                                  <div>
                                    <p
                                      class="small p-2 ms-3 mb-3 rounded-3"
                                      style={{ backgroundColor: "#f5f6f7" }}
                                    >
                                      For what reason would it be advisable for
                                      me to think about business content?
                                    </p>
                                  </div>
                                </div>
                              </div>
                            }

                            {
                              <div className="RightBox">
                                <div class="d-flex justify-content-between">
                                  <p class="small mb-1 text-muted">
                                    23 Jan 2:05 pm
                                  </p>
                                  <p class="small mb-1">Johny Bullock</p>
                                </div>
                                <div class="d-flex flex-row justify-content-end mb-4 pt-1">
                                  <div>
                                    <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                                      Thank you for your believe in our supports
                                    </p>
                                  </div>
                                  <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                    alt="avatar 1"
                                    style={{ width: "45px", height: "100%" }}
                                  />
                                </div>
                              </div>
                            }
                          </>
                        )}
                       
                      </div>
                      {<div class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                        <div class="input-group mb-0">
                         {chatOpen&& <><input
                            type="text"
                            class="form-control"
                            placeholder="Type message"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                          />
                          <button
                            class="btn btn-warning"
                            type="button"
                            id="button-addon2"
                            style={{ paddingTop: ".55rem" }}
                          >
                            Button
                          </button></>}
                        </div>
                      </div>}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
