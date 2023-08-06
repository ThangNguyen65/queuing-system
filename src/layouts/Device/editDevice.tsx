import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Input, Select, Space, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  selectData,
  updateDevice,
} from "../../feature/device/actionDevice";

const { Option } = Select;

const allServices = [
  "Khám tim mạch",
  "Khám sản phụ khoa",
  "Khám răng hàm mặt",
  "Khám tai mũi họng",
  "Khám hô hấp",
  "Khám tổng quát",
];

const AltaEditDevice = () => {
  const { id } = useParams();
  const data = useSelector(selectData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State để lưu trữ dữ liệu hiển thị lên Input và Select
  const [idDevice, setIdDevice] = useState("");
  const [nameDevice, setNameDevice] = useState("");
  const [addressIp, setAddressIp] = useState("");
  const [serviceUsed, setServiceUsed] = useState<string[]>([]);
  const [categoryDevice, setCategoryDevice] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAllServices, setShowAllServices] = useState(false);
  const [showServicesSelect, setShowServicesSelect] = useState(true);

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  useEffect(() => {
    const DeviceData = data.find((item) => item.id === id);
    if (DeviceData) {
      setIdDevice(DeviceData.idDevice);
      setNameDevice(DeviceData.nameDevice);
      setAddressIp(DeviceData.addressIp);
      setServiceUsed(DeviceData.serviceUsed.split(","));
      setCategoryDevice(DeviceData.categoryDevice);
      setUsername(DeviceData.username);
      setPassword(DeviceData.password);
    }
  }, [data, id]);

  const handleUpdateDevice = () => {
    // Tạo object mới để cập nhật dữ liệu
    const DeviceDataUpdated = {
      id: id,
      idDevice: idDevice,
      nameDevice: nameDevice,
      addressIp: addressIp,
      serviceUsed: showAllServices ? "Tất cả" : serviceUsed.join(","),
      categoryDevice: categoryDevice,
      username: username,
      password: password,
    };
    dispatch(updateDevice(DeviceDataUpdated as any) as any);
    navigate("/device");
  };

  const handleSelectAllServices = () => {
    if (!showAllServices) {
      // Nếu chưa chọn tất cả thì cập nhật giá trị của serviceUsed là tất cả các dịch vụ và đánh dấu là đã chọn tất cả
      setServiceUsed(allServices);
      setShowAllServices(true);
    } else {
      // Nếu đã chọn tất cả thì cập nhật giá trị của serviceUsed là rỗng (không chọn dịch vụ nào) và đánh dấu là chưa chọn tất cả
      setServiceUsed([]);
      setShowAllServices(false);
    }
  };

  const handleRemoveService = (service: any) => {
    const updatedServices = serviceUsed.filter((item) => item !== service);
    setServiceUsed(updatedServices);
    if (updatedServices.length === 0) {
      setShowServicesSelect(true);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-2" style={{ paddingRight: "0px" }}>
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
          style={{ paddingRight: "80px", paddingLeft: "30px" }}
        >
          <div className="d-flex">
            <Typography className="TitleAddDevice">Thiết bị</Typography>
            <Link to="/device" id="ListAddDevice">
              Danh sách thiết bị
            </Link>
            <Typography id="ListAddDevices">Cập nhật thiết bị</Typography>
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
                    style={{ marginTop: "10px !important" }}
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
                    style={{ marginTop: "10px !important" }}
                  >
                    *
                  </span>
                </label>
                <Select
                  className="mt-1 d-block"
                  placeholder="Chọn loại thiết bị"
                  value={categoryDevice}
                  onChange={(value) => setCategoryDevice(value)}
                >
                  <Option value="Kiosk">Kiosk</Option>
                  <Option value="Display counter">Display counter</Option>
                </Select>
              </div>
            </div>
            <div className="row px-4 mt-1">
              <div className="col">
                <label htmlFor="">
                  Tên thiết bị:
                  <span
                    className="text-danger fw-bold ms-1"
                    style={{ marginTop: "10px !important" }}
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
                    style={{ marginTop: "10px !important" }}
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
                    style={{ marginTop: "10px !important" }}
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
                    style={{ marginTop: "10px !important" }}
                  >
                    *
                  </span>
                </label>
                <Input
                  className="mt-1"
                  placeholder="Nhập mật khẩu"
                  value={password}
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
                    style={{ marginTop: "10px !important" }}
                  >
                    *
                  </span>
                </label>
                {showServicesSelect && (
                  <Select
                    mode="multiple"
                    className="mt-1"
                    style={{ width: "100%" }}
                    placeholder="Nhập dịch vụ sử dụng"
                    optionLabelProp="label"
                    value={showAllServices ? allServices : serviceUsed}
                    onChange={(value) => {
                      if (value.includes("Tất cả")) {
                        handleSelectAllServices();
                      } else {
                        setShowAllServices(false);
                        setServiceUsed(value);
                      }
                    }}
                  >
                    {showAllServices ? (
                      <Option value="Tất cả" label="Tất cả">
                        <Space>Tất cả</Space>
                      </Option>
                    ) : null}
                    {allServices.map((service) => (
                      <Option key={service} value={service} label={service}>
                        <Space>{service}</Space>
                      </Option>
                    ))}
                  </Select>
                )}
              </div>
              <Typography className="mt-1">
                <span
                  className="text-danger fw-bold me-1"
                  style={{ marginTop: "10px !important" }}
                >
                  *
                </span>
                Là trường thông tin bắt buộc
              </Typography>
            </div>
          </div>
          <div className="btnAddDevice">
            <Link to="/device" className="btnCancleAddDevice">
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

export default AltaEditDevice;
