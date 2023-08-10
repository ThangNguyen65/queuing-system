import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Modal, Select, Typography } from "antd";
import "../../assets/css/device/addDevice.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDataService, selectDataSV } from "../../feature/service/service";
import {
  addLevelNumber,
  selectData,
} from "../../feature/levelNo/AddlevelNumber";
import { LevelNumber } from "../../feature/levelNo/levelNumber";
import { selectCurrentUser } from "../../app/selectors";

const AltaAddLevelNumber = () => {
  const dataService = useSelector(selectDataSV);
  const dataLvNB = useSelector(selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataService() as any);
  }, [dispatch]);

  const options = dataService.map((service: any) => ({
    label: service.NameService,
    value: service.IdService,
  }));
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );
  const formatDateExpiry = (date: Date) => {
    const modifiedDate = new Date(date);
    modifiedDate.setHours(date.getHours() + 8);
    const hours = String(modifiedDate.getHours()).padStart(2, "0");
    const minutes = String(modifiedDate.getMinutes()).padStart(2, "0");
    const day = String(modifiedDate.getDate()).padStart(2, "0");
    const month = String(modifiedDate.getMonth() + 1).padStart(2, "0");
    const year = modifiedDate.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };
  const formatDate = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const generateIdLevelNum = () => {
    const lastSequentialNumber =
      dataLvNB.length > 0
        ? Number(dataLvNB[dataLvNB.length - 1].IdLevelNum)
        : 200000;
    const newSequentialNumber = lastSequentialNumber + 1;
    return `${newSequentialNumber}`;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const selectedServiceModal = dataService.find(
    (service) => service.IdService === selectedValue
  );
  const possibleStatusLvNumber = ["Đã sử dụng", "Đang chờ", "Bỏ qua"];
  const getRandomStatusDescribe = () => {
    const randomIndex = Math.floor(
      Math.random() * possibleStatusLvNumber.length
    );
    return possibleStatusLvNumber[randomIndex];
  };
  const newIdLevelNum = generateIdLevelNum();
  const currentUser = useSelector(selectCurrentUser);
  const handlePrintNumber = async () => {
    const selectedService = dataService.find(
      (service) => service.IdService === selectedValue
    );

    if (!selectedService) {
      console.error("Dịch vụ không hợp lệ!");
      return;
    }

    try {
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
      const formattedExpiry = formatDateExpiry(currentDate);

      const newData: LevelNumber = {
        id: "",
        IdLevelNum: generateIdLevelNum(),
        NameCustomer: currentUser?.NameUser || "null",
        NameServices: selectedService.NameService,
        GrantTime: formattedDate,
        Expiry: formattedExpiry,
        Status: getRandomStatusDescribe(),
        PowerSupply: "Kiosk",
      };

      dispatch(addLevelNumber(newData as any) as any);
      setIsModalOpen(false);
      showModal();
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm cấp số mới:", error);
    }
  };
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
            <Typography className="TitleAddDevice">Cấp số</Typography>
            <Link to="/levelNumber" id="ListAddDevice">
              Danh sách cấp số
            </Link>
            <Typography id="ListAddDevices">Cấp số mới</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div
          style={{
            backgroundColor: "rgba(246, 246, 246, 1)",
            height: "100vh",
            width: "130%",
          }}
        >
          <Typography className="fs-4 listDeviceTitle">
            Quản lý cấp số
          </Typography>
          <div
            style={{
              backgroundColor: "#fff",
              height: "72vh",
              borderRadius: "20px",
              width: "73%",
              margin: "15px 0px 0px 30px",
            }}
          >
            <Typography
              className="InForAddDeviceTitle text-uppercase fs-3"
              style={{
                marginLeft: "400px",
              }}
            >
              Cấp số mới
            </Typography>
            <Typography
              style={{
                margin: "30px 0px 0px 390px",
                color: "#535261",
                fontSize: "15px",
              }}
            >
              Dịch vụ khách hàng lựa chọn
            </Typography>
            <Select
              defaultValue="Chọn dịch vụ"
              style={{
                width: "30%",
                margin: "10px 0px 0px 330px",
              }}
              options={options}
              onChange={(value) => setSelectedValue(value)}
            />
            <div
              style={{
                margin: "40px 0px 0px 365px",
              }}
            >
              <button
                style={{
                  border: "1px solid rgba(255, 145, 56, 1)",
                  backgroundColor: "rgba(255, 242, 231, 1)",
                  borderRadius: "8px",
                  padding: "8px 29px",
                  color: "rgba(255, 145, 56, 1)",
                }}
              >
                Hủy bỏ
              </button>
              <button
                style={{
                  border: "none",
                  backgroundColor: "rgba(255, 145, 56, 1)",
                  borderRadius: "8px",
                  padding: "8px 35px",
                  margin: "0px 0px 0px 25px",
                  color: "rgba(255, 255, 255, 1)",
                }}
                onClick={handlePrintNumber}
              >
                In số
              </button>
              <Modal
                title={
                  <span
                    style={{
                      fontSize: "27px",
                      marginLeft: "63px",
                    }}
                  >
                    Số thứ tự được cấp
                  </span>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
              >
                <Typography
                  style={{
                    fontSize: "37px",
                    fontWeight: "800",
                    marginLeft: "110px",
                    color: "rgba(255, 117, 6, 1)",
                  }}
                >
                  {newIdLevelNum}
                </Typography>
                {selectedServiceModal && (
                  <Typography
                    style={{
                      marginTop: "20px",
                      marginLeft: "60px",
                      width: "100%",
                      bottom: "0",
                    }}
                  >
                    DV: {selectedServiceModal.NameService} (tại quầy số 1)
                  </Typography>
                )}
                {/* <Typography
                  style={{
                    marginTop: "20px",
                    marginLeft: "60px",
                    width: "100%",
                    bottom: "0",
                  }}
                >
                  DV:{selectedService.NameService} (tại quầy số 1)
                </Typography> */}
                <div
                  style={{
                    backgroundColor: "rgba(255, 145, 56, 1)",
                    padding: "20px 0px",
                    color: "#fff",
                    borderBottomLeftRadius: "19px",
                    borderBottomRightRadius: "19px",
                    marginTop: "30px",
                  }}
                >
                  <div
                    className="d-flex"
                    style={{
                      marginLeft: "60px",
                      fontSize: "16px",
                    }}
                  >
                    <span>Thời gian cấp:</span>
                    <span className="ms-2">{formatDate(new Date())}</span>
                  </div>
                  <div
                    className="d-flex"
                    style={{
                      marginLeft: "60px",
                      fontSize: "16px",
                    }}
                  >
                    <span>Hạn sử dụng:</span>
                    <span style={{ marginLeft: "11px" }}>
                      {formatDateExpiry(new Date())}
                    </span>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaAddLevelNumber;
