import React, { useState } from "react";

export default function ProfilePic({ handleChangeAccount }) {
  const loggeduser = JSON.parse(localStorage.getItem("user"));
  const [account, setAccount] = useState("");

  const handleAccountChange = () => {
    fetch("/api/change/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ account: account }),
    })
      .then((res) => res.json())
      .then((data) => {
        // update the logged-in user data in local storage
        const updatedUser = { ...loggeduser, account: account };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        handleChangeAccount(); // call the parent component function to close the modal
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profilePic darkBg">
      <div className="changePic centered">
        <div>
          <h2>Change Account Type </h2>
        </div>
        {loggeduser.account !== "regular" && (
          <div style={{ borderTop: "1px solid #00000030" }}>
            <button
              className="upload-btn"
              style={{ color: "#1EA1F7" }}
              onClick={() => setAccount("regular")}
            >
              Regular
            </button>
          </div>
        )}
        {loggeduser.account !== "doctor" && (
          <div style={{ borderTop: "1px solid #00000030" }}>
            <button
              className="upload-btn"
              style={{ color: "#ED4956" }}
              onClick={() => setAccount("doctor")}
            >
              Doctor
            </button>
          </div>
        )}
        {loggeduser.account !== "seller" && (
          <div style={{ borderTop: "1px solid #00000030" }}>
            <button
              className="upload-btn"
              style={{ color: "green" }}
              onClick={() => setAccount("seller")}
            >
              Seller
            </button>
          </div>
        )}
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onClick={handleChangeAccount}
          >
            cancel
          </button>
          <button
            className="upload-btn"
            style={{ marginLeft: "10px" }}
            disabled={!account}
            onClick={handleAccountChange}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
