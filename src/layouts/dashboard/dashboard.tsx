import React from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Image, Typography } from "antd";
import "../../assets/css/dashboard/dashboard.css";
import SttDaCap from "../../assets/img/dashboard/SttDaCap.svg";
import SttDaSuDung from "../../assets/img/dashboard/SttDaSuDung.svg";
import SttDangCho from "../../assets/img/dashboard/SttDangCho.svg";
import SttDaBoQua from "../../assets/img/dashboard/SttDaBoQua.svg";
import MuiTenTang from "../../assets/img/dashboard/MuiTenTang.svg";
import MuiTenGiam from "../../assets/img/dashboard/MuiTenGiam.svg";
function AltaDashboard() {
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
          <Typography className="CharTitle">Biểu đồ cấp số</Typography>
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="bgSttDC">
                  <div className="d-flex">
                    <Image src={SttDaCap} preview={false} />
                    <Typography className="ms-2">Số thứ tự đã cấp</Typography>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <Typography className="fs-4">4.221</Typography>
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
                    <Typography className="fs-4">3.721</Typography>
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
              <div className="col-lg-3">
                <div className="bgSttDC">
                  <div className="d-flex">
                    <Image src={SttDangCho} preview={false} />
                    <Typography className="ms-2">Số thứ tự đang chờ</Typography>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <Typography className="fs-4">468</Typography>
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
              <div className="col-lg-3">
                <div className="bgSttDC">
                  <div className="d-flex">
                    <Image src={SttDaBoQua} preview={false} />
                    <Typography className="ms-2">
                      Số thứ tự đã bỏ qua
                    </Typography>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <Typography className="fs-4">32</Typography>
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
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="mt-3">
          <AltaNavbar />
        </div>
      </div>
    </div>
  );
}

export default AltaDashboard;
