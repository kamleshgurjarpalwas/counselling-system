import { Button } from "@/components/ui/button";

export default function CollegeSettings({ onEditCollege }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">College Settings</h2>
      <div className="space-y-4">
        <Button
          variant="outline"
          className="w-full max-w-xs text-sm md:text-base"
          onClick={onEditCollege}
        >
          Edit College Information
        </Button>
      </div>
    </div>
  );
}