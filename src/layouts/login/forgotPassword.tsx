import { Image, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LogoLogin from "../../assets/img/login/Logo alta.svg";
import LoginImageRight from "../../assets/img/login/ForgotPassword.png";
import "../../assets/css/login/forgot.css";
function AltaForgotPassword() {
  return (
    <div className="row">
      <div className="col-lg-5 bgLoginLeft">
        <div>
          <Image
            src={LogoLogin}
            className="imageLogoForgot"
            preview={false}
            width={"25%"}
          />
        </div>
        <div className="IPForgot">
          <h5 className="dlmk">Đặt lại mật khẩu</h5>
          <p className="textForgot">
            Vui lòng đăng nhập email để đặt lại mật khẩu của bạn *
          </p>
          <Input className="formForgot" />
          <div className="btnForgot">
            <Link className="btnCancel" to="/login">
              Huỷ
            </Link>
            <Link to="" className="btnNext">
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-7 bgForgotRight">
        <Image
          src={LoginImageRight}
          preview={false}
          width={"85%"}
          height={"70vh"}
          className="ImageForgotRight"
        />
      </div>
    </div>
  );
}

export default AltaForgotPassword;
