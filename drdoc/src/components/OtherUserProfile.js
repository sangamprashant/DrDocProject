import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

export default function Home() {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  });
  const [pic, setPic] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result);
        console.log(pic);
      });
  }, []);
  const HomeData = () => {
    if (token) {
      return [
        <>
          <div className="home">
            <div className="user-header-wrapper">
              <div className="user-header-inner" style={{display:"flex" ,justifyContent:"center"}}>
                <div className="uh-left-user">
                  <div className="uh-image">
                    <img
                      className="uh-image-inner"
                      src={JSON.parse(localStorage.getItem("user")).Photo}
                      alt=""
                    />
                    <div className="gradient"></div>
                  </div>
                </div>

                <div className="uh-right-user">
                  <div className="user-bio">
                    <h5 className="user-bio-name">
                      {JSON.parse(localStorage.getItem("user")).name}
                    </h5>{" "}
                    <h6>{JSON.parse(localStorage.getItem("user")).userName}</h6>
                  </div>

                  <div className="user-links">
                    <a>
                      <span>{pic.length}</span> Posts
                    </a>
                  </div>
                  <div className="user-bio">
                    <p>
                      This is the user biography 😄
                      <br />
                      It also has another line.
                    </p>
                  </div>
                  <div className="user-info-home">
                    <button className="btn-home">Upload</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-page-wrapper">
              <div className="user-page-inner">
                <div id="imgblock1" className="image-block">
                  <div className="block">
                    <img
                      className="image-home"
                      src="https://images.unsplash.com/photo-1559056986-f834be7896e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80"
                      alt=""
                    />
                  </div>
                  <div id="imgblockbc1" className="block-background"></div>
                </div>

                {pic.map((pics) => {
                  return (
                    <div key={pics._id}>
                      <div id="img1" className="image-wrapper">
                        <div id="iov1" className="img-overlay-wrapper">
                          <div className="img-btns">
                            <p>
                              465 <i className="uil uil-heart-alt"></i> &nbsp&nbsp
                              25 <i className="uil uil-comment"></i>
                            </p>
                          </div>
                          <div className="img-overlay"></div>
                        </div>
                        <img className="image-home" src={pics.photo} alt="" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {pic.length === 0 ? (
              <>
                <div className="zero-post-message ">
                  <p>
                    Share your experiences and moments with your friends! Start
                    by uploading your first post.
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </>,
      ];
    }
  };
  return <>{HomeData()}</>;
}
