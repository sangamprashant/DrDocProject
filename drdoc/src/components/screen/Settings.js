import React, { useContext, useEffect, useState } from "react";
import "../css/Setting.css";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import UserImageGif from "../lottiejson/user.json";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import ProfilePic from "./ProfilePic";
import ChangeAccount from "../ChangeAccount";

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
  //lottis file run
  const options = {
    loop: true,
    autoplay: true,
    animationData: UserImageGif,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const SettingData = () => {
    if (token) {
      return [
        <>
          <div className="center-container" style={{}}>
            <div className=" container-setting">
              <div className="user-image">
                {loggeduser.Photo ? (
                  <img
                    src={loggeduser.Photo}
                    alt="this image contains user-image"
                  />
                ) : (
                  <Lottie
                    options={options}
                    height={150}
                    width={150}
                    isPaused={false}
                  />
                )}
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
                          navigate(`/${loggeduser.userName}/myproducts`)
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
