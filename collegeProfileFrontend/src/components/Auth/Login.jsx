import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_COLLEGE_AUTH_URL}/login`,
        { registrationId, password },
        { withCredentials: true }
      );
      toast.success("Login successful!");
      navigate(`/dashboard`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">College Login</h2>
        <Input
          className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Registration ID"
          value={registrationId}
          onChange={(e) => setRegistrationId(e.target.value)}
        />
        <Input
          className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
          onClick={handleLogin} 
          className="w-full border-2 border-blue-600 bg-white hover:bg-blue-600 hover:text-white text-black font-semibold py-2 rounded-lg transition duration-300 cursor-pointer">
          Login
        </Button>
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline cursor-pointer">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
