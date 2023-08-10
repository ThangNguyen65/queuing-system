import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Image, Table, Typography, Space, Badge, DatePicker } from "antd";
import "../../assets/css/device/device.css";
import { Link } from "react-router-dom";
import arrowRight from "../../assets/img/lvNumber/arrow-right.svg";
import downloand from "../../assets/img/lvNumber/download.svg";
import "../../assets/css/manager/managerRole.css";
import { selectDataLvNB } from "../../feature/levelNo/levelNumber";
import { useSelector } from "react-redux";

const AltaReport = () => {
  const data = useSelector(selectDataLvNB);
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };

  const column = [
    {
      title: "Số thứ tự",
      dataIndex: "IdLevelNum",
      value: "IdLevelNum",
      key: "IdLevelNum",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
      ],
    },
    {
      title: "Tên dịch vụ",
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
      title: "Tình trạng",
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
                dataSource={data}
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
