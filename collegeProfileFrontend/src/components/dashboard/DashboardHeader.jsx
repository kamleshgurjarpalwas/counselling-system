import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

export default function DashboardHeader({ college, onLogout }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {college?.collegeName || "College Dashboard"}
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          {college?.address || "Government Educational Institution"}
        </p>
      </div>
      <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
        {college?.nirfRank && (
          <span className="text-xs md:text-sm bg-blue-100 text-blue-800 px-2 md:px-3 py-1 rounded-full flex items-center">
            <Award className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            NIRF Rank: {college.nirfRank}
          </span>
        )}
        <Button
          onClick={onLogout}
          variant="destructive"
          className="flex items-center shadow-sm text-xs md:text-sm"
          size="sm"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}