import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Checkbox, Input, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import {
  fetchDataManagerRole,
  selectDataMgRl,
  updateManagerRole,
} from "../../feature/manager/role/managerRole";
import { useDispatch, useSelector } from "react-redux";

const AltaEditManagerRole = () => {
  const { id } = useParams();
  const dataMgRl = useSelector(selectDataMgRl);
  const [NameManagerRole, setNameManagerRole] = useState("");
  const [DescribeManagerRole, setDescribeManagerRole] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataManagerRole() as any);
  }, [dispatch]);
  useEffect(() => {
    const DeviceData = dataMgRl.find((item) => item.id === id);
    if (DeviceData) {
      setNameManagerRole(DeviceData.NameManagerRole);
      setDescribeManagerRole(DeviceData.DescribeManagerRole);
    }
  }, [dataMgRl, id]);
  const handleUpdateRole = () => {
    const DeviceDataUpdated = {
      id: id,
      NameManagerRole: NameManagerRole,
      DescribeManagerRole: DescribeManagerRole,
    };
    dispatch(updateManagerRole(DeviceDataUpdated as any) as any);
    navigate("/roleManager");
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
            <Link to="/roleManager" id="ListAddDevice">
              Quản lý vai trò
            </Link>
            <Typography id="ListAddDevices">Thêm vai trò</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div
          style={{
            backgroundColor: "rgba(246, 246, 246, 1)",
            height: "100vh",
            width: "130%",
          }}
        >
          <Typography className="fs-4 listDeviceTitle">
            Quản lý vai trò
          </Typography>
          <div
            style={{
              backgroundColor: "#fff",
              height: "65vh",
              borderRadius: "20px",
              width: "73%",
              margin: "15px 0px 0px 30px",
            }}
          >
            <Typography className="InForAddDeviceTitle">
              Thông tin vai trò
            </Typography>
            <div className="row ms-2">
              <div className="col-lg-6">
                <div>
                  <label className="mt-2">
                    Tên vai trò <span className="text-danger">*</span>
                  </label>
                  <Input
                    type="text"
                    className="mt-2"
                    placeholder="Nhập tên vai trò"
                    value={NameManagerRole}
                    onChange={(e) => setNameManagerRole(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mt-2">Mô tả:</label>
                  <TextArea
                    rows={5}
                    placeholder="Nhập mô tả"
                    className="mt-2"
                    value={DescribeManagerRole}
                    onChange={(e) => setDescribeManagerRole(e.target.value)}
                  />
                </div>
                <Typography className="mt-2">
                  <span className="text-danger">*</span> Là trường thông tin bắt
                  buộc
                </Typography>
              </div>
              <div className="col-lg-6">
                <label className="mt-2">
                  Phân quyền chức năng <span className="text-danger">*</span>
                </label>
                <div
                  className="mt-2"
                  style={{
                    backgroundColor: "rgba(255, 242, 231, 1)",
                    height: "46vh",
                    width: "95%",
                    overflow: "auto",
                    padding: "10px 0px 0px 20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <Typography
                      style={{
                        color: "rgba(255, 117, 6, 1)",
                        fontWeight: "600",
                        fontSize: "15px",
                      }}
                    >
                      Nhóm chức năng A
                    </Typography>
                    <div className="d-flex mt-2">
                      <Checkbox></Checkbox>
                      <Typography className="ms-2">Tất cả</Typography>
                    </div>
                    <div className="d-flex mt-2">
                      <Checkbox></Checkbox>
                      <Typography className="ms-2">Chức năng x</Typography>
                    </div>
                    <div className="d-flex  mt-2">
                      <Checkbox></Checkbox>
                      <Typography className="ms-2">Chức năng y</Typography>
                    </div>
                    <div className="d-flex">
                      <Checkbox></Checkbox>
                      <Typography className="ms-2 mt-2">Chức năng z</Typography>
                    </div>
                  </div>
                  <div>
                    <Typography
                      style={{
                        color: "rgba(255, 117, 6, 1)",
                        fontWeight: "600",
                        fontSize: "15px",
                      }}
                    >
                      Nhóm chức năng B
                    </Typography>
                    <div className="d-flex mt-2">
                      <Checkbox></Checkbox>
                      <Typography className="ms-2">Tất cả</Typography>
                    </div>
                    <div className="d-flex mt-2">
                      <Checkbox></Checkbox>
                      <Typography className="ms-2">Chức năng x</Typography>
                    </div>
                    <div className="d-flex mt-2">
                      <Checkbox></Checkbox>
                      <Typography className="ms-2">Chức năng y</Typography>
                    </div>
                    <div className="d-flex mt-2">
                      <Checkbox></Checkbox>
                      <Typography className="ms-2">Chức năng z</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              margin: "20px 0px 0px 420px",
            }}
          >
            <Link
              to="/roleManager"
              className="text-decoration-none"
              style={{
                border: "1px solid rgba(255, 145, 56, 1)",
                backgroundColor: "rgba(255, 242, 231, 1)",
                padding: "5px 30px",
                borderRadius: "8px",
                color: "rgba(255, 145, 56, 1)",
              }}
            >
              Hủy bỏ
            </Link>
            <button
              style={{
                border: "none",
                backgroundColor: "rgba(255, 145, 56, 1)",
                padding: "5px 30px",
                borderRadius: "8px",
                color: "#fff",
                marginLeft: "20px",
              }}
              onClick={handleUpdateRole}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaEditManagerRole;
