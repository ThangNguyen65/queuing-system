import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Checkbox, Input, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import {
  addManagerRole,
  fetchDataManagerRole,
  managerRole,
} from "../../feature/manager/role/managerRole";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/selectors";
import { addActivity } from "../../feature/manager/note/note";

const AltaAddManagerRole = () => {
  const [NameManagerRole, setNameManagerRole] = useState("");
  const [DescribeManagerRole, setDescribeManagerRole] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const formatDate = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  useEffect(() => {
    dispatch(fetchDataManagerRole() as any);
  }, [dispatch]);
  const handleAddData = () => {
    if (NameManagerRole && DescribeManagerRole) {
      const newData: managerRole = {
        id: "",
        NameManagerRole,
        DescribeManagerRole,
      };
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
      dispatch(addManagerRole(newData) as any);
      const newActivity = {
        userName: currentUser?.NameUser || "null",
        action: "Cập nhật thông tin vai trò" + " " + NameManagerRole,
        deviceAddress: "192.168.1.1",
        levelNumberGrantTime: formattedDate,
      };
      dispatch(addActivity(newActivity as any) as any);
      setNameManagerRole("");
      setDescribeManagerRole("");

      navigate("/roleManager");
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
              onClick={handleAddData}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaAddManagerRole;
