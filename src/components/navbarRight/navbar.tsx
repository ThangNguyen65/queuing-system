import { Avatar, Image, Typography } from "antd";
import React, { useEffect } from "react";
import NavImage from "../../assets/img/nav/ImageEmIu.jpg";
import "../../assets/css/nav/nav.css";
import Nofication from "../../assets/img/nav/notification.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectNameUser } from "../../app/selectorsNavbar";
import { loginSuccess } from "../../feature/auth/login";
function AltaNavbar() {
  const nameUser = useSelector(selectNameUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const persistedCurrentUser = localStorage.getItem("currentUser");
    if (persistedCurrentUser) {
      dispatch(loginSuccess(JSON.parse(persistedCurrentUser)));
    }
  }, []);
  return (
    <div>
      <div className="d-flex w-100">
        <div
          style={{
            border: "none",
            marginRight: "50px",
          }}
        >
          <Image
            src={Nofication}
            preview={false}
            width={"130%"}
            className="ImageNavBar"
          />
        </div>
        <Link to="/inFor" className="text-decoration-none d-flex">
          <Avatar size={43} src={NavImage} />
          <div className="ms-2">
            <Typography className="TextHelloNav">Xin chào</Typography>
            <Typography className="TextNav">{nameUser}</Typography>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AltaNavbar;
