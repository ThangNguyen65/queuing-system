import { Image, Input } from "antd";
import { Link } from "react-router-dom";
import LogoLogin from "../../assets/img/login/Logo alta.svg";
import LoginImageRight from "../../assets/img/login/ForgotPassword.png";
import "../../assets/css/login/resetnewpassword.css";

function ResetNewPassword() {
  return (
    <div className="row">
      <div className="col-lg-5 bgLoginLeft">
        <div>
          <Image
            src={LogoLogin}
            className="imageLogoResetNewPassword"
            preview={false}
            width={"25%"}
          />
        </div>
        <div className="FormResetNewPassword">
          <h5 className="ResetNewPasswordText">Đặt lại mật khẩu mới</h5>
          <div>
            <label id="lbPassword">Mật khẩu</label>
            <div
              style={{
                marginTop: "5px",
                width: "70%",
                marginLeft: "80px",
              }}
            >
              <Input.Password />
            </div>
            <label id="lbEnterPassword">Nhập lại mật khẩu</label>
            <div
              style={{
                marginTop: "5px",
                width: "70%",
                marginLeft: "80px",
              }}
            >
              <Input.Password />
            </div>
          </div>
          <div
            style={{
              marginTop: "50px",
            }}
          >
            <Link to="/" className="btnResetNewPassword">
              Xác nhận
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

export default ResetNewPassword;
