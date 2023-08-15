import { Avatar, Image, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import NavImage from "../../assets/img/nav/ImageEmIu.jpg";
import "../../assets/css/nav/nav.css";
import Nofication from "../../assets/img/nav/notification.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectNameUser } from "../../app/selectorsNavbar";
import { loginSuccess } from "../../feature/auth/login";
import { selectDataLvNB } from "../../feature/levelNo/levelNumber";
function AltaNavbar() {
  const nameUser = useSelector(selectNameUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const persistedCurrentUser = localStorage.getItem("currentUser");
    if (persistedCurrentUser) {
      dispatch(loginSuccess(JSON.parse(persistedCurrentUser)));
    }
  }, [dispatch]);
  const dataLvNB = useSelector(selectDataLvNB);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const notificationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="d-flex w-100">
        <div
          style={{
            border: "none",
            marginRight: "30px",
            marginLeft: "30px",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        >
          <Image
            src={Nofication}
            preview={false}
            width={"130%"}
            className="ImageNavBar"
          />
        </div>
        {open && (
          <div
            ref={notificationRef}
            style={{
              boxShadow: "2px 2px 15px 0px rgba(70, 64, 67, 0.10)",
              backgroundColor: "#fff",
              borderRadius: "10px",
              position: "absolute",
              width: "300px",
              height: "60vh",
              overflowX: "hidden",
              margin: " 60px 0px 0px -10px",
              zIndex: "1000",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 117, 6, 1)",
                color: "#fff",
                width: "300px",
                height: "7vh",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                padding: "7px 0px 10px 10px",
              }}
            >
              Thông báo
            </div>
            {dataLvNB.map((item) => (
              <div
                style={{
                  padding: "10px 0px 10px 15px",
                }}
              >
                <Typography
                  style={{ color: "rgba(191, 88, 5, 1)", fontWeight: "600" }}
                >
                  Người dùng: {item.NameCustomer}
                </Typography>
                <Typography style={{ padding: "6px 0px" }}>
                  {/* Thời gian nhận số: {formatGrantTime(item.GrantTime)} */}
                  Thời gian nhận số: {item.GrantTime}
                </Typography>
                <hr
                  style={{
                    margin: "0rem",
                  }}
                />
              </div>
            ))}
          </div>
        )}
        <Link to="/inFor" className="text-decoration-none d-flex">
          <Avatar size={43} src={NavImage} />
          <div className="ms-2">
            <Typography className="TextHelloNav">Xin chào</Typography>
            <Typography className="TextNav">{nameUser}</Typography>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AltaNavbar;
