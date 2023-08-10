import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Image, Table, Typography, Space, Badge, DatePicker } from "antd";
import "../../assets/css/device/device.css";
import { Link } from "react-router-dom";
import arrowRight from "../../assets/img/lvNumber/arrow-right.svg";
import downloand from "../../assets/img/lvNumber/download.svg";
import "../../assets/css/manager/managerRole.css";
import {
  FetchDataLevelNumber,
  selectDataLvNB,
} from "../../feature/levelNo/levelNumber";
import { useDispatch, useSelector } from "react-redux";
import sort from "../../assets/img/report/arrow-right.jpg";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { utils, writeFile } from "xlsx";

const AltaReport = () => {
  const data = useSelector(selectDataLvNB);
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchDataLevelNumber() as any);
  }, [dispatch]);
  const [selectedOption, setSelectedOption] = useState("");
  const [tableData, setTableData] = useState(data);
  const [sortOption, setSortOption] = useState("default");
  const [reportStt, setReportStt] = useState(false);

  const handleReportStt = (option: string) => {
    setReportStt(true);
    setSelectedOption(option);
    setSortOption(option);
    const filteredData =
      option === "Tất cả"
        ? data
        : data.filter((item) => item.IdLevelNum === option);
    setTableData(filteredData);
  };

  const handleExportExcel = () => {
    const dataToExport = tableData.map((item) => ({
      "Số thứ tự": item.IdLevelNum,
      "Tên dịch vụ": item.NameServices,
      "Thời gian cấp": item.GrantTime,
      "Tình trạng": item.Status,
      "Nguồn cấp": item.PowerSupply,
    }));

    const ws = utils.json_to_sheet(dataToExport);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");

    writeFile(wb, "data.xlsx", { bookType: "xlsx", type: "buffer" });
  };

  const handleCloseReportStt = () => {
    setReportStt(false);
  };

  const options = data.map((service: any) => ({
    label: service.IdLevelNum,
    value: service.IdLevelNum,
  }));

  const ReportSTTRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ReportSTTRef.current &&
        !ReportSTTRef.current.contains(event.target as Node)
      ) {
        handleCloseReportStt();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const column = [
    {
      title: (
        <>
          <div
            className="justify-content-between d-flex position-relative"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation();
              handleReportStt("Tất cả");
            }}
          >
            <Typography style={{ color: "#fff" }}>Số thứ tự</Typography>
            <Image
              src={sort}
              alt="Sort"
              className="sort-icon"
              preview={false}
            />
          </div>
          {reportStt && (
            <div
              ref={ReportSTTRef}
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                boxShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)",
                width: "149px",
                overflow: "auto",
                marginLeft: "-10px",
                marginTop: "10px",
                height: "auto",
                zIndex: "999",
                borderRadius: "10px",
              }}
            >
              {options.map((option1, index) => (
                <Typography
                  key={index}
                  className="textReport"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleReportStt(option1.label);
                  }}
                >
                  {option1.label}
                </Typography>
              ))}
            </div>
          )}
        </>
      ),
      dataIndex: "IdLevelNum",
      value: "IdLevelNum",
      key: "IdLevelNum",
    },
    {
      title: (
        <div className="justify-content-between d-flex">
          <Typography style={{ color: "#fff" }}>Tên dịch vụ</Typography>
          <Image src={sort} alt="Sort" className="sort-icon" preview={false} />
        </div>
      ),
      dataIndex: "NameServices",
      value: "NameServices",
      key: "NameServices",
    },
    {
      title: (
        <div className="justify-content-between d-flex">
          <Typography style={{ color: "#fff" }}>Thời gian cấp</Typography>
          <Image src={sort} alt="Sort" className="sort-icon" preview={false} />
        </div>
      ),
      dataIndex: "GrantTime",
      value: "GrantTime",
      key: "GrantTime",
    },
    {
      title: (
        <div className="justify-content-between d-flex">
          <Typography style={{ color: "#fff" }}>Tình trạng</Typography>
          <Image src={sort} alt="Sort" className="sort-icon" preview={false} />
        </div>
      ),
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
      title: (
        <div className="justify-content-between d-flex">
          <Typography style={{ color: "#fff" }}>Nguồn cấp</Typography>
          <Image src={sort} alt="Sort" className="sort-icon" preview={false} />
        </div>
      ),
      dataIndex: "PowerSupply",
      value: "PowerSupply",
      key: "PowerSupply",
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
            <Typography className="TitleDevice">Báo cáo</Typography>
            <Typography id="ListDevice">Lập báo cáo</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <div>
            <label className="d-block lbSelectConnectDate">
              Chọn thời gian
            </label>
            <div>
              <DatePicker
                style={{
                  width: "10%",
                  margin: "5px 0px 0px 25px",
                  border: "1.5px solid #D4D4D7",
                  borderRadius: "8px",
                }}
              />
              <Image src={arrowRight} preview={false} />
              <DatePicker
                style={{
                  width: "10%",
                  margin: "5px 0px 0px  0px",
                  border: "1.5px solid #D4D4D7",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
          <div className="d-flex">
            <div>
              <Table
                columns={column}
                dataSource={tableData}
                className="ms-4 mt-2"
                style={{
                  width: "74%",
                  position: "absolute",
                }}
                pagination={{
                  pageSize: 7,
                }}
                rowClassName={getRowClassName}
              ></Table>
            </div>
            <div
              className="mt-2"
              style={{
                backgroundColor: "rgba(255, 242, 231, 1)",
                padding: "10px 20px",
                width: "7%",
                height: "13vh",
                marginLeft: "983px",
                position: "absolute",
              }}
              onClick={handleExportExcel}
            >
              <Link to="" className="text-decoration-none">
                <Image src={downloand} preview={false} className="ms-1" />
                <Typography className="AddDeviceText">Tải về</Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaReport;
