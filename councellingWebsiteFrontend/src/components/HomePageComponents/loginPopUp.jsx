import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginPopUp = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("studentName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const name = response.data.user.name || "Student";
        localStorage.setItem("studentName", name);
        setUserName(name);
        setIsLoginOpen(false);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("studentName");
    setIsLoginOpen(false);
    const response = await axios.get("http://localhost:4000/user/logout", {
      withCredentials: true,
    });
    alert("Successfully logout");
    setUserName("");
    navigate("/");
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      {/* If not logged in, show login button */}
      {!userName ? (
        <DialogTrigger asChild>
          <Button className="hidden md:block border-2 cursor-pointer h-full rounded-none text-blue-600 border-blue-600 bg-transparent hover:bg-blue-600 hover:text-white duration-100">
            Student Login
          </Button>
        </DialogTrigger>
      ) : (
        // If logged in, show dropdown menu
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="hidden text-xl md:flex items-center justify-center w-10 h-10 text-blue-600 border-2 border-blue-600 rounded-full bg-transparent cursor-pointer">
              {userName.charAt(0).toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate("/dashboard")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <DialogContent className="w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Student Login
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <form onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="rounded-none"
                id="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="rounded-none"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between text-sm">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
              <Link to="/register" className="text-blue-500 hover:underline">
                New Student? Register
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full rounded-none cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopUp;
