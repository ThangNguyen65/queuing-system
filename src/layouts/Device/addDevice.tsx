import React, { useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Input, Select, Space, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useNavigate } from "react-router-dom";
import { AddDevice, addDevices } from "../../feature/actionAddDevice";
import { useDispatch } from "react-redux";
const { Option } = Select;
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
      const serviceUsedString = serviceUsed.join(", ");
      // Tạo đối tượng AddDevice mới với các thông tin đã nhập
      const newData: AddDevice = {
        id: "", // Id sẽ được tạo tự động bởi Firebase
        idDevice,
        nameDevice,
        addressIp,
        username,
        password,
        statusActive: "Hoạt động", // Trạng thái mặc định là "Hoạt động"
        statusConnect: "Kết nối", // Trạng thái mặc định là "Kết nối"
        serviceUsed: serviceUsedString,
        categoryDevice,
      };

      // Gọi action addDevices và truyền newData vào để lưu vào Firebase
      dispatch(addDevices(newData) as any);

      // Reset các trường về giá trị mặc định sau khi thêm thành công
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
                >
                  <Option value="Khám tim mạch" label="Khám tim mạch">
                    <Space>Khám tim mạch</Space>
                  </Option>
                  <Option value="Khám sản phụ khoa" label="Khám sản phụ khoa">
                    <Space>Khám sản phụ khoa</Space>
                  </Option>
                  <Option value="Khám răng hàm mặt" label="Khám răng hàm mặt">
                    <Space>Khám răng hàm mặt</Space>
                  </Option>
                  <Option value="Khám tai mũi họng" label="Khám tai mũi họng">
                    <Space>Khám tai mũi họng</Space>
                  </Option>
                  <Option value="Khám hô hấp" label="Khám hô hấp">
                    <Space>Khám hô hấp</Space>
                  </Option>
                  <Option value="Khám tổng quát" label="Khám tổng quát">
                    <Space>Khám tổng quát</Space>
                  </Option>
                </Select>
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
