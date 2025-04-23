import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EditModal({ data, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    email: data.email || "",
    password: "", // Don't prefill password
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">
            Edit Profile
          </h3>
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-3 md:space-y-4">
              {Object.entries(data).map(([key, value]) => {
                if (key === "_id" || key === "branchId" || key === "collegeId") return null;

                const isEditable = key === "collegeMail" || key === "collegeId" || key === "collegeName";

                return (
                  <div key={key} className="space-y-1 md:space-y-2">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      type={key === "password" ? "password" : "text"}
                      value={isEditable ? formData[key] : value}
                      onChange={(e) => isEditable && handleChange(key, e.target.value)}
                      className={`w-full px-2 md:px-3 py-1 md:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base ${!isEditable ? "bg-gray-100 cursor-not-allowed" : ""}`}
                      disabled={!isEditable}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 md:mt-6 flex justify-end gap-2 md:gap-3">
              <Button type="button" variant="outline" onClick={onClose} size="sm">
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
