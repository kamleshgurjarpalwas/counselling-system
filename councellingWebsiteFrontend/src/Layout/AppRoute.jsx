import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CollegeDropdowns from "../pages/OcOrPage"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/opening-closing-rank" element={<CollegeDropdowns />} />
    </Routes>
  );
}

export default AppRoutes;
