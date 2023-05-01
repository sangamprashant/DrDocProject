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
          <div class="center-container" style={{}}>
            <div class="container container-setting">
              <div class="user-image">
                <img
                  src={loggeduser.Photo || image}
                  alt="this image contains user-image"
                />
                <div class="content">
                  <h3 class="name">{loggeduser.name}</h3>
                  <p class="username">{loggeduser.userName}</p>
                  <p class="details">all your stats in 1 place</p>
                </div>
              </div>

              <div class="content">
                <div>
                  <a
                    class=" logout effect effect-4"
                    onClick={() => navigate(`/${loggeduser.userName}/cart`)}
                  >
                    Cart
                  </a>
                  <a
                    class=" logout effect effect-4"
                    onClick={() => navigate(`/${loggeduser.userName}/myorders`)}
                  >
                    My Orders
                  </a>
                  {loggeduser.account === "seller" ? (
                    <>
                      <a
                        class=" logout effect effect-4"
                        onClick={() =>
                          navigate(
                            `/${loggeduser.userName}/setting/seller/dashboard`
                          )
                        }
                      >
                        Dashboard
                      </a>
                      <a
                        class=" logout effect effect-4"
                        onClick={() =>
                          navigate(
                            `/${loggeduser.userName}/setting/seller/addmedicine`
                          )
                        }
                      >
                        Add Products
                      </a>
                      <a
                        class=" logout effect effect-4"
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
                    class=" logout effect effect-4"
                    onClick={() => changeprofile()}
                  >
                    Update Profile Photo
                  </a>
                  <a
                    class=" logout effect effect-4"
                    onClick={() => changeAccountType()}
                  >
                    Change Account Type
                  </a>

                  <a
                    class=" cancle effect effect-4"
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
