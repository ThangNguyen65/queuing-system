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
  Select,
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
import { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";

const AltaReport = () => {
  const data = useSelector(selectDataLvNB);
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const dispatch = useDispatch();
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  const [activePowerSupply, setActivePowerSupply] = useState("Tất cả");
  const [activeId, setActiveId] = useState("Tất cả");
  useEffect(() => {
    dispatch(FetchDataLevelNumber() as any);
  }, [dispatch]);
  // Stt

  // excel
  const handleExportExcel = () => {
    const dataToExport = data.map((item) => ({
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
  const filteredData = data.filter((item: any) => {
    const isActiveMatch =
      activeStatus === "Tất cả" || item.Status === activeStatus;
    const isPowerSupply =
      activePowerSupply === "Tất cả" || item.PowerSupply === activePowerSupply;
    const isId = activeId === "Tất cả" || item.IdLevelNum === activeId;
    return isActiveMatch && isPowerSupply && isId;
  });
  const options = data.map((service: any) => ({
    label: service.IdLevelNum,
    value: service.IdLevelNum,
  }));
  const sortedData = [...filteredData].sort((a, b) =>
    a.IdLevelNum.localeCompare(b.IdLevelNum)
  );
  const column = [
    {
      title: (
        <div className="justify-content-between d-flex">
          <div>
            <span>Số thứ tự</span>
          </div>
          <div>
            <Image
              src={sort}
              preview={false}
              style={{ cursor: "pointer", position: "relative" }}
            />
            <Select
              style={{
                position: "absolute",
                opacity: "0",
                marginLeft: "-35px",
                marginTop: "-5px",
              }}
              options={[
                {
                  label: "Tất cả",
                  value: "Tất cả",
                },
                ...options,
              ]}
              onChange={setActiveId}
            />
          </div>
        </div>
      ),
      dataIndex: "IdLevelNum",
      value: "IdLevelNum",
      key: "IdLevelNum",
    },
    {
      title: (
        <div className="justify-content-between d-flex">
          <div>
            <span>Tên dịch vụ</span>
          </div>
          <div>
            <Image src={sort} preview={false} />
          </div>
        </div>
      ),
      dataIndex: "NameServices",
      value: "NameServices",
      key: "NameServices",
    },
    {
      title: (
        <div className="justify-content-between d-flex">
          <div>
            <span>Thời gian cấp</span>
          </div>
          <div>
            <Image src={sort} preview={false} />
          </div>
        </div>
      ),
      dataIndex: "GrantTime",
      value: "GrantTime",
      key: "GrantTime",
    },
    {
      title: (
        <div className="justify-content-between d-flex">
          <div>
            <span>Tình trạng</span>
          </div>
          <div>
            <Image
              src={sort}
              preview={false}
              style={{ cursor: "pointer", position: "relative" }}
            />
            <Select
              style={{
                position: "absolute",
                opacity: "0",
                marginLeft: "-35px",
                marginTop: "-5px",
              }}
              options={[
                {
                  label: "Tất cả",
                  value: "Tất cả",
                },
                {
                  label: "Đã sử dụng",
                  value: "Đã sử dụng",
                },
                {
                  label: "Đang chờ",
                  value: "Đang chờ",
                },
                {
                  label: "Bỏ qua",
                  value: "Bỏ qua",
                },
              ]}
              onChange={setActiveStatus}
            />
          </div>
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
          <div>
            <span>Nguồn cấp</span>
          </div>
          <div>
            <Image
              src={sort}
              preview={false}
              style={{ cursor: "pointer", position: "relative" }}
            />
            <Select
              style={{
                position: "absolute",
                opacity: "0",
                marginLeft: "-35px",
                marginTop: "-5px",
              }}
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
              onChange={setActivePowerSupply}
            />
          </div>
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
                dataSource={sortedData}
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
