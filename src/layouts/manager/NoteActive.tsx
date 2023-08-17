import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import { Image, Table, Typography, DatePicker } from "antd";
import "../../assets/css/device/device.css";
import AddDevicev from "../../assets/img/device/ThemThietBiMoi.svg";
import search from "../../assets/img/device/search.svg";
import { Link } from "react-router-dom";
import "../../assets/css/manager/managerRole.css";
import arrowRight from "../../assets/img/lvNumber/arrow-right.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  DataActivity,
  selectDataActivity,
} from "../../feature/manager/note/note";
import { AppDispatch } from "../../store";

const AltaNoteActive = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const note = useSelector(selectDataActivity);

  useEffect(() => {
    dispatch(DataActivity());
  }, [dispatch]);

  const getRowClassName = (_record: any, index: number) => {
    return index % 2 !== 0 ? "bg-pink" : "";
  };
  const filteredNote = note.filter(
    (item) =>
      item.userName.includes(searchKeyword) ||
      item.action.includes(searchKeyword) ||
      item.deviceAddress.includes(searchKeyword) ||
      item.levelNumberGrantTime.includes(searchKeyword)
  );

  const column = [
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      value: "userName",
      key: "userName",
    },
    {
      title: "Thời gian tác động",
      dataIndex: "levelNumberGrantTime",
      value: "levelNumberGrantTime",
      key: "levelNumberGrantTime",
    },
    {
      title: "IP thực hiện",
      dataIndex: "deviceAddress",
      value: "deviceAddress",
      key: "deviceAddress",
    },
    {
      title: "Thao tác thực hiện",
      dataIndex: "action",
      value: "action",
      key: "action",
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
            <Typography className="TitleDevice">Cài đặt hệ thống</Typography>
            <Typography id="ListDevice">Nhật ký hệ thống</Typography>
          </div>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <div className="d-flex">
            <div>
              <label className="d-block lbSelectConnectDate">
                Chọn thời gian
              </label>
              <div>
                <DatePicker
                  style={{
                    width: "40%",
                    margin: "5px 0px 0px 25px",
                    border: "1.5px solid #D4D4D7",
                    borderRadius: "8px",
                  }}
                />
                <Image src={arrowRight} preview={false} />
                <DatePicker
                  style={{
                    width: "40%",
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
                  margin: "10px 0px 0px 400px",
                  fontFamily: "Nunito",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "24px",
                }}
              >
                Từ khoá
              </label>
              <div className="d-flex">
                <input
                  type="text"
                  className="IPSearchManagerUser"
                  placeholder="Nhập từ khóa"
                  style={{
                    margin: "6px 0px 0px 400px",
                    width: "230px",
                    borderRadius: "8px",
                    border: "1.5px solid #d4d4d7",
                    outline: "none",
                    padding: "5px 10px",
                  }}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="btnSearchDevice">
                  <Image src={search} preview={false} />
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <Table
                columns={column}
                dataSource={filteredNote}
                className="ms-4 mt-2"
                style={{
                  width: "74%",
                  position: "absolute",
                }}
                pagination={{
                  pageSize: 9,
                }}
                rowClassName={getRowClassName}
              ></Table>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 242, 231, 1)",
                padding: "10px 23px",
                width: "7%",
                marginLeft: "1100px",
                height: "15vh",
              }}
            >
              <Link to="/addUserManager" className="text-decoration-none">
                <Image src={AddDevicev} preview={false} className="ms-1" />
                <Typography className="AddDeviceText">
                  Thêm tài khoản
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AltaNoteActive;
