import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import {
  Image,
  Table,
  Typography,
  Space,
  Badge,
  DatePicker,
  Checkbox,
} from "antd";
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ReportSTTRef.current &&
        !ReportSTTRef.current.contains(event.target as Node)
      ) {
        handleCloseReportStt();
        handleNameServiceClose();
        handleGrantTimeClose();
        handleStatusClose();
        handlePowerSupplyClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    dispatch(FetchDataLevelNumber() as any);
  }, [dispatch]);
  // Stt

  const [tableData, setTableData] = useState(data);

  const [sortOption, setSortOption] = useState("default");
  const [selectedOption, setSelectedOption] = useState("");
  const [reportStt, setReportStt] = useState(false);

  const handleReportStt = (option: string) => {
    setReportStt(!reportStt);
    setGrantTime(false);
    setSelectedOption(option);
    setSortOption(option);
    const filteredData =
      option === "Tất cả"
        ? data
        : data.filter((item) => item.IdLevelNum === option);
    setTableData(filteredData);
  };
  const handleCloseReportStt = () => {
    setReportStt(false);
  };
  // name
  const [nameService, setNameService] = useState(false);
  const handleNameService = () => {
    setNameService(true);
  };
  const handleNameServiceClose = () => {
    setNameService(false);
  };
  // grantTime
  const [grantTime, setGrantTime] = useState(false);
  const [sortOptionGrantTime, setSortOptionGrantTime] = useState("default");
  const [selectedOptionGrantTime, setSelectedOptionGrantTime] = useState("");
  const handleGrantTime = (optionGrantTime: string) => {
    setGrantTime(true);
    setSelectedOptionGrantTime(optionGrantTime);
    setSortOptionGrantTime(optionGrantTime);
    const filteredDataGrantTime =
      optionGrantTime === "Tất cả"
        ? data
        : data.filter((item) => item.GrantTime === optionGrantTime);
    setTableData(filteredDataGrantTime);
  };
  const handleGrantTimeClose = () => {
    setReportStt(false);
    setGrantTime(!grantTime);
  };
  // status
  const [status, setStatus] = useState(false);
  const handleStatus = () => {
    setStatus(true);
  };
  const handleStatusClose = () => {
    setStatus(false);
  };
  // powerSupply
  const [powerSupply, setPowerSupply] = useState(false);

  const handlePowerSupply = () => {
    setPowerSupply(true);
  };
  const handlePowerSupplyClose = () => {
    setPowerSupply(false);
  };
  // excel
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

  const options = data.map((service: any) => ({
    label: service.IdLevelNum,
    value: service.IdLevelNum,
  }));
  const optionNameService = data.map((service: any) => ({
    label: service.NameServices,
    value: service.NameServices,
  }));
  const optionGrantTime = data.map((service: any) => ({
    label: service.GrantTime,
    value: service.GrantTime,
  }));

  const ReportSTTRef = useRef<HTMLDivElement | null>(null);

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
              setReportStt(!reportStt);
              setGrantTime(false);
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
                height: "28vh",
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
        <>
          <div
            className="justify-content-between d-flex position-relative"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation();
              handleNameService();
            }}
          >
            <Typography style={{ color: "#fff" }}>Tên dịch vụ</Typography>
            <Image
              src={sort}
              alt="Sort"
              className="sort-icon"
              preview={false}
            />
          </div>
          {nameService && (
            <div
              ref={ReportSTTRef}
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                boxShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)",
                width: "227px",
                overflow: "auto",
                marginLeft: "-10px",
                marginTop: "10px",
                height: "28vh",
                zIndex: "999",
                borderRadius: "10px",
              }}
            >
              {optionNameService.map((optionNameServices, index) => (
                <div
                  className="d-flex justify-content-between"
                  style={{ padding: "10px 15px" }}
                >
                  <Typography> {optionNameServices.label}</Typography>
                  <Checkbox />
                </div>
              ))}
            </div>
          )}
        </>
      ),
      dataIndex: "NameServices",
      value: "NameServices",
      key: "NameServices",
    },
    {
      title: (
        <>
          <div
            className="justify-content-between d-flex position-relative"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation();
              handleGrantTime("Tất cả");
              setGrantTime(!grantTime);
              setReportStt(false);
            }}
          >
            <Typography style={{ color: "#fff" }}>Thời gian cấp</Typography>
            <Image
              src={sort}
              alt="Sort"
              className="sort-icon"
              preview={false}
            />
          </div>
          {grantTime && (
            <div
              ref={ReportSTTRef}
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                boxShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)",
                width: "211px",
                overflow: "auto",
                marginLeft: "-10px",
                marginTop: "10px",
                height: "28vh",
                zIndex: "999",
                borderRadius: "10px",
              }}
            >
              {optionGrantTime.map((optionGrantTimes, index) => (
                <Typography
                  key={index}
                  className="textReport"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleReportStt(optionGrantTimes.label);
                  }}
                >
                  {optionGrantTimes.label}
                </Typography>
              ))}
            </div>
          )}
        </>
      ),
      dataIndex: "GrantTime",
      value: "GrantTime",
      key: "GrantTime",
    },
    {
      title: (
        <>
          <div
            className="justify-content-between d-flex position-relative"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation();
              handleStatus();
            }}
          >
            <Typography style={{ color: "#fff" }}>Tình trạng</Typography>
            <Image
              src={sort}
              alt="Sort"
              className="sort-icon"
              preview={false}
            />
          </div>
          {status && (
            <div
              ref={ReportSTTRef}
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                boxShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)",
                width: "178px",
                overflow: "auto",
                marginLeft: "-10px",
                marginTop: "10px",
                height: "28vh",
                zIndex: "999",
                borderRadius: "10px",
              }}
            >
              <Typography className="textReport"></Typography>
            </div>
          )}
        </>
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
        <>
          <div
            className="justify-content-between d-flex position-relative"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation();
              handlePowerSupply();
            }}
          >
            <Typography style={{ color: "#fff" }}>Nguồn cấp</Typography>
            <Image
              src={sort}
              alt="Sort"
              className="sort-icon"
              preview={false}
            />
          </div>
          {powerSupply && (
            <div
              ref={ReportSTTRef}
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                boxShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)",
                width: "184px",
                overflow: "auto",
                marginLeft: "-10px",
                marginTop: "10px",
                height: "28vh",
                zIndex: "999",
                borderRadius: "10px",
              }}
            >
              <Typography className="textReport"></Typography>
            </div>
          )}
        </>
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
                  pageSize: 10,
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
