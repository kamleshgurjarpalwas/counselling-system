import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, List, Settings, Building } from "lucide-react";
import ConfirmationModal from "./Modals/ConfirmationModal";
import AddBranchForm from "./AddBranchForm";
import AddBranchPage from "./UpdateBranchDataForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function BranchManagement({
  branches,
  setBranches,
  collegeId,
  onEdit,
  onDelete,
}) {
  const [activeTab, setActiveTab] = useState("collegeBranches");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleDeleteClick = (branchId) => {
    setBranchToDelete(branchId);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!branchToDelete) return;
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_COLLEGE_PROFILE_URL
        }/profile/remove-branch/${branchToDelete}`,
        { withCredentials: true }
      );
      setBranches(branches.filter((b) => b.branchId !== branchToDelete));
      toast.success("Branch deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete branch");
    } finally {
      setShowConfirm(false);
      setBranchToDelete(null);
    }
  };

  const handleBranchCreated = async (newBranch) => {
    try {
      // First create the branch details
      await axios.post(
        `${import.meta.env.VITE_COLLEGE_PROFILE_URL}/profile/create-branch`,
        newBranch,
        { withCredentials: true }
      );

      // Then add it to the college
      const res = await axios.post(
        `${import.meta.env.VITE_COLLEGE_PROFILE_URL}/profile/add-branch`,
        {
          collegeId,
          branchId: newBranch.branchId,
          otherState: { gen: [], obc: [], ews: [], sc: [], st: [] },
          homeState: { gen: [], obc: [], ews: [], sc: [], st: [] },
        },
        { withCredentials: true }
      );

      setBranches([...branches, res.data.branch]);
      setShowAddForm(false);
      toast.success("Branch created and added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create branch");
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="collegeBranches">
            <Building className="h-4 w-4 mr-2" />
            College Branches
          </TabsTrigger>
          <TabsTrigger value="manage">
            <List className="h-4 w-4 mr-2" />
            Manage Branches
          </TabsTrigger>
          <TabsTrigger value="update">
            <Settings className="h-4 w-4 mr-2" />
            Update ORCR
          </TabsTrigger>
        </TabsList>

        {/* College Branches Tab */}
        <TabsContent value="collegeBranches">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <h2 className="text-lg md:text-xl font-semibold">
                All Branches in This College
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                View all branches currently offered by this college
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Branch ID
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Branch Name
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Total Seats
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {branches.length > 0 ? (
                    branches.map((branch) => (
                      <tr key={branch.branchId} className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {branch.branchId}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {branch.branchName}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {branch.duration} years
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {branch.totalSeats || "N/A"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 md:px-6 py-4 text-center text-sm text-gray-500">
                        No branches found for this college
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Manage Branches Tab */}
        <TabsContent value="manage">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
                <h2 className="text-lg md:text-xl font-semibold">
                  Manage Branches
                </h2>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Branch
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Branch ID
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Branch Name
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {branches.map((branch) => (
                    <tr key={branch.branchId} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {branch.branchId}
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {branch.branchName}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {branch.duration} years
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(branch)}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(branch.branchId)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Update ORCR Tab */}
        <TabsContent value="update">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Update Branch ORCR Data
            </h2>
            <AddBranchPage/>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Branch Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <AddBranchForm
              onBranchAdded={handleBranchCreated}
              onClose={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Branch"
        message="Are you sure you want to delete this branch? This action cannot be undone."
      />
    </div>
  );
}