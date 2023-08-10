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
import AltaManagerRole from "../layouts/manager/RoleManager";
import AltaManagerUser from "../layouts/manager/UserManager";
import AltaAddManagerUser from "../layouts/manager/AddUserManager";
import AltaEditManagerUser from "../layouts/manager/EditManagerUser";
import AltaAddService from "../layouts/service/addService";
import AltaAddLevelNumber from "../layouts/LevelNb/addLn";
import AltaDetailLvNumber from "../layouts/LevelNb/detail";
import AltaReport from "../layouts/report/report";
import AltaDetailService from "../layouts/service/detailService";
import AltaEditService from "../layouts/service/editService";
import AltaNoteActive from "../layouts/manager/NoteActive";
import AltaAddManagerRole from "../layouts/manager/AddManagerRole";
import AltaEditManagerRole from "../layouts/manager/EditManagerRole";

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
      <Route path="/DetailService/:id" element={<AltaDetailService />} />
      <Route path="/addService" element={<AltaAddService />} />
      <Route path="/editService/:id" element={<AltaEditService />} />
      <Route path="/levelNumber" element={<AltaLevelNumber />} />
      <Route path="/AddLevelNumber" element={<AltaAddLevelNumber />} />
      <Route path="/DetailLvNumber/:LvNumId" element={<AltaDetailLvNumber />} />
      <Route path="/roleManager" element={<AltaManagerRole />} />
      <Route path="/AddRoleManager" element={<AltaAddManagerRole />} />
      <Route path="/EditRoleManager/:id" element={<AltaEditManagerRole />} />
      <Route path="/userManager" element={<AltaManagerUser />} />
      <Route path="/addUserManager" element={<AltaAddManagerUser />} />
      <Route path="/editManager/:id" element={<AltaEditManagerUser />} />
      <Route path="/dashboard" element={<AltaDashboard />} />
      <Route path="/report" element={<AltaReport />} />
      <Route path="/noteActive" element={<AltaNoteActive />} />
    </Routes>
  );
}

export default Routess;
