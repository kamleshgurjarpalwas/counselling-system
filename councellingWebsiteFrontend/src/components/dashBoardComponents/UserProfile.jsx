import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);
  const [resultError, setResultError] = useState(null);
  const [isUnAlloted, setIsUnAlloted] = useState(false);

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

  const fetchResult = async () => {
    try {
      setResultLoading(true);
      setResultError(null);
      const response = await axios.get(
        "http://localhost:4000/user/getUserResult",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setResult(response.data);
      }

      if (response.data.success === false) {
        setIsUnAlloted(true);
      }
    } catch (err) {
      console.error("Failed to fetch result:", err);
      setResultError(
        err.response?.data?.message ||
          "Failed to fetch result. Please try again."
      );
    } finally {
      setResultLoading(false);
    }
  };

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

  if (isUnAlloted) {
    return (
      <div className="text-center text-xl font-semibold text-red-600 py-10">
        You are not allotted any college.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center flex-1">
            Candidate Profile
          </h2>
          <div className="flex gap-2">
            <Button onClick={fetchResult} disabled={resultLoading}>
              {resultLoading ? (
                <>
                  <FaSpinner className="animate-spin inline-block mr-2" />{" "}
                  Loading...
                </>
              ) : (
                "View Result"
              )}
            </Button>
            <Link to={`/choices`}>
              <Button>Choice Filling</Button>
            </Link>
          </div>
        </div>

        {resultError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {resultError}
          </div>
        )}

        {result && (
          <div className="mb-6 border border-green-200 bg-green-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Your Allotment Result
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">
                  <strong>College:</strong> {result.choiceDetail.collegeName}
                </p>
                <p className="text-gray-700">
                  <strong>Branch:</strong> {result.choiceDetail.branchName}
                </p>
                <p className="text-gray-700">
                  <strong>Program:</strong> {result.choiceDetail.description}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong>Duration:</strong> {result.choiceDetail.duration}{" "}
                  years
                </p>
                <p className="text-gray-700">
                  <strong>Allotted Choice No.:</strong>{" "}
                  {result.allotedChoiceNumber}
                </p>
                <p className="text-gray-700">
                  <strong>Tag:</strong> {result.choiceDetail.tag.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}

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
