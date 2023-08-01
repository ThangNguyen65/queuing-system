import { Avatar, Image, Typography } from "antd";
import React from "react";
import NavImage from "../../assets/img/nav/ImageEmIu.jpg";
import "../../assets/css/nav/nav.css";
import Nofication from "../../assets/img/nav/notification.svg";
import { Link } from "react-router-dom";
function AltaNavbar() {
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
            <Typography className="TextNav">Huỳnh Ngọc Ngân</Typography>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AltaNavbar;
