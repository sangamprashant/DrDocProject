import React, { useState, useEffect } from "react";
import "../css/Createpost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Createpost() {
  const token = localStorage.getItem("jwt");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  });

  useEffect(() => {
    // saving post to mongodb
    if (url) {
      fetch("/api/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Successfully Posted");
            navigate("/home");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  // posting image to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "drdocstartuppreset");
    data.append("cloud_name", "drdocsocial");
    fetch("https://api.cloudinary.com/v1_1/drdocsocial/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
    console.log(url);
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  const CreatePostDetails = () => {
    if (token) {
      return [
        <>
          <div className="createPost-top">
            <div className="createPost">
              {/* //header */}
              <div className="post-header">
                <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
                <button
                  id="post-btn"
                  onClick={() => {
                    postDetails();
                  }}
                >
                  Share
                </button>
              </div>
              {/* image preview */}
              <div className="create-main-div">
                <img
                  id="output"
                  src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    loadfile(event);
                    setImage(event.target.files[0]);
                  }}
                />
              </div>
              {/* details */}
              <div className="create-details">
                <div className="card-header">
                  <div className="card-pic"></div>
                  <h5>{JSON.parse(localStorage.getItem("user")).name}</h5>
                </div>
                <textarea
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                  type="text"
                  placeholder="Write a caption...."
                ></textarea>
              </div>
            </div>
          </div>
        </>,
      ];
    }
  };

  return <>{CreatePostDetails()}</>;
}
