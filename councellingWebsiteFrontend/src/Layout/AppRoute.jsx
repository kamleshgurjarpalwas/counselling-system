import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserDashboard from "@/pages/dashBoard";
import InstituteTour from "@/pages/InstituteTour";
import TimeTable from "@/pages/TimeTable";
import ChoicesSelection from "@/components/dashBoardComponents/choiceSelection/ChoiceSelection";
import RegistrationForm from "@/components/HomePageComponents/Registeration";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/institute-tour" element={<InstituteTour />} />
      <Route path="/timetable" element={<TimeTable />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/choices" element={<ChoicesSelection />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default AppRoutes;
