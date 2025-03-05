import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_COLLEGE_PROFILE_URL}/profile`, { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        toast.error("Unauthorized access. Redirecting to login...");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_COLLEGE_AUTH_URL}/logout`, {}, { withCredentials: true });
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-center">Welcome, {user?.collegeName || "User"}!</h2>
      <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-700">
        Logout
      </Button>
    </div>
  );
}
