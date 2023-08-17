import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Badge, Image, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useParams } from "react-router-dom";
import DetailDevice from "../../assets/img/lvNumber/back.svg";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/device/detailDevice.css";

import { useEffect } from "react";
import {
  FetchDataLevelNumber,
  selectDataLvNB,
} from "../../feature/levelNo/levelNumber";

const AltaDetailLvNumber = () => {
  const { LvNumId } = useParams();
  const dataLvNB = useSelector(selectDataLvNB);
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(FetchDataLevelNumber());
  });
  const LvNumIdData = dataLvNB.find((item) => item.id === LvNumId);

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
            <Typography className="TitleAddDevice">Thiết bị</Typography>
            <Link to="/levelNumber" id="ListAddDevice">
              Danh sách cấp số
            </Link>
            <Typography id="ListAddDevices">Chi tiết</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser d-flex">
          <Typography className="fs-4 listDeviceTitle fw-bold">
            Quản lý cấp số
          </Typography>
          <div className="d-flex">
            <div className="bgWhiteDetailDevice">
              <Typography className="InForAddDeviceTitle">
                Thông tin cấp số
              </Typography>
              <div className="row ms-2 mt-3">
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Họ và tên:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "61px",
                    }}
                  >
                    {LvNumIdData?.NameCustomer}
                  </Typography>
                </div>
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Nguồn cấp:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "57px",
                    }}
                  >
                    {LvNumIdData?.PowerSupply}
                  </Typography>
                </div>
              </div>
              <div className="row ms-2 mt-3">
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Tên dịch vụ:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "50px",
                    }}
                  >
                    {LvNumIdData?.NameServices}
                  </Typography>
                </div>
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Trạng thái:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "65px",
                    }}
                  >
                    {LvNumIdData?.Status === "Đã sử dụng" ? (
                      <Badge status="default" />
                    ) : LvNumIdData?.Status === "Đang chờ" ? (
                      <Badge status="processing" />
                    ) : (
                      <Badge status="error" />
                    )}
                    <span className="ms-2">{LvNumIdData?.Status}</span>
                  </Typography>
                </div>
              </div>
              <div className="row ms-2 mt-3">
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Số thứ tự:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "62px",
                    }}
                  >
                    {LvNumIdData?.IdLevelNum}
                  </Typography>
                </div>
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Số điện thoại:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "44px",
                    }}
                  >
                    {LvNumIdData?.PhoneLvNum}
                  </Typography>
                </div>
              </div>
              <div className="row ms-2 mt-3">
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Thời gian cấp:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "35px",
                    }}
                  >
                    {LvNumIdData?.GrantTime}
                  </Typography>
                </div>
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Địa chỉ Email:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "44px",
                    }}
                  >
                    {LvNumIdData?.EmailLvNum}
                  </Typography>
                </div>
              </div>

              <div className="row ms-2 mt-3">
                <div className="col-12 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Hạn sử dụng:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "39px",
                    }}
                  >
                    {LvNumIdData?.Expiry}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="mt-3 detailDevice">
              <Link to="/levelNumber" className="text-decoration-none">
                <Image src={DetailDevice} preview={false} className="ms-2" />
                <Typography className="AddDeviceText">Quay lại</Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaDetailLvNumber;
