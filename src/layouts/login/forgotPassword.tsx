import { Button, Image, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoLogin from "../../assets/img/login/Logo alta.svg";
import LoginImageRight from "../../assets/img/login/ForgotPassword.png";
import "../../assets/css/login/forgot.css";
import { auth } from "../../firebase/firebase";

function AltaForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgot = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      navigate("/ResetNewPassword", { state: { email } });
    } catch (error) {
      console.error("Lỗi khi gửi email xác thực:", error);
    }
  };

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
          <Input
            className="formForgot"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="btnForgot">
            <Link className="btnCancel" to="/">
              Huỷ
            </Link>
            <Button onClick={handleForgot} className="btnNext">
              Tiếp tục
            </Button>
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
