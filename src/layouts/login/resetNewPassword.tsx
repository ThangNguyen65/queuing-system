import { Button, Image, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import LogoLogin from "../../assets/img/login/Logo alta.svg";
import LoginImageRight from "../../assets/img/login/ForgotPassword.png";
import "../../assets/css/login/resetnewpassword.css";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataManagerUser,
  selectData,
  updateManagerUserReSetNewPassword,
} from "../../feature/manager/user/userManager";

function ResetNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const emailFromUrl = new URLSearchParams(location.search).get("email");
  const dispatch = useDispatch();
  const dataManagerUser = useSelector(selectData);

  useEffect(() => {
    if (!emailFromUrl) {
      navigate("/"); // Redirect if no email is provided
    }
  }, [emailFromUrl, navigate]);

  const handleResetPassword = async () => {
    try {
      const updatedUser = dataManagerUser.find(
        (user) => user.Email === emailFromUrl
      );
      if (!updatedUser) {
        console.error("Người dùng không tồn tại.");
        return;
      }

      if (password === confirmPassword) {
        const updatedUserData = {
          ...updatedUser,
          password,
          conformPassword: confirmPassword,
        };
        await dispatch(
          updateManagerUserReSetNewPassword(updatedUserData) as any
        );
        console.log("Mật khẩu đã được cập nhật thành công.");
        navigate("/");
      } else {
        console.error("Mật khẩu và xác nhận mật khẩu không khớp.");
      }
    } catch (error: any) {
      console.error("Lỗi khi thay đổi mật khẩu:", error.message);
    }
  };
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
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label id="lbEnterPassword">Nhập lại mật khẩu</label>
            <div
              style={{
                marginTop: "5px",
                width: "70%",
                marginLeft: "80px",
              }}
            >
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "50px",
            }}
          >
            <Button
              className="btnResetNewPassword"
              onClick={handleResetPassword}
            >
              Xác nhận
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

export default ResetNewPassword;
