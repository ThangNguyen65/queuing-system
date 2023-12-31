import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Badge, Image, Select, Space, Table, Typography } from "antd";
import "../../assets/css/device/device.css";
import AddDevicev from "../../assets/img/device/ThemThietBiMoi.svg";
import search from "../../assets/img/device/search.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  selectData,
  selectError,
} from "../../feature/device/actionDevice";
import { AppDispatch } from "../../store";

const AltaDevice = () => {
  const data = useSelector(selectData);

  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  const [connectStatus, setConnectStatus] = useState("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [openServiceUsedMap, setOpenServiceUsedMap] = useState<{
    [key: string]: boolean;
  }>({});

  const handleServiceUsed = (record: any) => {
    setOpenServiceUsedMap((prevState) => {
      const newState = { ...prevState };
      Object.keys(newState).forEach((key) => {
        newState[key] = false; // Close all other records
      });
      newState[record.id] = true; // Open the clicked record
      return newState;
    });
  };

  const handleServiceUsedClose = (record: any) => {
    setOpenServiceUsedMap((prevState) => ({
      ...prevState,
      [record.id]: false,
    }));
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const isActiveMatch =
      activeStatus === "Tất cả" || item.statusActive === activeStatus;
    const isConnectMatch =
      connectStatus === "Tất cả" || item.statusConnect === connectStatus;
    const isSearchMatch =
      searchKeyword.trim() === "" ||
      item.idDevice.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.nameDevice.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.addressIp.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.statusActive.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.statusConnect.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.serviceUsed.toLowerCase().includes(searchKeyword.toLowerCase());
    return isActiveMatch && isConnectMatch && isSearchMatch;
  });

  if (error) {
    return <div>Error: {error}</div>;
  }
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "expanded";
  };
  const sortedData = [...filteredData].sort((a, b) =>
    a.idDevice.localeCompare(b.idDevice)
  );
  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "idDevice",
      value: "idDevice",
      key: "idDevice",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "nameDevice",
      value: "nameDevice",
      key: "nameDevice",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "addressIp",
      value: "addressIp",
      key: "addressIp",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "statusActive",
      value: "statusActive",
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
      key: "statusActive",
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "statusConnect",
      value: "statusConnect",
      render: (connectionStatus: string) => (
        <Space>
          {connectionStatus === "Kết nối" ? (
            <Badge status="success"></Badge>
          ) : (
            <Badge status="error"></Badge>
          )}
          <span>{connectionStatus}</span>
        </Space>
      ),
      key: "statusConnect",
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "serviceUsed",
      value: "serviceUsed",
      key: "serviceUsed",
      className: "custom-service-column",
      render: (serviceUsed: string, record: any) => (
        <span>
          {serviceUsed}
          <br />
          <span
            className={`custom-read-more-button ${
              openServiceUsedMap[record.id] ? "visible" : ""
            }`}
            onClick={() => handleServiceUsed(record)}
          >
            {openServiceUsedMap[record.id] ? "Thu gọn" : "Xem thêm"}
          </span>
          {openServiceUsedMap[record.id] && (
            <div className={`service-used-detail visible expanded`}>
              {record.serviceUsed}
              <span
                className="custom-read-more-button"
                onClick={() => handleServiceUsedClose(record)}
              >
                Thu gọn
              </span>
            </div>
          )}
        </span>
      ),
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
            <Typography className="TitleDevice">Thiết bị</Typography>
            <Typography id="ListDevice">Danh sách thiết bị</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <Typography className="fs-4 listDeviceTitle">
            Danh sách thiết bị
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
              <label className="d-block lbSelectConnect">
                Trạng thái kết nối
              </label>
              <Select
                defaultValue="Tất cả"
                style={{
                  width: "100%",
                  margin: "5px 0px 0px 60px",
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
              <label className="d-block lbSearch">Từ khoá</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="IPSearch"
                  style={{
                    margin: "6px 0px 0px 304px",
                  }}
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
              dataSource={sortedData}
              style={{
                width: "74%",
                position: "absolute",
              }}
              pagination={{
                pageSize: 6,
              }}
              rowClassName={getRowClassName}
            ></Table>
            <div
              style={{
                backgroundColor: "rgba(255, 242, 231, 1)",
                padding: "10px 20px",
                width: "7%",
                marginLeft: "981px",
                height: "15vh",
                position: "absolute",
              }}
            >
              <Link to="/addDevice" className="text-decoration-none">
                <Image src={AddDevicev} preview={false} className="ms-1" />
                <Typography className="AddDeviceText">
                  Thêm <br /> thiết bị
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaDevice;
