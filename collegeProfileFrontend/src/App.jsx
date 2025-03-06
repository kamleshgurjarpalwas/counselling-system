import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./pages/Dashboard";


import "./App.css"

function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={2500} />
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/college-dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
