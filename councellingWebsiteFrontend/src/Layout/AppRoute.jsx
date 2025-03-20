import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserDashboard from "@/pages/dashBoard";
import InstituteTour from "@/pages/InstituteTour";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserDashboard />} />
      <Route path="/institute-tour" element={<InstituteTour />} />
    </Routes>
  );
}

export default AppRoutes;
