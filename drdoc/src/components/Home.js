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
 const HomeData=()=>{
  if(token){
    return[
      <>
      <div class="home">
      <div class="user-header-wrapper">
        <div class="user-header-inner">
          <div class="uh-left">
            <div class="uh-image">
              <img
                class="uh-image-inner"
                src={JSON.parse(localStorage.getItem("user")).Photo}
                alt=""
              />
              <div class="gradient"></div>
            </div>
          </div>

          <div class="uh-right">
            <div class="user-bio">
              <h5 class="user-bio-name">
                {JSON.parse(localStorage.getItem("user")).name}
              </h5>{" "}
              <h6>{JSON.parse(localStorage.getItem("user")).userName}</h6>
            </div>
            {/*<div class="user-info-home">
            
              <h3>areal_alien</h3>
              <button class="btn-home">Edit</button>
            </div>*/}
            <div class="user-links">
              <a>
                <span>{pic.length}</span> Posts
              </a>
            </div>
            <div class="user-bio">
              <p>
                This is the user biography 😄
                <br />
                It also has another line.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="user-page-wrapper">
        <div class="user-page-inner">
          <div id="imgblock1" class="image-block">
            <div class="block">
              <img
                class="image-home"
                src="https://images.unsplash.com/photo-1559056986-f834be7896e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80"
                alt=""
              />
            </div>
            <div id="imgblockbc1" class="block-background"></div>
          </div>

          {pic.map((pics) => {
            return (
              <div key={pics._id}>
                <div id="img1" class="image-wrapper">
                  <div id="iov1" class="img-overlay-wrapper">
                    <div class="img-btns">
                      <p>
                        465 <i class="uil uil-heart-alt"></i> &nbsp&nbsp 25{" "}
                        <i class="uil uil-comment"></i>
                      </p>
                    </div>
                    <div class="img-overlay"></div>
                  </div>
                  <img class="image-home" src={pics.photo} alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {pic.length === 0 ? (
        <>
          <div class="zero-post-message ">
            <p>
              Share your experiences and moments with your friends! Start by
              uploading your first post.
            </p>
          </div>
        </>
      ) : null}
    </div>
      </>
    ]
  }
 }
  return (
    <>
    {HomeData()}
    </>
  );
}
