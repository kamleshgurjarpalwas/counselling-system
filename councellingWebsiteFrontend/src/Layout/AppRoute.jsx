import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserDashboard from "@/pages/dashBoard";
import InstituteTour from "@/pages/InstituteTour";
import TimeTable from "@/pages/TimeTable";
import ChoicesSelection from "@/components/dashBoardComponents/choiceSelection/ChoiceSelection";
import RegistrationForm from "@/components/HomePageComponents/Registeration";
import CollegeDropdowns from "../pages/OcOrPage"
import SeatMatrixPage from "../pages/SeatMatrixPage"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/institute-tour" element={<InstituteTour />} />
      <Route path="/timetable" element={<TimeTable />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/choices" element={<ChoicesSelection />} />
      <Route path="/opening-closing-rank" element={<CollegeDropdowns />} />
      <Route path="/seat-matrix" element={<SeatMatrixPage />} />
    </Routes>
  );
}

export default AppRoutes;
