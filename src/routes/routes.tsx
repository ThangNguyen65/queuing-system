import { Route, Routes } from "react-router-dom";
import AltaForgotPassword from "../layouts/login/forgotPassword";
import ResetNewPassword from "../layouts/login/resetNewPassword";
import Altalogin from "../layouts/login/login";
import AltaInForUser from "../layouts/inforUser/inforUser";
import AltaDevice from "../layouts/Device/device";
import AltaDashboard from "../layouts/dashboard/dashboard";
import AltaAddDevice from "../layouts/Device/addDevice";
import AltaDetailDevice from "../layouts/Device/detail";
import AltaEditDevice from "../layouts/Device/editDevice";
import AltaService from "../layouts/service/service";
import AltaLevelNumber from "../layouts/LevelNb/Ln";

function Routess() {
  return (
    <Routes>
      <Route path="/" element={<Altalogin />} />
      <Route path="/inFor" element={<AltaInForUser />} />
      <Route path="/forgot" element={<AltaForgotPassword />} />
      <Route path="/ResetNewPassword" element={<ResetNewPassword />} />
      <Route path="/device" element={<AltaDevice />} />
      <Route path="/addDevice" element={<AltaAddDevice />} />
      <Route path="/detailDevice/:eventId" element={<AltaDetailDevice />} />
      <Route path="/edit/:id" element={<AltaEditDevice />} />
      <Route path="/service" element={<AltaService />} />
      <Route path="/levelNumber" element={<AltaLevelNumber />} />
      <Route path="/dashboard" element={<AltaDashboard />} />
    </Routes>
  );
}

export default Routess;
