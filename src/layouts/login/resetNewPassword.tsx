import { Button, Image, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoLogin from "../../assets/img/login/Logo alta.svg";
import LoginImageRight from "../../assets/img/login/ForgotPassword.png";
import "../../assets/css/login/resetnewpassword.css";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataManagerUser,
  selectData,
  updateManagerUser,
} from "../../feature/manager/user/userManager";

function ResetNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const location = useLocation();
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const dispatch = useDispatch();
  const dataManagerUser = useSelector(selectData);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  useEffect(() => {
    dispatch(fetchDataManagerUser() as any);
  }, [dispatch]);

  const handleResetPassword = async () => {
    try {
      if (!user) {
        console.error("Người dùng không tồn tại.");
        return;
      }

      if (isPasswordMatch) {
        const authUser = auth.currentUser;
        if (authUser) {
          console.log("Attempting to update password...");
          await authUser.updatePassword(password);
          console.log("Password updated successfully.");
        } else {
          throw new Error("Người dùng không tồn tại.");
        }
        const userRef = db.collection("managerUser").doc(email);
        await userRef.update({ password });
        const updatedManagerUser = {
          id: user.id,
          UserNameManagerUser: user.UserNameManagerUser,
          NameUser: user.NameUser,
          Phone: user.Phone,
          Email: user.Email,
          Role: user.Role,
          StatusActive: user.StatusActive,
          password,
          conformPassword: user.conformPassword,
        };
        dispatch(updateManagerUser(updatedManagerUser) as any);
        navigate("/login");
      } else {
        console.error("Mật khẩu và xác nhận mật khẩu không khớp.");
      }
    } catch (error: any) {
      console.error("Lỗi khi thay đổi mật khẩu:", error.message);
    }
  };

  useEffect(() => {
    setIsPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  // Check if dataManagerUser is loaded successfully before proceeding
  if (!dataManagerUser) {
    return <div>Loading...</div>;
  }

  const user = dataManagerUser.find((user) => user.Email === email);

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
