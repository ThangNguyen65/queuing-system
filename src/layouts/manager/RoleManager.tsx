import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Image, Table, Typography, Spin } from "antd";
import "../../assets/css/device/device.css";
import AddDevicev from "../../assets/img/device/ThemThietBiMoi.svg";
import search from "../../assets/img/device/search.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

import "../../assets/css/manager/managerRole.css";
import {
  fetchDataManagerRole,
  selectData,
  selectError,
  selectLoading,
} from "../../feature/managerRole";
const AltaManagerRole = () => {
  const dataMgRl = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(fetchDataManagerRole());
  }, [dispatch]);
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const column = [
    {
      title: "Tên vai trò",
      dataIndex: "NameManagerRole",
      value: "NameManagerRole",
      key: "NameManagerRole",
    },
    {
      title: "Số người dùng",
      dataIndex: "NumberUser",
      value: "NumberUser",
      key: "NumberUser",
    },
    {
      title: "Mô tả",
      dataIndex: "DescribeManagerRole",
      value: "DescribeManagerRole",
      key: "DescribeManagerRole",
    },
    {
      title: "",
      render: (record: any) => (
        <Link
          to={`/edit/${record.id}`}
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
            <Typography id="ListDevice">Quản lý vai trò</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <Typography className="fs-4 listDeviceTitle">
            Quản lý dịch vụ
          </Typography>
          <div className="d-flex">
            <div>
              <label className="d-block lbSearchManagerRole">Từ khoá</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="IPSearchManagerRole"
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
                dataSource={dataMgRl}
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
            <div className="mt-3 addDevice">
              <Link to="" className="text-decoration-none">
                <Image src={AddDevicev} preview={false} className="ms-1" />
                <Typography className="AddDeviceText">
                  Thêm <br /> dịch vụ
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaManagerRole;