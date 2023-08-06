import React, { useEffect, useState } from "react";
import "../../assets/css/login/login.css";
import LoginImageRight from "../../assets/img/login/LoginImage.png";
import LogoLogin from "../../assets/img/login/Logo alta.svg";
import { Image, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataManagerUser } from "../../feature/manager/user/userManager";
import { loginSuccess } from "../../feature/auth/login";
import { InfoCircleOutlined } from "@ant-design/icons";

function Altalogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataMgUs = useSelector((state: any) => state.dataMgUs.dataMgUs);

  const isAuthenticated = useSelector(
    (state: any) => state.login.isAuthenticated
  );

  useEffect(() => {
    dispatch(fetchDataManagerUser() as any);
  }, [dispatch]);

  useEffect(() => {
    const currentUserData = localStorage.getItem("currentUser");
    if (isAuthenticated && currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      dispatch(loginSuccess(currentUser));
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("currentUser");
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    const isValidLogin = dataMgUs.some(
      (user: any) =>
        user.UserNameManagerUser === username && user.password === password
    );

    if (isValidLogin) {
      const currentUser = dataMgUs.find(
        (user: any) =>
          user.UserNameManagerUser === username && user.password === password
      );
      if (currentUser) {
        dispatch(loginSuccess(currentUser));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        navigate("/dashboard");
      }
    } else {
      setIsLoginFailed(true);
      setTimeout(() => setIsLoginFailed(false), 3000);
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
        <div className={`IPLogin ${isLoginFailed ? "error" : ""}`}>
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
                className="PasswordLogins"
              />
            </div>
          </div>
          {isLoginFailed && (
            <div className="d-flex mt-2" style={{ fontSize: "12px" }}>
              <InfoCircleOutlined
                style={{
                  marginTop: "5px",
                  color: "red",
                  marginRight: "5px",
                }}
              />
              <div className="login-error">Sai mật khẩu hoặc tên đăng nhập</div>
            </div>
          )}
        </div>
        <div className="forgot">
          <Link
            to="/forgot"
            className={`forgotPassword ${isLoginFailed ? "move-down" : ""}`}
            style={{ display: "block", color: "#e73f3f" }}
          >
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
