import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import {
  Badge,
  Image,
  Select,
  Space,
  Spin,
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
  selectData,
  selectError,
  selectLoading,
} from "../../feature/levelNumber";
const { RangePicker } = DatePicker;
const AltaLevelNumber = () => {
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  const [connectStatus, setConnectStatus] = useState("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFullServiceUsed, setIsFullServiceUsed] = useState(false);
  useEffect(() => {
    dispatch(FetchDataLevelNumber());
  }, [dispatch]);

  // Tim kiem và phân trang
  //   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchKeyword(event.target.value);
  //   };
  //   const filteredData = data.filter((item) => {
  //     const isActiveMatch =
  //       activeStatus === "Tất cả" || item.statusActive === activeStatus;
  //     const isConnectMatch =
  //       connectStatus === "Tất cả" || item.statusConnect === connectStatus;
  //     const isSearchMatch =
  //       searchKeyword.trim() === "" ||
  //       item.idDevice.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  //       item.nameDevice.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  //       item.addressIp.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  //       item.statusActive.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  //       item.statusConnect.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  //       item.serviceUsed.toLowerCase().includes(searchKeyword.toLowerCase());
  //     return isActiveMatch && isConnectMatch && isSearchMatch;
  //   });
  //
  // gioi han dich vu

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
      value: "NameCustomer",
      key: "NameCustomer",
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
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "Expiry",
      value: "Expiry",
      key: "Expiry",
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
      key: "Nguồn cấp",
    },
    {
      title: "Tên dịch vụ ",
      dataIndex: "PowerSupply",
      value: "PowerSupply",
      key: "PowerSupply",
    },
    {
      title: "",
      value: "",
      render: (record: any) => (
        <Link
          to={`/detailDevice/${record.id}`}
          style={{
            padding: "0px 10px",
          }}
        >
          Chi tiết
        </Link>
      ),
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
              <label className="d-block lbSelectConnectStatus">
                Trình trạng
              </label>
              <Select
                defaultValue="Tất cả"
                style={{
                  width: "100%",
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
                    label: "Kết nối",
                    value: "Kết nối",
                  },
                  {
                    label: "Mất kết nối",
                    value: "Mất kết nối",
                  },
                ]}
                onChange={setConnectStatus}
              />
            </div>
            <div>
              <label className="d-block lbSelectConnectPowerSupply">
                Nguồn cấp
              </label>
              <Select
                defaultValue="Tất cả"
                style={{
                  width: "100%",
                  margin: "5px 0px 0px 65px",
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
                    label: "Kết nối",
                    value: "Kết nối",
                  },
                  {
                    label: "Mất kết nối",
                    value: "Mất kết nối",
                  },
                ]}
                onChange={setConnectStatus}
              />
            </div>
            <div>
              <label className="d-block lbSelectConnectDate">
                Chọn thời gian
              </label>
              <RangePicker
                style={{
                  width: "70%",
                  margin: "5px 0px 0px 80px",
                  border: "1.5px solid #D4D4D7",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div>
              <label className="d-block lbSearch">Từ khoá</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="IPSearchLevelNumber"
                  placeholder="Nhập từ khóa"
                  value={searchKeyword}
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
              dataSource={data}
              style={{
                width: "74%",
                position: "absolute",
              }}
              pagination={{
                pageSize: 2,
              }}
              rowClassName={getRowClassName}
            ></Table>
            <div className="addDevice">
              <Link to="/addDevice" className="text-decoration-none">
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
