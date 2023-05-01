import React, { useState, useEffect, useRef } from "react";

export default function ProfilePic({ handleChangeProfile }) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "drdocstartuppreset")
    data.append("cloud_name", "drdocsocial")
    fetch("https://api.cloudinary.com/v1_1/drdocsocial/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.error(err));
  };

  const postPic = () => {
    if (url) {
      fetch("http://localhost:5000/uploadProfilePic", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedUser = { ...loggedUser, Photo: url };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
          handleChangeProfile();
        })
        .catch((err) => console.error(err));
    }
  };

  const removeProfilePic = () => {
    fetch("http://localhost:5000/removeProfilePic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Update user data in local storage
        const userData = JSON.parse(localStorage.getItem("user"));
        userData.Photo = "";
        localStorage.setItem("user", JSON.stringify(userData));
        // Trigger profile update
        handleChangeProfile();
      })
      .catch((err) => console.error(err));
  };
  

  useEffect(() => {
    postDetails();
  }, [image]);

  useEffect(() => {
    postPic();
  }, [url]);

  return (
    <div className="profilePic darkBg">
      <div className="changePic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={handleClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className="upload-btn" style={{ color: "#ED4956" }} onClick={removeProfilePic }>
            Remove Current Photo
          </button>
        </div>
        <div style={{ borderTop: "1px solid #00000030"}}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onClick={handleChangeProfile}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
          }