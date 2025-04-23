import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import DashboardCard from "./DashboardCard";

export default function DashboardCards({ 
  branches, 
  students, 
  courses, 
  onEditCollege,
  onShowBranches 
}) {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        <DashboardCard
          icon="BookOpen"
          title="Total Branches"
          value={branches.length}
          className="bg-blue-50 text-blue-600"
        />
        <DashboardCard
          icon="GraduationCap"
          title="Total Students"
          value={students.length}
          className="bg-green-50 text-green-600"
        />
        <DashboardCard
          icon="Library"
          title="BTech Students"
          value={courses.find(c => c.name === "BTech")?.count || 0}
          className="bg-purple-50 text-purple-600"
        />
        <DashboardCard
          icon="School"
          title="MTech Students"
          value={courses.find(c => c.name === "MTech")?.count || 0}
          className="bg-amber-50 text-amber-600"
        />
        <DashboardCard
          icon="Users"
          title="MSc Students"
          value={courses.find(c => c.name === "MSc")?.count || 0}
          className="bg-rose-50 text-rose-600"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 md:h-24"
            onClick={onShowBranches}
          >
            <Plus className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2" />
            <span className="text-xs md:text-sm">Add Branch</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 md:h-24"
            onClick={onEditCollege}
          >
            <Edit className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2" />
            <span className="text-xs md:text-sm">Edit College Info</span>
          </Button>
        </div>
      </div>
    </div>
  );
}