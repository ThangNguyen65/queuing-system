import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Checkbox, Input, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TextArea from "antd/es/input/TextArea";
import {
  fetchDataService,
  selectDataSV,
  updateService,
} from "../../feature/service/service";

const AltaEditService = () => {
  const { id } = useParams();
  const [IdService, setIdService] = useState("");
  const [NameService, setNameService] = useState("");
  const [DescribeService, setDescribeService] = useState("");
  const [autoIncrease, setAutoIncrease] = useState(false);
  const [suffix, setSuffix] = useState("");
  const [limit, setLimit] = useState("");
  const [StatusActive, setStatusActive] = useState("");

  const dataSv = useSelector(selectDataSV);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataService() as any);
  }, [dispatch]);
  useEffect(() => {
    const DeviceData = dataSv.find((item) => item.id === id);
    if (DeviceData) {
      setIdService(DeviceData.IdService);
      setNameService(DeviceData.NameService);
      setDescribeService(DeviceData.DescribeService);
      setSuffix(DeviceData.suffix);
      setLimit(DeviceData.limit);
      setStatusActive(DeviceData.StatusActive);
    }
  }, [dataSv, id]);
  const handleUpdateDevice = () => {
    const DeviceDataUpdated = {
      id: id,
      IdService: IdService,
      NameService: NameService,
      DescribeService: DescribeService,
      suffix: suffix,
      limit: limit,
      StatusActive: StatusActive,
    };
    dispatch(updateService(DeviceDataUpdated as any) as any);
    navigate("/service");
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
            <Typography className="TitleAddDevice">Dịch vụ</Typography>
            <Link to="/service" id="ListAddDevice">
              Danh sách dịch vụ
            </Link>
            <Link to="/service" id="ListAddDevice">
              Chi tiết
            </Link>
            <Typography id="ListAddDevices">Cập nhật</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <Typography className="fs-4 listDeviceTitle">
            Quản lý dịch vụ
          </Typography>
          <div
            style={{
              backgroundColor: "#fff",
              height: "66vh",
              borderRadius: "20px",
              width: "73%",
              margin: "15px 0px 0px 30px",
            }}
          >
            <Typography className="InForAddDeviceTitle">
              Thông tin dịch vụ
            </Typography>
            <div className="row px-4 mt-1">
              <div className="col-6">
                <div>
                  <label>Mã dịch vụ: </label>
                  <Input
                    className="mt-1"
                    value={IdService}
                    onChange={(e) => setIdService(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mt-2">Tên dịch vụ :</label>
                  <Input
                    className="mt-1"
                    value={NameService}
                    onChange={(e) => setNameService(e.target.value)}
                  />
                </div>
                <Typography
                  style={{
                    color: "rgba(255, 117, 6, 1)",
                    fontSize: "20px",
                    marginTop: "10px",
                  }}
                >
                  Quy tắc cấp số
                </Typography>
                <div className="d-flex">
                  <Checkbox
                    onChange={(e) => setAutoIncrease(e.target.checked)}
                    checked={autoIncrease}
                  />
                  <span className="mt-1 ms-2 me-2">Tăng tự động từ:</span>
                  <Input
                    style={{
                      width: "13%",
                    }}
                    maxLength={4}
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                  />
                  <span className="mt-1 ms-2 me-2">đến</span>
                  <Input
                    style={{
                      width: "13%",
                    }}
                    maxLength={4}
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  />
                </div>
                <div className="d-flex mt-2">
                  <Checkbox />
                  <span className="mt-1 ms-2 me-2">Prefix:</span>
                  <Input
                    style={{
                      width: "13%",
                      marginLeft: "75px",
                    }}
                  />
                </div>
                <div className="d-flex mt-2">
                  <Checkbox />
                  <span className="mt-1 ms-2 me-2">Surfix:</span>
                  <Input
                    style={{
                      width: "13%",
                      marginLeft: "75px",
                    }}
                  />
                </div>
                <div className="d-flex">
                  <Checkbox />
                  <span className="mt-1 ms-2 me-2">Reset mỗi ngày</span>
                </div>
                <Typography className="mt-2">
                  <span>*</span>Là trường thông tin bắt buộc
                </Typography>
              </div>
              <div className="col-6">
                <label>Mô tả:</label>
                <TextArea
                  className="mt-1"
                  rows={4}
                  value={DescribeService}
                  onChange={(e) => setDescribeService(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              margin: "10px 0px 0px 364px",
            }}
          >
            <Link
              to="/service"
              className="btnCancleAddDevice text-decoration-none"
            >
              Hủy bỏ
            </Link>
            <button className="btnAddDevices" onClick={handleUpdateDevice}>
              Thêm dịch vụ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaEditService;
