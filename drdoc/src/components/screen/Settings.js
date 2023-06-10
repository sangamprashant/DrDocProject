import React, { useContext, useEffect, useState } from "react";
import "../css/Setting.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import ProfilePic from "./ProfilePic";
import ChangeAccount from "../ChangeAccount";
import image from "../img/images.png";

function Settings() {
  const [changePic, setChangePic] = useState(false);
  const [changeAccount, setChangeAccount] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const loggeduser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]); // add token as a dependency

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };
  const changeAccountType = () => {
    if (changeAccount) {
      setChangeAccount(false);
    } else {
      setChangeAccount(true);
    }
  };
  const { setModalOpen } = useContext(LoginContext);
  const SettingData = () => {
    if (token) {
      return [
        <>
          <div className="center-container" style={{}}>
            <div className=" container-setting">
              <div className="user-image">
                <img
                  src={loggeduser.Photo || image}
                  alt="this image contains user-image"
                />
                <div className="content">
                  <h3 className="name">{loggeduser.name}</h3>
                  <p className="username">{loggeduser.userName}</p>
                  <p className="details">all your stats in 1 place</p>
                </div>
              </div>

              <div className="content">
                <div>
                  <a
                    className=" logout effect effect-4"
                    onClick={() => navigate(`/${loggeduser.userName}/cart`)}
                  >
                    Cart
                  </a>
                  <a
                    className=" logout effect effect-4"
                    onClick={() => navigate(`/${loggeduser.userName}/myorders`)}
                  >
                    My Orders
                  </a>
                  {loggeduser.account === "seller" ? (
                    <>
                      <a
                        className=" logout effect effect-4"
                        onClick={() =>
                          navigate(
                            `/${loggeduser.userName}/setting/seller/dashboard`
                          )
                        }
                      >
                        Dashboard
                      </a>
                      <a
                        className=" logout effect effect-4"
                        onClick={() =>
                          navigate(
                            `/${loggeduser.userName}/setting/seller/addmedicine`
                          )
                        }
                      >
                        Add Products
                      </a>
                      <a
                        className=" logout effect effect-4"
                        onClick={() =>
                          navigate(
                            `/${loggeduser.userName}/myproducts`
                          )
                        }
                      >
                        View My Products
                      </a>
                    </>
                  ) : (
                    ""
                  )}

                  <a
                    className=" logout effect effect-4"
                    onClick={() => changeprofile()}
                  >
                    Update Profile Photo
                  </a>
                  <a
                    className=" logout effect effect-4"
                    onClick={() => changeAccountType()}
                  >
                    Change Account Type
                  </a>

                  <a
                    className=" cancle effect effect-4"
                    onClick={() => setModalOpen(true)}
                  >
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </div>
          {changePic && (
            <ProfilePic handleChangeProfile={changeprofile}></ProfilePic>
          )}
          {changeAccount && (
            <ChangeAccount
              handleChangeAccount={changeAccountType}
            ></ChangeAccount>
          )}
        </>,
      ];
    }
  };
  return <>{SettingData()}</>;
}

export default Settings;
