import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const RegistrationForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roll: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "roll" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Form submitted:", formData);
    // You can send formData to backend here using fetch/axios
    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        // Redirect to login or dashboard page
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  if (loading) {
    return <div className="text-center">Submmiting your data ...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <label className="block mb-2 font-medium">Roll Number</label>
        <input
          type="number"
          name="roll"
          value={formData.roll}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 border rounded"
        />

        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
