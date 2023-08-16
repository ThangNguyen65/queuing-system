import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import {
  Badge,
  Image,
  Select,
  Space,
  Table,
  Typography,
  Spin,
  DatePicker,
} from "antd";
import "../../assets/css/device/device.css";
import AddDevicev from "../../assets/img/device/ThemThietBiMoi.svg";
import search from "../../assets/img/device/search.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  fetchDataService,
  selectDataSV,
  selectError,
  selectLoading,
} from "../../feature/service/service";
import "../../assets/css/service/service.css";
const { RangePicker } = DatePicker;
const AltaService = () => {
  const dataSv = useSelector(selectDataSV);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch: AppDispatch = useDispatch();
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch(fetchDataService());
  }, [dispatch]);
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };
  const filteredData = dataSv.filter((item: any) => {
    const isActiveMatch =
      activeStatus === "Tất cả" || item.StatusActive === activeStatus;
    const isSearchMatch =
      searchKeyword.trim() === "" ||
      item.IdService.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.NameService.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.DescribeService.toLowerCase().includes(
        searchKeyword.toLowerCase()
      ) ||
      item.StatusActive.toLowerCase().includes(searchKeyword.toLowerCase());
    return isActiveMatch && isSearchMatch;
  });
  const sortedDataService = [...filteredData].sort((a, b) =>
    a.suffix.localeCompare(b.suffix)
  );

  const column = [
    {
      title: "Mã dịch vụ",
      dataIndex: "IdService",
      render: (_text: any, record: any) => (
        <span>{record.IdService + record.suffix}</span>
      ),
      key: "IdService",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "NameService",
      value: "NameService",
      key: "NameService",
    },
    {
      title: "Mô tả",
      dataIndex: "DescribeService",
      value: "DescribeService",
      key: "DescribeService",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "StatusActive",
      value: "StatusActive",
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
      key: "StatusActive",
    },
    {
      title: " ",
      value: "",
      render: (record: any) => (
        <Link
          to={`/DetailService/${record.id}`}
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
          to={`/editService/${record.id}`}
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
            <Typography className="TitleDevice">Dịch vụ</Typography>
            <Typography id="ListDevice">Danh sách dịch vụ</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <Typography className="fs-4 listDeviceTitle">
            Quản lý dịch vụ
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
              <label className="d-block lbSelectConnect">Chọn thời gian</label>
              <RangePicker
                style={{
                  width: "100%",
                  margin: "5px 0px 0px 60px",
                  border: "1.5px solid #D4D4D7",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div>
              <label className="d-block lbSearchService">Từ khoá</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="IPServiceSearch"
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
                dataSource={sortedDataService}
                columns={column}
                className="ms-4 mt-2"
                style={{
                  width: "74%",
                  position: "absolute",
                }}
                pagination={{
                  pageSize: 6,
                }}
                rowClassName={getRowClassName}
              ></Table>
            </div>
            <div
              style={{
                padding: "10px 26px 10px 25px",
                width: "8%",
                marginLeft: "981px",
                marginTop: "4px",
                position: "absolute",
                height: "16vh",
                backgroundColor: "rgba(255,242,231,1)",
              }}
            >
              <Link to="/addService" className="text-decoration-none">
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

export default AltaService;
