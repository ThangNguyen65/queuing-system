import React from "react";
import { Route, Routes } from "react-router-dom";
import AltaForgotPassword from "../layouts/login/forgotPassword";
import AltaLogin from "../layouts/login/login";

function Routess() {
  return (
    <Routes>
      <Route path="/login" element={<AltaLogin />} />
      <Route path="/forgot" element={<AltaForgotPassword />} />
    </Routes>
  );
}

export default Routess;
