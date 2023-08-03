import React, { useEffect, useState } from "react";
import "../../assets/css/login/login.css";
import LoginImageRight from "../../assets/img/login/LoginImage.png";
import LogoLogin from "../../assets/img/login/Logo alta.svg";
import { Image, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../feature/userManager";
import { loginSuccess } from "../../feature/login";
function Altalogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dataMgUs = useSelector(selectData);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: any) => state.login.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);

    const isValidLogin = dataMgUs.some(
      (user) =>
        user.UserNameManagerUser === username && user.password === password
    );

    if (isValidLogin) {
      const currentUser = dataMgUs.find(
        (user) =>
          user.UserNameManagerUser === username && user.password === password
      );
      if (currentUser) {
        console.log("Logged in as:", currentUser);
        dispatch(loginSuccess(currentUser));
        navigate("/dashboard");
      }
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.");
      setUsername("");
      setPassword("");
    }
  };

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
            <Input
              type="text"
              className="UserNameLogin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="IPPassword">
            <label htmlFor="">Mật khẩu *</label>
            <div
              style={{
                marginTop: "5px",
                width: "75%",
              }}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
          <button className="btnLogin" onClick={handleLogin}>
            Đăng nhập
          </button>
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
