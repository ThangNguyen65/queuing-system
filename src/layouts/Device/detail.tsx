import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Image, Spin, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link, useParams } from "react-router-dom";
import DetailDevice from "../../assets/img/device/EditDetailDevice.svg";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/device/detailDevice.css";
import {
  fetchData,
  selectData,
  selectError,
  selectLoading,
} from "../../feature/actionDevice";
import { useEffect } from "react";

const AltaDetailDevice = () => {
  const { eventId } = useParams<{ eventId: string }>();
  console.log("in o  day");
  console.log(eventId);
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          margin: "250px 0px 0px 610px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const DeviceData = data.find((item) => item.id === eventId);

  if (!DeviceData) {
    return <div>Device not found</div>;
  }
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
            <Link to="/device" id="ListAddDevice">
              Danh sách thiết bị
            </Link>
            <Typography id="ListAddDevices">Chi tiết thiết bị</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser d-flex">
          <Typography className="fs-4 listDeviceTitle fw-bold">
            Quản lý thiết bị
          </Typography>
          <div className="d-flex">
            <div className="bgWhiteDetailDevice">
              <Typography className="InForAddDeviceTitle">
                Thông tin thiết bị
              </Typography>
              <div className="row ms-2 mt-3">
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Mã thiết bị:
                  </Typography>
                  <Typography className="ms-5">{DeviceData.idDevice}</Typography>
                </div>
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Loại thiết bị:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "67px",
                    }}
                  >
                    {DeviceData.categoryDevice}
                  </Typography>
                </div>
              </div>
              {/*  */}
              <div className="row ms-2 mt-3">
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Tên thiết bị:
                  </Typography>
                  <Typography className="ms-5">
                    {DeviceData.nameDevice}
                  </Typography>
                </div>
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Tên đăng nhập:
                  </Typography>
                  <Typography className="ms-5">{DeviceData.username}</Typography>
                </div>
              </div>
              {/*  */}
              <div className="row ms-2 mt-3">
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Địa chỉ IP:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "60px",
                    }}
                  >
                    {DeviceData.addressIp}
                  </Typography>
                </div>
                <div className="col-6 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Mật khẩu:
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "84px",
                    }}
                  >
                    {DeviceData.password}
                  </Typography>
                </div>
              </div>
              {/*  */}
              <div className="row ms-2 mt-3">
                <div className="col-12 d-flex">
                  <Typography
                    style={{
                      fontWeight: "500",
                    }}
                  >
                    Dịch vụ sử dụng:
                  </Typography>
                  <Typography className="ms-5"></Typography>
                </div>
                <div className="col-12 d-flex">
                  <Typography>{DeviceData.serviceUsed}</Typography>
                  <Typography className="ms-5"></Typography>
                </div>
              </div>
              {/*  */}
            </div>
            {/*  */}
            <div className="mt-3 detailDevice">
              <Link to="" className="text-decoration-none">
                <Image src={DetailDevice} preview={false} className="ms-2" />
                <Typography className="AddDeviceText">
                  Cập nhật thiết bị
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaDetailDevice;
