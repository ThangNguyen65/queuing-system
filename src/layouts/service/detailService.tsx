import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import {
  Badge,
  DatePicker,
  Image,
  Input,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useParams } from "react-router-dom";
import DetailDevice from "../../assets/img/lvNumber/back.svg";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/device/detailDevice.css";
import arrowRight from "../../assets/img/lvNumber/arrow-right.svg";
import { useEffect, useState } from "react";
import { fetchDataService, selectDataSV } from "../../feature/service/service";
import UpdateImage from "../../assets/img/device/EditDetailDevice.svg";
const AltaDetailService = () => {
  const { id } = useParams();
  const dataSV = useSelector(selectDataSV);
  const dispatch: any = useDispatch();
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    dispatch(fetchDataService());
  });
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };
  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const filteredData = dataSV.filter((item: any) => {
    const isActiveMatch =
      activeStatus === "Tất cả" || item.StatusDescribe === activeStatus;
    const isSearchMatch =
      searchKeyword.trim() === "" ||
      item.IdService.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.StatusDescribe.toLowerCase().includes(searchKeyword.toLowerCase());
    return isActiveMatch && isSearchMatch;
  });
  const IdData = dataSV.find((item) => item.id === id);
  const column = [
    {
      title: "Số thứ tự",
      dataIndex: "IdService",
      render: (_text: any, record: any) => (
        <span>{record.IdService + record.suffix}</span>
      ),
      key: "IdService",
    },
    {
      title: "Trạng thái",
      dataIndex: "StatusDescribe",
      render: (StatusDescribe: string) => (
        <Space>
          {StatusDescribe === "Đã hoàn thành" ? (
            <Badge status="success"></Badge>
          ) : StatusDescribe === "Đang thực hiện" ? (
            <Badge status="processing"></Badge>
          ) : (
            <Badge status="error"></Badge>
          )}
          <span>{StatusDescribe}</span>
        </Space>
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
          paddingBottom: "50px",
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
            <Typography className="TitleAddDevice">Dịch vụ</Typography>
            <Link to="/service" id="ListAddDevice">
              Danh sách dịch vụ
            </Link>
            <Typography id="ListAddDevices">Chi tiết</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser d-flex">
          <Typography className="fs-4 listDeviceTitle fw-bold">
            Quản lý dịch vụ
          </Typography>
          <div className="d-flex">
            <div
              style={{
                backgroundColor: "#fff",
                height: "70vh",
                borderRadius: "20px",
                width: "60%",
                margin: "15px 0px 0px 30px",
              }}
            >
              <Typography className="InForAddDeviceTitle">
                Thông tin dịch vụ
              </Typography>
              <div
                className="d-flex"
                style={{
                  margin: "10px 0px 0px 22px",
                }}
              >
                <label style={{ fontWeight: "600" }}>Mã dịch vụ:</label>
                <Typography
                  style={{
                    marginLeft: "23px",
                    marginTop: "2px",
                  }}
                >
                  {IdData?.IdService}
                </Typography>
              </div>
              <div
                className="d-flex"
                style={{
                  margin: "10px 0px 0px 22px",
                }}
              >
                <label style={{ fontWeight: "600" }}>Tên dịch vụ: </label>
                <Typography
                  style={{
                    marginLeft: "20px",
                    marginTop: "2px",
                  }}
                >
                  {IdData?.NameService}
                </Typography>
              </div>
              <div
                className="d-flex"
                style={{
                  margin: "10px 0px 0px 22px",
                }}
              >
                <label style={{ fontWeight: "600" }}>Mô tả:</label>
                <Typography
                  style={{
                    marginLeft: "58px",
                    marginTop: "2px",
                  }}
                >
                  {IdData?.DescribeService}
                </Typography>
              </div>
              <Typography className="InForAddDeviceTitle">
                Quy tắc cấp số
              </Typography>
              <div className="d-flex">
                <span className="mt-2 ms-3 me-2">Tăng tự động từ:</span>
                <Input
                  style={{
                    width: "18%",
                    marginTop: "6px",
                  }}
                  value={IdData?.suffix}
                />
                <span className="mt-2 ms-2 me-2">đến</span>
                <Input
                  style={{
                    width: "18%",
                    marginTop: "6px",
                  }}
                  value={IdData?.limit}
                />
              </div>
              <div className="d-flex mt-2">
                <span className="mt-1 ms-3 me-2">Prefix:</span>
                <Input
                  style={{
                    width: "18%",
                    marginLeft: "75px",
                  }}
                />
              </div>
              <div className="d-flex mt-2">
                <span className="mt-1 ms-3 me-2">Surfix:</span>
                <Input
                  style={{
                    width: "18%",
                    marginLeft: "75px",
                  }}
                />
              </div>
              <div className="d-flex">
                <span className="mt-1 ms-3 me-2">Reset mỗi ngày</span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                height: "70vh",
                borderRadius: "20px",
                width: "120%",
                margin: "15px 0px 0px 30px",
              }}
            >
              <div className="d-flex">
                <div
                  style={{
                    width: "40%",
                  }}
                >
                  <label
                    className="d-block"
                    style={{
                      margin: "20px 0px 0px 27px",
                      fontWeight: "700",
                      fontSize: "13px",
                    }}
                  >
                    Trạng thái
                  </label>
                  <Select
                    defaultValue="Tất cả"
                    style={{
                      width: "60%",
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
                        label: "Đã hoàn thành",
                        value: "Đã hoàn thành",
                      },
                      {
                        label: "Đang thực hiện",
                        value: "Đang thực hiện",
                      },
                      {
                        label: "Vắng",
                        value: "Vắng",
                      },
                    ]}
                    onChange={setActiveStatus}
                  />
                </div>
                <div
                  style={{
                    marginLeft: "-40px",
                    display: "felx",
                  }}
                >
                  <label
                    className="d-block"
                    style={{
                      margin: "20px 0px 0px 0px",
                      fontWeight: "700",
                      fontSize: "13px",
                    }}
                  >
                    Chọn thời gian
                  </label>
                  <div>
                    <DatePicker
                      style={{
                        width: "45%",
                        margin: "5px 0px 0px 0px",
                        border: "1.5px solid #D4D4D7",
                        borderRadius: "8px",
                      }}
                    />
                    <Image src={arrowRight} preview={false} />
                    <DatePicker
                      style={{
                        width: "45%",
                        margin: "5px 0px 0px  0px",
                        border: "1.5px solid #D4D4D7",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="d-block"
                    style={{
                      margin: "20px 0px 0px 0px",
                      fontWeight: "700",
                      fontSize: "13px",
                    }}
                  >
                    Từ khóa
                  </label>
                  <Input
                    style={{
                      width: "90%",
                      margin: "5px 0px 0px 0px",
                      border: "1.5px solid #D4D4D7",
                      borderRadius: "8px",
                    }}
                    placeholder="Nhập từ khóa"
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <Table
                rowClassName={getRowClassName}
                columns={column}
                style={{
                  width: "93%",
                  marginLeft: "30px",
                  marginTop: "10px",
                }}
                pagination={{
                  pageSize: 3,
                }}
                dataSource={filteredData}
              />
            </div>
            <div
              style={{
                width: "20%",
              }}
            >
              <div
                className="mt-3"
                style={{
                  backgroundColor: "rgba(255, 242, 231, 1)",
                  padding: "10px 20px",
                  width: "100%",
                  marginLeft: "10px",
                  height: "15vh",
                  borderBottom: "1px solid rgba(255, 227, 205, 1)",
                }}
              >
                <Link to="/service" className="text-decoration-none">
                  <Image src={UpdateImage} preview={false} className="ms-2" />
                  <Typography className="AddDeviceText">
                    Cập nhật danh sách
                  </Typography>
                </Link>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255, 242, 231, 1)",
                  padding: "10px 20px",
                  width: "100%",
                  marginLeft: "10px",
                  height: "12vh",
                }}
              >
                <Link to="/service" className="text-decoration-none">
                  <Image src={DetailDevice} preview={false} className="ms-2" />
                  <Typography className="AddDeviceText">Quay lại</Typography>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaDetailService;
