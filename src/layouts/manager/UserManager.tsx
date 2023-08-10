import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Image, Table, Typography, Spin, Select, Space, Badge } from "antd";
import "../../assets/css/device/device.css";
import AddDevicev from "../../assets/img/device/ThemThietBiMoi.svg";
import search from "../../assets/img/device/search.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

import "../../assets/css/manager/managerRole.css";
import {
  fetchDataManagerUser,
  selectData,
  selectError,
  selectLoading,
} from "../../feature/manager/user/userManager";
const AltaManagerUser = () => {
  const dataMgRl = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  
  useEffect(() => {
    dispatch(fetchDataManagerUser());
  }, [dispatch]);
  
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };
  const filteredData = dataMgRl.filter((item) => {
    const isActiveMatch =
      activeStatus === "Tất cả" || item.StatusActive === activeStatus;
    const isSearchMatch =
      searchKeyword.trim() === "" ||
      item.UserNameManagerUser.toLowerCase().includes(
        searchKeyword.toLowerCase()
      ) ||
      item.NameUser.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.Email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.Role.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.Phone.toString().includes(searchKeyword.toLowerCase()) ||
      item.StatusActive.toLowerCase().includes(searchKeyword.toLowerCase());
    return isActiveMatch && isSearchMatch;
  });
  const column = [
    {
      title: "Tên đăng nhập",
      dataIndex: "UserNameManagerUser",
      value: "UserNameManagerUser",
      key: "UserNameManagerUser",
    },
    {
      title: "Họ tên",
      dataIndex: "NameUser",
      value: "NameUser",
      key: "NameUser",
    },
    {
      title: "Số điện thoại",
      dataIndex: "Phone",
      value: "Phone",
      key: "Phone",
    },
    {
      title: "Email",
      dataIndex: "Email",
      value: "Email",
      key: "Email",
    },
    {
      title: "Vai trò",
      dataIndex: "Role",
      value: "Role",
      key: "Role",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "StatusActive",
      value: "StatusActive",
      key: "StatusActive",
      render: (connectionStatus: string) => (
        <Space>
          {connectionStatus === "Hoạt động" ? (
            <Badge status="success"></Badge>
          ) : (
            <Badge status="error"></Badge>
          )}
          <span>{connectionStatus}</span>
        </Space>
      ),
    },
    {
      title: "",
      render: (record: any) => (
        <Link
          to={`/editManager/${record.id}`}
          style={{
            padding: "0px 10px",
          }}
        >
          Cập nhật
        </Link>
      ),
    },
  ];
  if (loading) {
    return (
      <div
        style={{
          margin: "250px 0px 0px 610px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

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
            <Typography className="TitleDevice">Cài đặt hệ thống</Typography>
            <Typography id="ListDevice">Quản lý tài khoản</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <Typography className="fs-4 listDeviceTitle">
            Danh sách tài khoản
          </Typography>
          <div className="d-flex">
            <div>
              <label className="d-block lbSelectActive">
                Trạng thái hoạt động
              </label>
              <Select
                defaultValue="Tất cả"
                style={{
                  width: "100%",
                  margin: "5px 0px 0px 30px",
                  border: "1.5px solid #D4D4D7",
                  borderRadius: "8px",
                }}
                placeholder="Tất cả"
                id="#SelectActive"
                options={[
                  {
                    label: "Tất cả",
                    value: "Tất cả",
                  },
                  {
                    label: "Hoạt động",
                    value: "Hoạt động",
                  },
                  {
                    label: "Ngưng hoạt động",
                    value: "Ngưng hoạt động",
                  },
                ]}
                onChange={setActiveStatus}
              />
            </div>
            <div>
              <label className="d-block lbSearchManagerUser">Từ khoá</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="IPSearchManagerUser"
                  placeholder="Nhập từ khóa"
                  value={searchKeyword}
                  onChange={handleSearchChange}
                />
                <button className="btnSearchDevice">
                  <Image src={search} preview={false} />
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <Table
                dataSource={filteredData}
                columns={column}
                className="ms-4 mt-2"
                style={{
                  width: "74%",
                  position: "absolute",
                }}
                pagination={{
                  pageSize: 2,
                }}
                rowClassName={getRowClassName}
              ></Table>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 242, 231, 1)",
                padding: "10px 23px",
                width: "8%",
                marginLeft: "975px",
                height: "15vh",
              }}
            >
              <Link to="/addUserManager" className="text-decoration-none">
                <Image src={AddDevicev} preview={false} className="ms-1" />
                <Typography className="AddDeviceText">
                  Thêm tài khoản
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaManagerUser;
