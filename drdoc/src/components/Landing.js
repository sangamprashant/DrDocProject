import React, { useEffect } from "react";
import "./css/landing.css";
import home from "./img/home copy.png";
import aboutimg from "./img/about-img.png";
import prashant from "./img/man.jpg";
import muskaan from "./img/muskaan.jpg";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  });

  return (
    <>
      {!token ? (
        <div className="bg_color">
          <section className="  banner">
            <div
              className="container "
              style={{
                justifyContent: "space-between",
                display: "flex",
                padding: "130px",
              }}
            >
              <div className="about-details banner-text">
                <p>
                  <strong>BEST MEDICAL APP</strong>
                </p>
                <h1>Find your</h1>
                <h1>
                  {" "}
                  <span className="type_logo">doctor</span> & make{" "}
                </h1>
                <h1>
                  <span className="type_logo">appointment</span>
                </h1>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Get Started{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                    />
                  </svg>
                </button>
              </div>
              <div className="banner-image">
                <img src={home} alt="" />
              </div>
            </div>
          </section>
          {/*======= fet started */}
          <section id="get-started" className="padd-section text-center">
            <div className="container">
              <div className="section-title text-center">
                <p className="separator">WHAT WE DO FOR YOU</p>

                <h2>
                  <strong>
                    our best <span className="type_logo">Features</span>
                  </strong>
                </h2>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <div className="feature-block">
                    <div className="type_logo">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="currentColor"
                        className="bi bi-r-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 4.002h3.11c1.71 0 2.741.973 2.741 2.46 0 1.138-.667 1.94-1.495 2.24L11.5 12H9.98L8.52 8.924H6.836V12H5.5V4.002Zm1.335 1.09v2.777h1.549c.995 0 1.573-.463 1.573-1.36 0-.913-.596-1.417-1.537-1.417H6.835Z" />
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2Z" />
                      </svg>
                    </div>

                    <h4>Regular</h4>
                    <p>
                      Select Regular for normal use and upload your own
                      materials.
                    </p>
                    <a href="#">read more</a>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="feature-block">
                    <div className="type_logo">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="currentColor"
                        className="bi bi-prescription2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7 6h2v2h2v2H9v2H7v-2H5V8h2V6Z" />
                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5V4a1 1 0 0 1-1-1V1Zm2 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4H4ZM3 3h10V1H3v2Z" />
                      </svg>
                    </div>
                    <h4>Doctor</h4>
                    <p>
                      Select Doctor if you are a doctor who will provide the
                      service to their deal.
                    </p>
                    <a href="#">read more</a>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="feature-block">
                    <div className="type_logo">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="currentColor"
                        className="bi bi-shop-window"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
                      </svg>
                    </div>{" "}
                    <h4>Seller</h4>
                    <p>
                      reach out as a salesperson to sell the medicine on the
                      platform.
                    </p>
                    <a href="#">read more</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*=== about us section ===*/}
          <section id="about-us" className="about-us padd-section">
            <div className="container">
              <div className="row ">
                <div className="col-md-5 col-lg-3">
                  <img src={aboutimg} alt="About" />
                </div>

                <div className="col-md-7 col-lg-5">
                  <div className="about-content">
                    <p className="separator">ABOUT OUR APP</p>
                    <h2>
                      <strong>
                        Assuring you of
                        <br /> the{" "}
                        <span className="type_logo">
                          best medical <br /> services.
                        </span>
                      </strong>
                    </h2>
                    <p>
                      Built-in system to help you ensure your medical data is
                      secure for future use. A platform where you can upload
                      your documents or your concerned doctor can view or create
                      your medical history . DrDoc also has storage facilities
                      to allow you to sell or purchase your medication.
                    </p>

                    <ul className="list-unstyled">
                      <li>
                        <i>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        </i>
                        Unlimited interface
                      </li>
                      <li>
                        <i>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        </i>
                        24/7 Support
                      </li>
                    </ul>
                    <div className="mobile">
                      <button
                        type="button"
                        onClick={() => {
                          navigate("/signup");
                        }}
                      >
                        Download App{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-download"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ======= video Section ======= */}
          <section id="video" className="text-center">
            <div className="overlay">
              <div className=" container-full">
                <div className="row">
                  <a
                    href="https://www.youtube.com/watch?v=jDDaplaOz7Q&feature=emb_title"
                    className="glightbox play-btn"
                  ></a>
                </div>
              </div>
            </div>
          </section>

          {/* ======= Team Section ======= */}
          <section id="team" className="padd-section text-center">
            <div className="container">
              <div className="section-title text-center">
                <p className="separator">
                  <strong>OUR AWSOME TEAM</strong>
                </p>
                <h2>
                  <strong>
                    Meet our <span className="type_logo">Team</span>
                  </strong>
                </h2>
                <p className="separator">
                  We help you to keep safe your medical documents and a best
                  environment to contact with your doctor.{" "}
                </p>
              </div>

              <div
                className="row type_logo"
                style={{ justifyContent: "space-around", display: "flex" }}
              >
                <div className="col-md-6 col-md-4 col-lg-3">
                  <div className="team-block bottom">
                    <img src={prashant} className="img-responsive" alt="img" />
                    <div className="team-content">
                      <ul
                        className="list-unstyled"
                        style={{
                          justifyContent: "space-around",
                          display: "flex", 
                        }}
                      >
                        <li>
                          <a
                            href="https://github.com/sangamprashant"
                            target="_blank"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-github"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.linkedin.com/in/prashant-srivastav-63b44b242"
                            target="_blank"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-linkedin"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                            </svg>
                          </a>
                        </li>
                      </ul>
                      <span>Founder & head</span>
                      <h4>Prashant srivastav</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*<!-- ======= Testimonials Section ======= -->*/}
          <section id="testimonials" className="padd-section text-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="testimonials-content">
                    <div
                      id="carousel-example-generic"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner" role="listbox">
                        <div className="carousel-item  active">
                          <div className="top-top">
                            <h2> Our Users Speak Volumes About Us</h2>
                            <p>
                            "I have been using the XYZ Medical App for several months now, and it has truly transformed the way I manage my health. The app's user-friendly interface makes it easy to navigate and access various features. From booking appointments with doctors to tracking my medication schedule, this app has become an indispensable tool for me. I appreciate the ability to securely store and access my medical records, test results, and prescriptions on my phone. The app also provides insightful health tips and reminders, helping me stay proactive about my well-being. Highly recommended!"
                            </p>
                            <h4>
                              Prashant Srivastav<span>manager</span>
                            </h4>
                          </div>
                        </div>

                        <div className="carousel-item ">
                          <div className="top-top">
                            <h2> Our Users Speak Volumes About Us</h2>
                            <p>
                            "As a healthcare professional, I find the XYZ Medical App incredibly useful in my practice. It allows me to securely communicate with patients, review their medical history, and provide virtual consultations. The app's telemedicine feature has been a game-changer, especially during the COVID-19 pandemic, as it enables me to offer remote care to patients while maintaining high-quality healthcare delivery. The ability to access a wide range of medical references, drug information, and clinical guidelines within the app saves me time and enhances my efficiency. I applaud the developers for creating such a comprehensive and reliable medical app."
                            </p>
                            <h4>
                              Muskaan<span>manager</span>
                            </h4>
                          </div>
                        </div>

                        <div className="carousel-item ">
                          <div className="top-top">
                            <h2> Our Users Speak Volumes About Us</h2>
                            <p>
                            "I recently started using the XYZ Medical App, and it has exceeded my expectations. One feature that stands out to me is the symptom checker. It allows me to input my symptoms and receive potential diagnoses and recommended actions. While it doesn't replace a doctor's opinion, it provides helpful guidance when I have concerns. Additionally, the app's integration with fitness trackers and wearable devices helps me monitor my daily activity and set health goals. The option to connect with a community of users facing similar health conditions adds a supportive touch. Kudos to the developers for designing an app that empowers individuals to take control of their health."
                            </p>
                            <h4>
                              Sangam<span>developer</span>
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="btm-btm">
                        <ul className="list-unstyled carousel-indicators">
                          <li
                            data-bs-target="#carousel-example-generic"
                            data-bs-slide-to="0"
                            className="active"
                          ></li>
                          <li
                            data-bs-target="#carousel-example-generic"
                            data-bs-slide-to="1"
                          ></li>
                          <li
                            data-bs-target="#carousel-example-generic"
                            data-bs-slide-to="2"
                          ></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*-- ======= Contact Section ======= */}
          <section id="contact" className="padd-section">
            <div className="container">
              <div className="section-title text-center">
                <h2 className="type_logo">
                  <strong>Contact</strong>
                </h2>
                <p className="separator">
                  Send us the update and error problem.
                </p>
              </div>

              <div className="row justify-content-center">
                <div className="col-lg-3 col-md-4">
                  <div className="info">
                    <div>
                      <i className="bi bi-geo-alt"></i>
                      <p>
                        Tiwariganj
                        <br />
                        Lucknow, UP India
                      </p>
                    </div>

                    <div className="email">
                      <i className="bi bi-envelope"></i>
                      <p>drdoc.social@gmail.com</p>
                    </div>

                    <div>
                      <i className="bi bi-phone"></i>
                      <p>+91 98346 67892</p>
                    </div>
                  </div>

                  <div className="social-links">
                    <a href="#" className="twitter">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-twitter"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                    </a>
                    <a href="#" className="facebook">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-facebook"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </a>
                    <a href="#" className="instagram">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </a>
                    <a href="#" className="linkedin">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-linkedin"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="col-lg-5 col-md-8">
                  <div className="form">
                    <form
                      action="forms/contact.php"
                      method="post"
                      role="form"
                      className="php-email-form"
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Your Email"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                          required
                        />
                      </div>
                      <div className="form-group mt-3">
                        <textarea
                          className="form-control"
                          name="message"
                          rows="5"
                          placeholder="Message"
                          required
                        ></textarea>
                      </div>
                      <div className="my-3">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">
                          Your message has been sent. Thank you!
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit">Send Message</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*-- ======= Footer ======= */}
          <footer className="footer">
            <div className="container">
              <div
                className="row"
                style={{
                  justifyContent: "space-around",
                }}
              >
                <div className="col-md-12 col-lg-4">
                  <div className="footer-logo">
                    <a className="navbar-brand" href="#">
                      DrDoc
                    </a>
                    <p>
                      Built-in system to help you ensure your medical data is
                      secure for future use. A platform where you can upload
                      your documents or your concerned doctor can view or create
                      your medical history . DrDoc also has storage facilities
                      to allow you to sell or purchase your medication.
                    </p>
                  </div>
                </div>

                <div className="col-sm-6 col-md-3 col-lg-2">
                  <div className="list-menu">
                    <h4>Abou Us</h4>

                    <ul className="list-unstyled">
                      <li>
                        <a href="#">About us</a>
                      </li>
                      <li>
                        <a href="#">Features item</a>
                      </li>
                      <li>
                        <a href="#">Live streaming</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-sm-6 col-md-3 col-lg-2">
                  <div className="list-menu">
                    <h4>Support</h4>

                    <ul className="list-unstyled">
                      <li>
                        <a href="#">faq</a>
                      </li>
                      <li>
                        <a href="#">Editor help</a>
                      </li>
                      <li>
                        <a href="#">Contact us</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      ) : null}
    </>
  );
}
