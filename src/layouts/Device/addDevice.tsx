import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Input, Select, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useNavigate } from "react-router-dom";
import { AddDevice, addDevices } from "../../feature/device/actionAddDevice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataService, selectDataSV } from "../../feature/service/service";
import { selectCurrentUser } from "../../app/selectors";
import { addActivity } from "../../feature/manager/note/note";

const AltaAddDevice = () => {
  const [idDevice, setIdDevice] = useState("");
  const [nameDevice, setNameDevice] = useState("");
  const [addressIp, setAddressIp] = useState("");
  const [serviceUsed, setServiceUsed] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [categoryDevice, setCategoryDevice] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataService = useSelector(selectDataSV);

  useEffect(() => {
    dispatch(fetchDataService() as any);
  }, [dispatch]);

  const currentUser = useSelector(selectCurrentUser);
  const options = dataService.map((service: any) => ({
    label: service.NameService,
    value: service.NameService,
  }));

  const possibleStatusDevice = ["Hoạt động", "Ngưng hoạt động"];

  const getRandomStatusDescribe = () => {
    const randomIndex = Math.floor(Math.random() * possibleStatusDevice.length);
    return possibleStatusDevice[randomIndex];
  };

  const possibleStatusDeviceConnect = ["Kết nối", "Mất kết nối"];

  const getRandomStatusDescribeConnect = () => {
    const randomIndex = Math.floor(
      Math.random() * possibleStatusDeviceConnect.length
    );
    return possibleStatusDeviceConnect[randomIndex];
  };

  const formatDate = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const handleAddData = () => {
    if (
      idDevice &&
      nameDevice &&
      addressIp &&
      serviceUsed.length > 0 &&
      username &&
      password &&
      categoryDevice
    ) {
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
      const serviceUsedString = serviceUsed.join(", ");
      const newData: AddDevice = {
        id: "",
        idDevice,
        nameDevice,
        addressIp,
        username,
        password,
        statusActive: getRandomStatusDescribe(),
        statusConnect: getRandomStatusDescribeConnect(),
        serviceUsed: serviceUsedString,
        categoryDevice,
      };
      dispatch(addDevices(newData) as any);
      const newActivity = {
        userName: currentUser?.UserNameManagerUser,
        action: "Cập nhật thông tin thiết bị" + nameDevice,
        deviceAddress: addressIp,
        levelNumberGrantTime: formattedDate,
      };
      dispatch(addActivity(newActivity as any) as any);
      setIdDevice("");
      setNameDevice("");
      setAddressIp("");
      setServiceUsed([]);
      setUsername("");
      setPassword("");
      setCategoryDevice("");
      navigate("/device");
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
            <Typography className="TitleAddDevice">Thiết bị</Typography>
            <Link to="/device" id="ListAddDevice">
              Danh sách thiết bị
            </Link>
            <Typography id="ListAddDevices">Thêm thiết bị</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <Typography className="fs-4 listDeviceTitle">
            Quản lý thiết bị
          </Typography>
          <div className="bgWhiteAddDevice">
            <Typography className="InForAddDeviceTitle">
              Thông tin thiết bị
            </Typography>
            <div className="row px-4 mt-1">
              <div className="col-6">
                <label htmlFor="">
                  Mã thiết bị:
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
                  placeholder="Nhập mã thiết bị"
                  value={idDevice}
                  onChange={(e) => setIdDevice(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="">
                  Loại thiết bị:
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
                  value={categoryDevice}
                  placeholder="Chọn loại thiết bị"
                  onChange={(value) => setCategoryDevice(value)}
                  options={[
                    {
                      label: "Kiosk",
                      value: "Kiosk",
                    },
                    {
                      label: "Display counter",
                      value: "Display counter",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="row px-4 mt-1">
              <div className="col">
                <label htmlFor="">
                  Tên thiết bị:
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
                  placeholder="Nhập tên thiết bị"
                  value={nameDevice}
                  onChange={(e) => setNameDevice(e.target.value)}
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
                  placeholder="Nhập tài khoản"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="row px-4 mt-1">
              <div className="col">
                <label htmlFor="">
                  Địa chỉ IP:
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
                  placeholder="Nhập địa chỉ IP"
                  value={addressIp}
                  onChange={(e) => setAddressIp(e.target.value)}
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
                <Input
                  className="mt-1"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row px-4 mt-1">
              <div className="col">
                <label htmlFor="">
                  Dịch vụ sử dụng:
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
                  mode="multiple"
                  className="mt-1"
                  style={{ width: "100%" }}
                  placeholder="Nhập dịch vụ sử dụng"
                  optionLabelProp="label"
                  value={serviceUsed}
                  onChange={(values) => setServiceUsed(values)}
                  options={options}
                ></Select>
              </div>
              <Typography className="mt-1">
                <span
                  className="text-danger fw-bold me-1"
                  style={{
                    marginTop: "10px !important",
                  }}
                >
                  *
                </span>
                Là trường thông tin bắt buộc
              </Typography>
            </div>
          </div>
          <div className="btnAddDevice">
            <Link
              to="/device"
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

export default AltaAddDevice;
