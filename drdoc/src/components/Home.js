import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";
import Lottie from "react-lottie";
import UserImageGif from "./lottiejson/user.json";

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
  //lottis file run
  const options = {
    loop: true,
    autoplay: true,
    animationData: UserImageGif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const HomeData = () => {
    if (token) {
      return [
        <>
          <div className="home">
            <div className="user-header-wrapper">
              <div className="user-header-inner">
                <div className="uh-left">
                  <div className="uh-image">
                    {JSON.parse(localStorage.getItem("user")).Photo ? (
                      <img
                        className="uh-image-inner"
                        src={JSON.parse(localStorage.getItem("user")).Photo}
                        alt=""
                      />
                    ) : (
                      <div className="uh-image-inner">
                        <Lottie
                          options={options}
                          height={150}
                          width={150}
                          isPaused={false}
                        />
                      </div>
                    )}
                    <div className="gradient"></div>
                  </div>
                </div>

                <div className="uh-right">
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
                </div>
              </div>
            </div>
            <div className="user-page-wrapper">
              <div className="user-page-inner">
                {pic?.map((pics) => {
                  return (
                    <div key={pics._id}>
                      <div id="img1" className="image-wrapper">
                        <img className="image-home" src={pics.photo} alt="" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {pic?.length === 0 ? (
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
