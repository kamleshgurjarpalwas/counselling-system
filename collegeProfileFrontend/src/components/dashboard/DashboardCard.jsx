import { BookOpen, GraduationCap, Library, School, Users } from "lucide-react";

const iconComponents = {
  BookOpen,
  GraduationCap,
  Library,
  School,
  Users
};

export default function DashboardCard({ icon, title, value, className }) {
  const IconComponent = iconComponents[icon];
  
  return (
    <div className={`rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm font-medium text-gray-600">{title}</p>
          <p className="text-xl md:text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
          <IconComponent className="h-4 w-4 md:h-6 md:w-6" />
        </div>
      </div>
    </div>
  );
}