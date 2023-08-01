import { Image, Typography } from "antd";
import React from "react";
import Logo from "../../assets/img/login/Logo alta.svg";
import ImageDashBoard from "../../assets/img/slide/Dashboard.svg";
import ImageDevice from "../../assets/img/slide/ThietBi.svg";
import ImageService from "../../assets/img/slide/DichVu.svg";
import ImageLevelNo from "../../assets/img/slide/CapSo.svg";
import ImageReport from "../../assets/img/slide/BaoCao.svg";
import ImageSetting from "../../assets/img/slide/CaiDatHeThong.svg";
import IconArrowRight from "../../assets/img/slide/iconArrowrRight.svg";
import ThreeSetting from "../../assets/img/slide/ThreeChamSetting.svg";
import "../../assets/css/slide/slide.css";
import { Link, NavLink } from "react-router-dom";
function SlideMenu() {
  return (
    <div>
      <Image src={Logo} preview={false} width={"40%"} className="ImageSlide" />
      <NavLink
        to="/dashboard"
        className="d-flex mt-5 text-decoration-none DashboardNavLink"
      >
        <Image
          src={ImageDashBoard}
          preview={false}
          className="ImageDashboard"
        />
        <Typography className="TextSlideDashboard">Dashboard</Typography>
      </NavLink>
      <NavLink
        to="/device"
        className="d-flex text-decoration-none DeviceNavLink"
      >
        <Image src={ImageDevice} preview={false} className="ImageDashboard" />
        <Typography className="TextSlideDashboard">Thiết bị</Typography>
      </NavLink>
      <NavLink to={""} className="d-flex text-decoration-none ServiceNavLink">
        <Image src={ImageService} preview={false} className="ImageDashboard" />
        <Typography className="TextSlideDashboard">Dịch vụ</Typography>
      </NavLink>
      <NavLink to={""} className="d-flex text-decoration-none LevelNoNavLink">
        <Image src={ImageLevelNo} preview={false} className="ImageDashboard" />
        <Typography className="TextSlideDashboard">Cấp số</Typography>
      </NavLink>
      <NavLink to={""} className="d-flex text-decoration-none ReportNavLink">
        <Image src={ImageReport} preview={false} className="ImageDashboard" />
        <Typography className="TextSlideDashboard">Báo cáo</Typography>
      </NavLink>
      <NavLink to={""} className="d-flex text-decoration-none SettingNavLink">
        <Image src={ImageSetting} preview={false} className="ImageDashboard" />
        <Typography className="TextSlideDashboard">Cài đặt hệ thống</Typography>
        <Image
          src={ThreeSetting}
          preview={false}
          style={{ marginLeft: "30px" }}
          width={"7%"}
        />
        <div className="DropdownSetting">
          <Typography className="DropdownText">Quản lý vai trò</Typography>
          <Typography className="DropdownTextUserName">
            Quản lý tài khoản
          </Typography>
          <Typography className="DropdownTextUser">
            Nhật ký người dùng
          </Typography>
        </div>
      </NavLink>
      <div>
        <Link to="/" className="btnSlide">
          <Image
            src={IconArrowRight}
            className="ImageBtnSlide"
            preview={false}
          />
          <Typography className="TextBtnSlide">Đăng xuất</Typography>
        </Link>
      </div>
    </div>
  );
}

export default SlideMenu;
