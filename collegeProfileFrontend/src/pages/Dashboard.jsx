import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import DashboardCards from "@/components/dashboard/DashboardCards";
import BranchManagement from "@/components/dashboard/BranchManagement";
import StudentDirectory from "@/components/dashboard/StudentDirectory";
import CollegeSettings from "@/components/dashboard/CollegeSettings";
import EditModal from "@/components/dashboard/Modals/EditModal";
import ConfirmationModal from "@/components/dashboard/Modals/ConfirmationModal";

export default function CollegeDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [college, setCollege] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [branches, setBranches] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editData, setEditData] = useState(null);

  // Fetch college profile
  useEffect(() => {
    const fetchCollegeProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_COLLEGE_PROFILE_URL}/profile`,
          { withCredentials: true }
        );
        setCollege(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch profile");
        if (error.response?.status === 401) navigate("/login");
      }
    };
  
    fetchCollegeProfile();
  }, []);
  
  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      if (!college?.collegeId) return;
  
      try {
        const res = await axios.get(
          `http://localhost:4000/api/colleges-info/${college.collegeId.toLowerCase()}`,
          { withCredentials: true }
        );
        setBranches(res.data.data.branches || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch branches");
      }
    };
  
    fetchBranches();
  }, [college?.collegeId]);
  
  // Set dummy data
  useEffect(() => {
    if (!branches.length) return;
  
    setCourses([
      { name: "BTech", count: 120 },
      { name: "MTech", count: 60 },
      { name: "MSc", count: 45 },
    ]);
  
    setStudents(
      Array(185).fill().map((_, i) => ({
        _id: i,
        studentId: `STU${1000 + i}`,
        name: `Student ${i + 1}`,
        email: `student${i + 1}@college.edu`,
        branch: branches[i % branches.length]?.branchId,
      }))
    );
  
    setLoading(false);
  }, [branches]);

  // Delete branch handler
  const deleteBranch = async () => {
    if (!itemToDelete) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/branches/${itemToDelete}`,
        { withCredentials: true }
      );
      setBranches(branches.filter((b) => b.branchId !== itemToDelete));
      toast.success("Branch deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete branch");
    } finally {
      setItemToDelete(null);
      setShowConfirm(false);
    }
  };

  // Edit college info handler
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_COLLEGE_PROFILE_URL}/profile`,
        editData,
        { withCredentials: true }
      );
      setCollege(res.data.data);
      toast.success("College info updated successfully!");
      setEditData(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update college info");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_COLLEGE_AUTH_URL}/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader 
          college={college} 
          onLogout={handleLogout} 
        />
        
        <DashboardTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <>
            <DashboardCards 
              branches={branches} 
              students={students} 
              courses={courses} 
              onEditCollege={() => setEditData(college)}
              onShowBranches={() => setActiveTab("branches")}
            />
          </>
        )}

        {activeTab === "branches" && (
          <BranchManagement 
            branches={branches}
            setBranches={setBranches}
            collegeId={college?.collegeId}
            onEdit={setEditData}
            onDelete={(id) => {
              setItemToDelete(id);
              setShowConfirm(true);
            }}
          />
        )}

        {activeTab === "students" && (
          <StudentDirectory 
            students={students} 
            branches={branches} 
          />
        )}

        {activeTab === "settings" && (
          <CollegeSettings 
            onEditCollege={() => setEditData(college)}
          />
        )}
      </div>

      {/* Modals */}
      {editData && (
        <EditModal
          data={editData}
          onClose={() => setEditData(null)}
          onSubmit={handleEditSubmit}
        />
      )}

      {showConfirm && (
        <ConfirmationModal
          onClose={() => setShowConfirm(false)}
          onConfirm={deleteBranch}
        />
      )}
    </div>
  );
}