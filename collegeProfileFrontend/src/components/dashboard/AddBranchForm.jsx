import { React , useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddBranchForm({ collegeId, onBranchAdded, onClose }) {
  const [formData, setFormData] = useState({
    branchId: "",
    branchName: "",
    duration: "",
    description: "",
    restrictions: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_COLLEGE_PROFILE_URL}/profile/create-branch`,
        {
          collegeId,
          ...formData,
          restrictions: formData.restrictions.split(',').map(r => r.trim())
        },
        { withCredentials: true }
      );

      toast.success("Branch added successfully!");
      onBranchAdded(res.data.branch);
      setFormData({
        branchId: "",
        branchName: "",
        duration: "",
        description: "",
        restrictions: ""
      });
      if (onClose) onClose(); // Optional close after adding
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add branch");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Add New Branch</h3>
        {(
          <Button variant="ghost" onClick={onClose} className="text-gray-900 hover:text-black">
            ✕
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Branch ID</label>
            <Input
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
              placeholder="e.g., CS01"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Branch Name</label>
            <Input
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Duration (years)</label>
            <Input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 4"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Restrictions (comma separated)</label>
            <Input
              name="restrictions"
              value={formData.restrictions}
              onChange={handleChange}
              placeholder="e.g., PCM required, JEE Main"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Branch description..."
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-2">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Branch"}
          </Button>
        </div>
      </form>
    </div>
  );
}
