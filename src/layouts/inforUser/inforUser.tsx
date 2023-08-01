import React from "react";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import "../../assets/css/InforUser/InforUser.css";
import Em from "../../assets/img/nav/ImageEmIu.jpg";
import Camera from "../../assets/img/infor/CameraInforUser.svg";
import { Avatar, Image, Input, Typography } from "antd";
function AltaInForUser() {
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
          <Typography className="TitleInfoUser">Thông tin cá nhân</Typography>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <div id="bgInFor">
            <div className="row">
              <div className="col-4">
                <div>
                  <Avatar src={Em} size={230} className="avtInForUser" />
                  <Image src={Camera} width={"15%"} preview={false} className="cameraInFor"/>
                </div>
                {/* <Input type="file" /> */}
                <Typography className="TextInForUser">
                  Huỳnh Ngọc Ngân
                </Typography>
              </div>
              <div
                className="col-lg-4"
                style={{
                  marginLeft: "-30px",
                }}
              >
                <div
                  style={{
                    marginTop: "40px",
                  }}
                >
                  <label>Tên người dùng</label>
                  <Input
                    className="mt-2 py-2"
                    placeholder="Nguyễn Hữu Thắng"
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <label>Số điện thoại</label>
                  <Input
                    className="mt-2 py-2"
                    placeholder="0942708959"
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <label>Email:</label>
                  <Input
                    className="mt-2 py-2"
                    placeholder="thang123075@gmail.com"
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  style={{
                    marginTop: "40px",
                  }}
                >
                  <label>Tên đăng nhập</label>
                  <Input
                    className="mt-2 py-2"
                    placeholder="thang123075"
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <label>Mật khẩu</label>
                  <Input
                    className="mt-2 py-2"
                    placeholder="123456789"
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <label>Vai trò:</label>
                  <Input className="mt-2 py-2" placeholder="Kế toán" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AltaInForUser;
