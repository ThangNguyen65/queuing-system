import React, { useEffect, useState } from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Badge, Image, Progress, Select, Typography } from "antd";
import "../../assets/css/dashboard/dashboard.css";
import SttDaCap from "../../assets/img/dashboard/SttDaCap.svg";
import SttDaSuDung from "../../assets/img/dashboard/SttDaSuDung.svg";
import SttDangCho from "../../assets/img/dashboard/SttDangCho.svg";
import SttDaBoQua from "../../assets/img/dashboard/SttDaBoQua.svg";
import MuiTenTang from "../../assets/img/dashboard/MuiTenTang.svg";
import MuiTenGiam from "../../assets/img/dashboard/MuiTenGiam.svg";
import { useSelector } from "react-redux";
import { selectDataLvNB } from "../../feature/levelNo/levelNumber";
import iconDevice from "../../assets/img/slide/ThietBi.svg";
import iconService from "../../assets/img/slide/DichVu.svg";
import iconLevelNum from "../../assets/img/slide/CapSo.svg";
import { selectDataSV } from "../../feature/service/service";
import { selectData } from "../../feature/device/actionDevice";
import datePicker from "../../assets/img/dashboard/Date picker.svg";
import { Area } from "@ant-design/plots";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
function AltaDashboard() {
  const navigate = useNavigate();
  const data1 = useSelector(selectData);
  const totalDataDevice = data1.length;
  const totalHoatDongDevice = data1.filter(
    (item) => item.statusActive === "Hoạt động"
  ).length;
  const totalNgungHoatDongDevice = data1.filter(
    (item) => item.statusActive === "Ngưng hoạt động"
  ).length;
  const dataLvNB = useSelector(selectDataLvNB);
  const totalLvNBCap = dataLvNB.length;
  const totalDaSuDung = dataLvNB.filter(
    (item) => item.Status === "Đã sử dụng"
  ).length;
  const totalDaCho = dataLvNB.filter(
    (item) => item.Status === "Đang chờ"
  ).length;
  const totalBoQua = dataLvNB.filter((item) => item.Status === "Bỏ qua").length;
  const dataSv = useSelector(selectDataSV);
  const totalDataSv = dataSv.length;
  const totalHoatDongService = dataSv.filter(
    (item) => item.StatusActive === "Hoạt động"
  ).length;
  const totalNgungHoatDongService = dataSv.filter(
    (item) => item.StatusActive === "Ngưng hoạt động"
  ).length;
  const totalDevices = totalHoatDongDevice + totalNgungHoatDongDevice;
  const hoatDongPercent = Math.floor(
    (totalHoatDongDevice / totalDevices) * 100
  );
  const ngungHoatDongPercent = Math.floor(
    (totalNgungHoatDongDevice / totalDevices) * 100
  );
  const totalService = totalHoatDongService + totalNgungHoatDongService;
  const hoatdongServicePercent = Math.floor(
    (totalHoatDongService / totalService) * 100
  );
  const ngunghoatdongServicePercent = Math.floor(
    (totalNgungHoatDongService / totalService) * 100
  );
  const totalLvNum = totalDaSuDung + totalDaCho + totalBoQua;
  const dasudungPercent = Math.floor((totalDaSuDung / totalLvNum) * 100);
  const dachoPercent = Math.floor((totalDaCho / totalLvNum) * 100);
  const boquaPercent = Math.floor((totalBoQua / totalLvNum) * 100);
  useEffect(() => {
    localStorage.setItem("levelNumber", JSON.stringify(dataLvNB));
  }, [dataLvNB]);
  //

  const calculateTotalGrantTimePerDay = (data: any) => {
    const dailyGrantTimeCountMap = new Map();

    data.forEach((item: any) => {
      const datetimeParts = item.GrantTime.split(" ");
      const dateParts = datetimeParts[1].split("/");

      const date = new Date(
        parseInt(dateParts[2]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[0]),
        parseInt(datetimeParts[0].split(":")[0]),
        parseInt(datetimeParts[0].split(":")[1])
      );

      const formattedDate = format(date, "dd");

      if (dailyGrantTimeCountMap.has(formattedDate)) {
        dailyGrantTimeCountMap.set(
          formattedDate,
          dailyGrantTimeCountMap.get(formattedDate) + 1
        );
      } else {
        dailyGrantTimeCountMap.set(formattedDate, 1);
      }
    });

    const totalGrantTimeChartData = Array.from(
      dailyGrantTimeCountMap,
      ([date, count]) => ({
        GrantTime: date,
        Count: count,
      })
    );

    return totalGrantTimeChartData;
  };

  const totalGrantTimeChartData = calculateTotalGrantTimePerDay(dataLvNB);

  //
  const handleStatusDangCho = () => {
    navigate("/levelNumber/?status=Đang chờ");
  };
  return (
    <div className="row">
      <div className="col-lg-2" style={{ paddingRight: "0px" }}>
        <SlideMenu />
      </div>
      <div
        className="col-lg-7"
        style={{
          paddingLeft: "0px",
          backgroundColor: "rgba(246, 246, 246, 1)",
        }}
      >
        <div className="dbTitle">
          <Typography className="TitleDashboard">Dashboard</Typography>
        </div>
        <div id="bgDashboard">
          <Typography
            style={{
              fontSize: "20px",
              margin: "55px 0px 0px 20px",
              fontWeight: "700",
              color: "#ff7506",
            }}
          >
            Biểu đồ cấp số
          </Typography>
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="bgSttDC">
                  <Link to="/levelNumber" className="text-decoration-none">
                    <div className="d-flex">
                      <Image src={SttDaCap} preview={false} />
                      <Typography className="ms-2">Số thứ tự đã cấp</Typography>
                    </div>
                    <div className="d-flex justify-content-between mt-1">
                      <Typography className="fs-4">{totalLvNBCap}</Typography>
                      <div
                        className="d-flex"
                        style={{
                          background: "rgba(255, 149, 1, 0.15)",
                          borderRadius: "10px",
                          padding: "0px 10px",
                          paddingBottom: "0px",
                          marginTop: "14px",
                        }}
                      >
                        <Image src={MuiTenTang} preview={false} />
                        <Typography style={{ color: "rgba(255, 145, 56, 1)" }}>
                          32,41%
                        </Typography>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="bgSttDC">
                  <div className="d-flex">
                    <Image src={SttDaSuDung} preview={false} />
                    <Typography className="ms-2">
                      Số thứ tự đã sử dụng
                    </Typography>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <Typography className="fs-4">{totalDaSuDung}</Typography>
                    <div
                      className="d-flex"
                      style={{
                        background: "rgba(231, 63, 63, 0.15)",
                        borderRadius: "10px",
                        padding: "0px 10px",
                        paddingBottom: "0px",
                        marginTop: "14px",
                      }}
                    >
                      <Image src={MuiTenGiam} preview={false} />
                      <Typography style={{ color: "rgba(255, 145, 56, 1)" }}>
                        32,41%
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3" onClick={handleStatusDangCho}>
                <div className="bgSttDC">
                  <div className="d-flex">
                    <Image src={SttDangCho} preview={false} />
                    <Typography className="ms-2">Số thứ tự đang chờ</Typography>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <Typography className="fs-4">{totalDaCho}</Typography>
                    <div
                      className="d-flex"
                      style={{
                        background: "rgba(255, 149, 1, 0.15)",
                        borderRadius: "10px",
                        padding: "0px 10px",
                        paddingBottom: "0px",
                        marginTop: "14px",
                      }}
                    >
                      <Image src={MuiTenTang} preview={false} />
                      <Typography style={{ color: "rgba(255, 145, 56, 1)" }}>
                        56,41%
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3" style={{ borderRadius: "20px" }}>
                <div className="bgSttDC">
                  <div className="d-flex">
                    <Image src={SttDaBoQua} preview={false} />
                    <Typography className="ms-2">
                      Số thứ tự đã bỏ qua
                    </Typography>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <Typography className="fs-4">{totalBoQua}</Typography>
                    <div
                      className="d-flex"
                      style={{
                        background: "rgba(231, 63, 63, 0.15)",
                        borderRadius: "10px",
                        padding: "0px 10px",
                        paddingBottom: "0px",
                        marginTop: "14px",
                      }}
                    >
                      <Image src={MuiTenGiam} preview={false} />
                      <Typography style={{ color: "rgba(255, 145, 56, 1)" }}>
                        32,41%
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  margin: "10px 0px 0px 13px",
                  backgroundColor: "#fff",
                  width: "729px",
                  padding: "20px",
                  height: "73vh",
                  borderRadius: "10px",
                }}
              >
                <div className="d-flex justify-content-between mb-4">
                  <div>
                    <Typography
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                      }}
                    >
                      Bảng thống kê theo tháng
                    </Typography>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(169, 169, 176, 1)",
                      }}
                    >
                      Năm 2021
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="me-2">Xem theo</span>
                    <Select
                      defaultValue={"Ngày"}
                      options={[
                        { label: "Ngày", value: "Ngày" },
                        { label: "Tuần", value: "Tuần" },
                        { label: "Tháng", value: "Tháng" },
                      ]}
                    />
                  </div>
                </div>

                <Area
                  data={totalGrantTimeChartData}
                  xField="GrantTime"
                  yField="Count"
                  style={{ height: "50vh" }}
                  yAxis={{
                    nice: true,
                  }}
                  xAxis={{
                    range: [0, 1],
                  }}
                  smooth
                  animation={false}
                />
              </div>
              {/*  */}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3" style={{ paddingLeft: "0px" }}>
        <div className="mt-3">
          <div className="ms-3">
            <AltaNavbar />
          </div>
          <Typography
            style={{
              margin: "45px 0px 0px 10px",
              fontSize: "20px",
              color: "#FF7506",
              fontWeight: "700",
            }}
          >
            Tổng quan
          </Typography>
          <Link to="/device" className="text-decoration-none">
            <div
              className="d-flex"
              style={{
                backgroundColor: "#fff",
                boxShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)",
                padding: "10px 0px 10px 10px",
                margin: "10px 0px 0px 10px",
                width: "94%",
              }}
            >
              <Progress
                type="circle"
                width={55}
                strokeWidth={4}
                percent={hoatDongPercent}
                strokeColor={"rgba(255, 145, 56, 1)"}
                style={{
                  position: "relative",
                }}
              />

              <Progress
                type="circle"
                percent={ngungHoatDongPercent}
                width={45}
                showInfo={false}
                strokeWidth={5}
                strokeColor={"rgba(126, 125, 136, 1)"}
                style={{
                  position: "absolute",
                  marginLeft: "5px",
                  marginTop: "5px",
                }}
              />
              <div
                style={{
                  margin: "4px 0px 0px 4px",
                }}
              >
                <Typography>{totalDataDevice}</Typography>
                <Typography
                  style={{
                    color: "rgba(255, 145, 56, 1)",
                  }}
                >
                  <Image
                    src={iconDevice}
                    preview={false}
                    style={{ width: "70%" }}
                  />
                  <span>Thiết bị</span>
                </Typography>
              </div>
              <div
                style={{
                  margin: "4px 0px 0px 4px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Badge status="warning" className="me-1" />
                  Đang hoạt động
                  <span
                    style={{
                      color: "rgba(255, 145, 56, 1)",
                      fontWeight: "600",
                      marginLeft: "13px",
                    }}
                  >
                    {totalHoatDongDevice}
                  </span>
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Badge status="default" className="me-1" />
                  Ngưng hoạt động
                  <span
                    className="ms-1"
                    style={{
                      color: "rgba(255, 145, 56, 1)",
                      fontWeight: "600",
                    }}
                  >
                    {totalNgungHoatDongDevice}
                  </span>
                </Typography>
              </div>
            </div>
          </Link>

          <Link to="/service" className="text-decoration-none">
            <div
              className="d-flex"
              style={{
                backgroundColor: "#fff",
                boxShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)",
                padding: "10px 0px 10px 10px",
                margin: "10px 0px 0px 10px",
                width: "94%",
              }}
            >
              <Progress
                type="circle"
                width={55}
                strokeWidth={4}
                percent={hoatdongServicePercent}
                strokeColor={"rgba(66, 119, 255, 1)"}
                style={{
                  position: "relative",
                }}
              />

              <Progress
                type="circle"
                percent={ngunghoatdongServicePercent}
                width={45}
                showInfo={false}
                strokeWidth={5}
                strokeColor={"rgba(126, 125, 136, 1)"}
                style={{
                  position: "absolute",
                  marginLeft: "5px",
                  marginTop: "5px",
                }}
              />
              <div
                style={{
                  margin: "4px 0px 0px 4px",
                }}
              >
                <Typography>{totalDataSv}</Typography>
                <Typography
                  style={{
                    color: "rgba(66, 119, 255, 1)",
                    fontSize: "13px",
                  }}
                >
                  <Image
                    src={iconService}
                    preview={false}
                    style={{ width: "70%" }}
                  />
                  Dịch vụ
                </Typography>
              </div>
              <div
                style={{
                  margin: "4px 0px 0px 4px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Badge status="processing" className="me-1" />
                  Đang hoạt động
                  <span
                    style={{
                      color: "rgba(66, 119, 255, 1)",
                      fontWeight: "600",
                      marginLeft: "13px",
                    }}
                  >
                    {totalHoatDongService}
                  </span>
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Badge status="default" className="me-1" />
                  Ngưng hoạt động
                  <span
                    className="ms-1"
                    style={{
                      color: "rgba(66, 119, 255, 1)",
                      fontWeight: "600",
                    }}
                  >
                    {totalNgungHoatDongService}
                  </span>
                </Typography>
              </div>
            </div>
          </Link>
          {/*  */}
          <Link to="/levelNumber" className="text-decoration-none">
            <div
              className="d-flex"
              style={{
                backgroundColor: "#fff",
                boxShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)",
                padding: "10px 0px 10px 10px",
                margin: "10px 0px 0px 10px",
                width: "94%",
              }}
            >
              <Progress
                type="circle"
                width={55}
                strokeWidth={4}
                percent={dasudungPercent}
                strokeColor={"rgba(53, 199, 90, 1)"}
                style={{
                  position: "relative",
                }}
              />

              <Progress
                type="circle"
                percent={dachoPercent}
                width={45}
                showInfo={false}
                strokeWidth={5}
                strokeColor={"rgba(126, 125, 136, 1)"}
                style={{
                  position: "absolute",
                  marginLeft: "5px",
                  marginTop: "5px",
                }}
              />
              <Progress
                type="circle"
                percent={boquaPercent}
                width={35}
                showInfo={false}
                strokeWidth={5}
                strokeColor={"rgba(126, 125, 136, 1)"}
                style={{
                  position: "absolute",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              />
              <div
                style={{
                  margin: "4px 0px 0px 4px",
                }}
              >
                <Typography>{totalLvNBCap}</Typography>
                <Typography
                  style={{
                    color: "rgba(53, 199, 90, 1)",
                    fontSize: "13px",
                  }}
                >
                  <Image
                    src={iconLevelNum}
                    preview={false}
                    style={{ width: "70%" }}
                  />
                  Cấp số
                </Typography>
              </div>
              <div
                style={{
                  margin: "0px 0px 0px 10px",
                }}
              >
                <Typography
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Badge status="success" className="me-1" />
                  Đã sử dụng
                  <span
                    style={{
                      color: "rgba(53, 199, 90, 1)",
                      fontWeight: "600",
                      marginLeft: "38px",
                    }}
                  >
                    {totalDaSuDung}
                  </span>
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Badge status="default" className="me-1" />
                  Đang chờ
                  <span
                    style={{
                      color: "rgba(53, 199, 90, 1)",
                      fontWeight: "600",
                      marginLeft: "48px",
                    }}
                  >
                    {totalDaCho}
                  </span>
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <Badge status="error" className="me-1" />
                  Bỏ qua
                  <span
                    style={{
                      color: "rgba(53, 199, 90, 1)",
                      fontWeight: "600",
                      marginLeft: "62px",
                    }}
                  >
                    {totalBoQua}
                  </span>
                </Typography>
              </div>
            </div>
          </Link>

          {/*  */}

          <Image
            src={datePicker}
            preview={false}
            width={"102%"}
            className="dtPkDashboardImage"
          />
        </div>
      </div>
    </div>
  );
}

export default AltaDashboard;
