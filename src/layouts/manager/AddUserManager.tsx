import React, { useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Input, Select, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AddManagerUser,
  addManagerUser,
} from "../../feature/manager/user/AddManagerUser";
import { auth, db } from "../../firebase/firebase";

const AltaAddManagerUser = () => {
  const [UserNameManagerUser, setUserNameManagerUser] = useState("");
  const [NameUser, setNameUser] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");
  const [StatusActive, setStatusActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddData = async () => {
    if (
      UserNameManagerUser &&
      NameUser &&
      Phone &&
      Email &&
      Role &&
      password &&
      conformPassword &&
      StatusActive
    ) {
      try {
        // Step 1: Add the user data to Firestore
        const docRef = await db.collection("managerUser").add({
          UserNameManagerUser,
          NameUser,
          Phone: parseInt(Phone),
          Email,
          Role,
          password,
          conformPassword,
          StatusActive,
        });

        await auth.createUserWithEmailAndPassword(Email, password);
        if (auth.currentUser) {
          await auth.currentUser.updateProfile({
            displayName: docRef.id,
          });
        }
        setUserNameManagerUser("");
        setNameUser("");
        setPhone("");
        setEmail("");
        setRole("");
        setPassword("");
        setconformPassword("");
        setStatusActive("");
        navigate("/userManager", {
          state: { message: "Thêm người dùng thành công" },
        });
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };
  return (
    <div className="row">
      <div
        className="col-lg-2"
        style={{
          paddingRight: "0px",
        }}
      >
        <SlideMenu />
      </div>
      <div
        className="col-lg-10"
        style={{
          paddingLeft: "0px",
          backgroundColor: "rgba(246, 246, 246, 1)",
        }}
      >
        <div
          className="d-flex justify-content-between py-3"
          style={{
            paddingRight: "80px",
            paddingLeft: "30px",
          }}
        >
          <div className="d-flex">
            <Typography className="TitleAddDevice">Cài đặt hệ thống</Typography>
            <Link to="/userManager" id="ListAddDevice">
              Quản lý tài khoản
            </Link>
            <Typography id="ListAddDevices">Thêm tài khoản</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <Typography className="fs-4 listDeviceTitle">
            Quản lý tài khoản
          </Typography>
          <div className="bgWhiteAddDevice">
            <Typography className="InForAddDeviceTitle">
              Thông tin tài khoản
            </Typography>
            <div className="row px-4 mt-1">
              <div className="col-6">
                <label htmlFor="">
                  Họ tên:
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{
                      marginTop: "10px !important",
                    }}
                  >
                    *
                  </span>
                </label>
                <Input
                  className="mt-1"
                  placeholder="Nhập họ tên"
                  value={NameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="">
                  Tên đăng nhập:
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{
                      marginTop: "10px !important",
                    }}
                  >
                    *
                  </span>
                </label>
                <Input
                  className="mt-1"
                  placeholder="Nhập tên đăng nhập"
                  value={UserNameManagerUser}
                  onChange={(e) => setUserNameManagerUser(e.target.value)}
                />
              </div>
            </div>
            <div className="row px-4 mt-1">
              <div className="col">
                <label htmlFor="">
                  Số điện thoại:
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{
                      marginTop: "10px !important",
                    }}
                  >
                    *
                  </span>
                </label>
                <Input
                  className="mt-1"
                  placeholder="Nhập số điện thoại"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="">
                  Mật khẩu:
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{
                      marginTop: "10px !important",
                    }}
                  >
                    *
                  </span>
                </label>
                <Input.Password
                  className="mt-1"
                  placeholder="Nhập tài khoản"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row px-4 mt-1">
              <div className="col">
                <label htmlFor="">
                  Email:
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{
                      marginTop: "10px !important",
                    }}
                  >
                    *
                  </span>
                </label>
                <Input
                  className="mt-1"
                  placeholder="Nhập email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="">
                  Nhập lại mật khẩu:
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{
                      marginTop: "10px !important",
                    }}
                  >
                    *
                  </span>
                </label>
                <Input.Password
                  className="mt-1"
                  placeholder="Nhập mật khẩu"
                  value={conformPassword}
                  type="password"
                  onChange={(e) => setconformPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row px-4 mt-1">
              <div className="col">
                <label htmlFor="">
                  Vai trò:
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{
                      marginTop: "10px !important",
                    }}
                  >
                    *
                  </span>
                </label>
                <Select
                  className="mt-1 d-block"
                  value={Role}
                  placeholder="Chọn vai trò"
                  onChange={(value) => setRole(value)}
                  options={[
                    {
                      label: "Kế toán",
                      value: "Kế toán",
                    },
                    {
                      label: "Bác sĩ",
                      value: "Bác sĩ",
                    },
                    {
                      label: "Lễ tân",
                      value: "Lễ tân",
                    },
                    {
                      label: "Quản lý",
                      value: "Quản lý",
                    },
                    {
                      label: "Admin",
                      value: "Admin",
                    },
                    {
                      label: "Superadmin",
                      value: "Superadmin",
                    },
                  ]}
                />
              </div>
              <div className="col">
                <label htmlFor="">
                  Tình trạng
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{
                      marginTop: "10px !important",
                    }}
                  >
                    *
                  </span>
                </label>
                <Select
                  defaultValue={"Hoạt động"}
                  className="mt-1 d-block"
                  value={StatusActive}
                  placeholder="Chọn loại thiết bị"
                  onChange={(value) => setStatusActive(value)}
                  options={[
                    {
                      label: "Hoạt động",
                      value: "Hoạt động",
                    },
                    {
                      label: "Ngưng hoạt động",
                      value: "Ngưng hoạt động",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="btnAddDevice">
            <Link
              to="/userManager"
              className="btnCancleAddDevice text-decoration-none"
            >
              Hủy bỏ
            </Link>
            <button className="btnAddDevices" onClick={handleAddData}>
              Thêm thiết bị
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaAddManagerUser;
