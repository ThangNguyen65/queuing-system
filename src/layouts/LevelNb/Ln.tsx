import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import arrowRight from "../../assets/img/lvNumber/arrow-right.svg";
import {
  Badge,
  Image,
  Select,
  Space,
  Table,
  Typography,
  DatePicker,
} from "antd";
import "../../assets/css/levelNumber/levelNumber.css";
import AddDevicev from "../../assets/img/device/ThemThietBiMoi.svg";
import search from "../../assets/img/device/search.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  FetchDataLevelNumber,
  selectDataLvNB,
  selectError,
} from "../../feature/levelNo/levelNumber";

import { fetchDataService, selectDataSV } from "../../feature/service/service";
import { selectCurrentUser } from "../../app/selectors";
const AltaLevelNumber = () => {
  const data = useSelector(selectDataLvNB);
  const currentUser = useSelector(selectCurrentUser);

  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  const [nameService, setNameService] = useState("Tất cả");
  const [powerSupply, setPowerSupply] = useState("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState("");
  const dataService = useSelector(selectDataSV);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };
  useEffect(() => {
    dispatch(fetchDataService());
  }, [dispatch]);
  
  const options = dataService.map((service: any) => ({
    label: service.NameService,
    value: service.NameService,
  }));
  const filteredData = data.filter((item) => {
    const isService =
      nameService === "Tất cả" || item.NameServices === nameService;
    const isStatus = activeStatus === "Tất cả" || item.Status === activeStatus;
    const isPowerSupply =
      powerSupply === "Tất cả" || item.PowerSupply === powerSupply;
    const isSearchMatch =
      searchKeyword.trim() === "" ||
      item.IdLevelNum.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.NameCustomer.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.NameServices.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.GrantTime.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.Expiry.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.Status.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.PowerSupply.toLowerCase().includes(searchKeyword.toLowerCase());
    return isService && isStatus && isPowerSupply && isSearchMatch;
  });

  useEffect(() => {
    dispatch(FetchDataLevelNumber());
  }, [dispatch]);
  const renderDateTime = (date: Date) => {
    console.log("Date received:", date);
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "IdLevelNum",
      value: "IdLevelNum",
      key: "IdLevelNum",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "NameCustomer",
      key: "NameCustomer",
      render: (text: string, record: any) => {
        if (record.NameCustomer === currentUser?.NameUser) {
          return currentUser?.NameUser;
        }
        return text;
      },
    },
    {
      title: "Tên dịch vụ ",
      dataIndex: "NameServices",
      value: "NameServices",
      key: "NameServices",
    },
    {
      title: "Thời gian cấp",
      dataIndex: "GrantTime",
      value: "GrantTime",
      key: "GrantTime",
      // render: (date: Date) => renderDateTime(date),
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "Expiry",
      value: "Expiry",
      key: "Expiry",
      // render: (date: Date) => renderDateTime(date),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      value: "Status",
      render: (connectionStatus: string) => (
        <Space>
          {connectionStatus === "Đã sử dụng" ? (
            <Badge status="default"></Badge>
          ) : connectionStatus === "Đang chờ" ? (
            <Badge status="processing"></Badge>
          ) : (
            <Badge status="error"></Badge>
          )}
          <span>{connectionStatus}</span>
        </Space>
      ),
      key: "Status",
    },
    {
      title: "Nguồn cấp",
      dataIndex: "PowerSupply",
      value: "PowerSupply",
      key: "PowerSupply",
    },
    {
      title: "",
      value: "",
      render: (record: any) => (
        <Link
          to={`/DetailLvNumber/${record.id}`}
          style={{
            padding: "0px 10px",
          }}
        >
          Chi tiết
        </Link>
      ),
    },
  ];
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
            <Typography className="TitleDevice">Cấp số</Typography>
            <Typography id="ListDevice">Danh sách cấp số</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <Typography className="fs-4 listDeviceTitle">
            Quản lý cấp số
          </Typography>
          <div className="d-flex">
            <div>
              <label className="d-block lbSelectActive">Tên dịch vụ</label>
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
                  ...options,
                ]}
                onChange={setNameService}
              />
            </div>
            <div>
              <label className="d-block lbSelectConnectStatus">
                Trình trạng
              </label>
              <Select
                defaultValue="Tất cả"
                style={{
                  width: "70%",
                  margin: "5px 0px 0px 50px",
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
                    label: "Đang chờ",
                    value: "Đang chờ",
                  },
                  {
                    label: "Đã sử dụng",
                    value: "Đã sử dụng",
                  },
                  {
                    label: "Bỏ qua",
                    value: "Bỏ qua",
                  },
                ]}
                onChange={setActiveStatus}
              />
            </div>
            <div>
              <label className="d-block lbSelectConnectPowerSupply">
                Nguồn cấp
              </label>
              <Select
                defaultValue="Tất cả"
                style={{
                  width: "70%",
                  margin: "5px 0px 0px 35px",
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
                    label: "Kiosk",
                    value: "Kiosk",
                  },
                  {
                    label: "Hệ thống",
                    value: "Hệ thống",
                  },
                ]}
                onChange={setPowerSupply}
              />
            </div>
            <div>
              <label className="d-block lbSelectConnectDate">
                Chọn thời gian
              </label>
              <div>
                <DatePicker
                  style={{
                    width: "40%",
                    margin: "5px 0px 0px 25px",
                    border: "1.5px solid #D4D4D7",
                    borderRadius: "8px",
                  }}
                />
                <Image src={arrowRight} preview={false} />
                <DatePicker
                  style={{
                    width: "40%",
                    margin: "5px 0px 0px  0px",
                    border: "1.5px solid #D4D4D7",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
            <div>
              <label className="d-block lbSearchLvNumber">Từ khoá</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="IPSearchLevelNumber"
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
          <div
            style={{
              position: "relative",
            }}
          >
            <Table
              className="ms-4 mt-2"
              columns={columns}
              dataSource={filteredData}
              style={{
                width: "74%",
                position: "absolute",
              }}
              pagination={{
                pageSize: 9,
              }}
              rowClassName={getRowClassName}
            ></Table>
            <div
              style={{
                padding: "10px 23px",
                width: "7%",
                marginLeft: "990px",
                marginTop: "8px",
                position: "absolute",
                height: "16vh",
                backgroundColor: "rgba(255,242,231,1)",
              }}
            >
              <Link to="/AddLevelNumber" className="text-decoration-none">
                <Image src={AddDevicev} preview={false} className="ms-1" />
                <Typography className="AddDeviceText">
                  Cấp <br /> số mới
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaLevelNumber;
