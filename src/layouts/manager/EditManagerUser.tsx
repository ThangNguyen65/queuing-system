import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Input, Select, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataManagerUser,
  selectData,
  updateManagerUser,
} from "../../feature/manager/user/userManager";
import {
  fetchDataManagerRole,
  selectDataMgRl,
} from "../../feature/manager/role/managerRole";

const AltaEditManagerUser = () => {
  const { id } = useParams();
  const data = useSelector(selectData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [UserNameManagerUser, setUserNameManagerUser] = useState("");
  const [NameUser, setNameUser] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");
  const [StatusActive, setStatusActive] = useState("");
  const dataMgRl = useSelector(selectDataMgRl);
  const options = dataMgRl.map((service: any) => ({
    label: service.NameManagerRole,
    value: service.NameManagerRole,
  }));
  useEffect(() => {
    dispatch(fetchDataManagerRole() as any);
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchDataManagerUser() as any);
  }, [dispatch]);
  useEffect(() => {
    const DeviceData = data.find((item) => item.id === id);
    if (DeviceData) {
      setUserNameManagerUser(DeviceData.UserNameManagerUser);
      setNameUser(DeviceData.NameUser);
      setPhone(DeviceData.Phone.toString());
      setEmail(DeviceData.Email);
      setRole(DeviceData.Role);
      setPassword(DeviceData.password);
      setconformPassword(DeviceData.conformPassword);
      setStatusActive(DeviceData.StatusActive);
    }
  }, [data, id]);

  const handleUpdateDevice = () => {
    const DeviceDataUpdated = {
      id: id,
      UserNameManagerUser: UserNameManagerUser,
      NameUser: NameUser,
      Phone: parseInt(Phone),
      Email: Email,
      Role: Role,
      password: password,
      conformPassword: conformPassword,
      StatusActive: StatusActive,
    };
    dispatch(updateManagerUser(DeviceDataUpdated as any) as any);
    navigate("/userManager");
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
                  options={options}
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
            <button className="btnAddDevices" onClick={handleUpdateDevice}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaEditManagerUser;
