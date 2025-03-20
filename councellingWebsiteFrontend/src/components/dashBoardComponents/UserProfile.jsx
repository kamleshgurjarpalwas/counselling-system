import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:4000/user/profile", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.error("Profile access failed:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch user data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold py-10">
        <FaSpinner className="animate-spin inline-block mr-2" /> Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl font-semibold text-red-600 py-10">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-xl font-semibold py-10">
        No user data available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Candidate Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Information */}
          <div className="border p-4 rounded-md shadow-sm">
            <p className="text-gray-700">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700">
              <strong>Father's Name:</strong> {user.fatherName}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {user.address}
            </p>
          </div>

          {/* Academic Information */}
          <div className="border p-4 rounded-md shadow-sm">
            <p className="text-gray-700">
              <strong>Roll Number:</strong> {user.roll}
            </p>
            <p className="text-gray-700">
              <strong>Rank:</strong> {user.rank}
            </p>
            <p className="text-gray-700">
              <strong>Category:</strong> {user.category}
            </p>
          </div>
        </div>

        {/* Status Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-md shadow-sm flex justify-between items-center">
            <span className="text-gray-700 font-semibold">
              Registration Status:
            </span>
            {user.isRegistered ? (
              <span className="text-green-600 flex items-center">
                <FaCheckCircle className="mr-1" /> Registered
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <FaTimesCircle className="mr-1" /> Not Registered
              </span>
            )}
          </div>

          <div className="border p-4 rounded-md shadow-sm flex justify-between items-center">
            <span className="text-gray-700 font-semibold">
              Verification Status:
            </span>
            {user.verificationStatus ? (
              <span className="text-green-600 flex items-center">
                <FaCheckCircle className="mr-1" /> Verified
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <FaTimesCircle className="mr-1" /> Not Verified
              </span>
            )}
          </div>
        </div>

        {/* Last Login */}
        <div className="mt-6 border p-4 rounded-md shadow-sm text-center">
          <p className="text-gray-700 font-semibold">Last Login:</p>
          <p className="text-blue-600">
            {new Date(user.lastLogin).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
