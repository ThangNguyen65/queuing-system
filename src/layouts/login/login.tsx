import React from "react";
import "../../assets/css/login/login.css";
import LoginImageRight from "../../assets/img/login/LoginImage.png";
import LogoLogin from "../../assets/img/login/Logo alta.svg";
import { Image, Input, Typography } from "antd";
import { Link } from "react-router-dom";
function Altalogin() {
  return (
    <div className="row">
      <div className="col-lg-5 bgLoginLeft">
        <div>
          <Image
            src={LogoLogin}
            className="imageLogo"
            preview={false}
            width={"25%"}
          />
        </div>
        <div className="IPLogin">
          <div>
            <label htmlFor="">Tên đăng nhập *</label>
            <Input type="text" className="UserNameLogin" />
          </div>
          <div className="IPPassword">
            <label htmlFor="">Mật khẩu *</label>
            <div
              style={{
                marginTop: "5px",
                width: "75%",
              }}
            >
              <Input.Password />
            </div>
          </div>
        </div>
        <div className="forgot">
          <Link to="/forgot" className="forgotPassword">
            Quên mật khẩu?
          </Link>
        </div>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Link to="/dashboard" className="btnLogin">
            Đăng nhập
          </Link>
        </div>
      </div>
      <div className="col-lg-7 bgLoginRight">
        <Image
          src={LoginImageRight}
          preview={false}
          width={"60%"}
          className="ImageLoginRight"
        />
        <div className="textRight">
          <Typography.Text className="Text_Right_System">
            Hệ thống
          </Typography.Text>
          <Typography.Title className="ManagerRating">
            QUẢN LÝ XẾP HÀNG
          </Typography.Title>
        </div>
      </div>
    </div>
  );
}

export default Altalogin;
