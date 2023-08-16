import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideMenu from "../../components/slide/slide";
import AltaNavbar from "../../components/navbarRight/navbar";
import "../../assets/css/InforUser/InforUser.css";
import Em from "../../assets/img/nav/ImageEmIu.jpg";
import Camera from "../../assets/img/infor/CameraInforUser.svg";
import { Avatar, Image, Input, Typography } from "antd";
import { selectCurrentUser } from "../../app/selectors";
import { loginSuccess } from "../../feature/auth/login";

function AltaInForUser() {
  const currentUser = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(Em);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageChange = (event: any) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageObjectURL = URL.createObjectURL(selectedImage);
      setProfileImage(imageObjectURL);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(false);
  }, [currentUser]);

  if (!currentUser) {
    const persistedCurrentUser = localStorage.getItem("currentUser");
    if (persistedCurrentUser) {
      dispatch(loginSuccess(JSON.parse(persistedCurrentUser)));
      setLoading(false);
    } else {
      return <div>Bạn chưa đăng nhập</div>;
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="row">
      <div className="col-lg-2" style={{ paddingRight: "0px" }}>
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
          style={{ paddingRight: "80px", paddingLeft: "30px" }}
        >
          <Typography className="TitleInfoUser">Thông tin cá nhân</Typography>
          <AltaNavbar />
        </div>
        <div id="bgInForUser">
          <div id="bgInFor">
            <div className="row">
              <div className="col-4">
                <div className="avatar-container" onClick={handleAvatarClick}>
                  <Avatar
                    src={profileImage}
                    size={230}
                    className="avtInForUser"
                  />
                  <Image
                    src={Camera}
                    width={"15%"}
                    preview={false}
                    className="cameraInFor"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="input-file"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </div>

                <Typography className="TextInForUser">
                  {currentUser?.NameUser}
                </Typography>
              </div>
              <div className="col-lg-4" style={{ marginLeft: "-30px" }}>
                <div style={{ marginTop: "40px" }}>
                  <label>Tên người dùng</label>
                  <Input
                    className="mt-2 py-2"
                    value={currentUser?.NameUser}
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <label>Số điện thoại</label>
                  <Input
                    className="mt-2 py-2"
                    value={currentUser?.Phone}
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <label>Email:</label>
                  <Input
                    className="mt-2 py-2"
                    value={currentUser?.Email}
                    disabled
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div style={{ marginTop: "40px" }}>
                  <label>Tên đăng nhập</label>
                  <Input
                    className="mt-2 py-2"
                    value={currentUser?.UserNameManagerUser}
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <label>Mật khẩu</label>
                  <Input
                    className="mt-2 py-2"
                    value={currentUser?.password}
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <label>Vai trò:</label>
                  <Input
                    className="mt-2 py-2"
                    value={currentUser?.Role}
                    disabled
                  />
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
