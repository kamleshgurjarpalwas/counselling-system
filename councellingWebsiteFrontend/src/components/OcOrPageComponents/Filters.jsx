import { useCollege } from "../../hooks/UseCollege";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const AllFilters = ({ onFetch }) => {
  const { state, dispatch } = useCollege();

  // Local state for filtering search results
  const [collegeSearch, setCollegeSearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");

  const isDisabled = Boolean(
    !state.collegeType ||
      !state.collegeId ||
      !state.branchId ||
      !state.year ||
      !state.category
  );

  return (
    <div className="p-6 space-y-4 flex flex-col max-w-lg mx-auto">
      {/* College Type */}
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 font-medium w-32">College Type</label>
        <Select
          value={state.collegeType || ""}
          onValueChange={(value) =>
            dispatch({ type: "SET_COLLEGE_TYPE", payload: value })
          }
        >
          <SelectTrigger className="w-full max-w-[400px] truncate">
            <SelectValue placeholder="Select College Type" />
          </SelectTrigger>
          <SelectContent className="max-w-[400px]">
            {["all", "iit", "nit", "iiit", "gfti"].map((type) => (
              <SelectItem key={type} value={type}>
                {type.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* College Selection with Search */}
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 font-medium w-32">College</label>
        <Select
          value={state.collegeId || ""}
          onValueChange={(value) =>
            dispatch({ type: "SET_COLLEGE_ID", payload: value })
          }
        >
          <SelectTrigger className="w-full max-w-[400px] truncate">
            <SelectValue placeholder="Select College" />
          </SelectTrigger>
          <SelectContent className="max-w-[400px]">
            <div className="p-2">
              <Input
                placeholder="Search College..."
                value={collegeSearch}
                onChange={(e) => setCollegeSearch(e.target.value)}
                className="w-full px-2 py-1 mb-2 border border-gray-300 rounded-md"
              />
            </div>
            <SelectItem value="all">All Colleges</SelectItem>
            {state.colleges
              .filter((college) =>
                college.collegeName.toLowerCase().includes(collegeSearch.toLowerCase())
              )
              .map((college) => (
                <SelectItem key={college.collegeId} value={college.collegeId}>
                  {college.collegeName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Branch Selection with Search */}
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 font-medium w-32">Branch</label>
        <Select
          value={state.branchId || ""}
          onValueChange={(value) =>
            dispatch({ type: "SET_BRANCH_ID", payload: value })
          }
        >
          <SelectTrigger className="w-full max-w-[400px] truncate">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent className="max-w-[400px]">
            <div className="p-2">
              <Input
                placeholder="Search Branch..."
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                className="w-full px-2 py-1 mb-2 border border-gray-300 rounded-md"
              />
            </div>
            <SelectItem value="all">All Branches</SelectItem>
            {state.branches
              .filter((branch) =>
                branch.branchName.toLowerCase().includes(branchSearch.toLowerCase())
              )
              .map((branch) => (
                <SelectItem key={branch.branchId} value={branch.branchId}>
                  {branch.branchName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year Selection */}
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 font-medium w-32">Year</label>
        <Select
          value={state.year || ""}
          onValueChange={(value) =>
            dispatch({ type: "SET_YEAR", payload: value })
          }
        >
          <SelectTrigger className="w-full max-w-[400px] truncate">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent className="max-w-[400px]">
            {["2025", "2024", "2023", "2022"].map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Selection */}
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 font-medium w-32">Category</label>
        <Select
          value={state.category || ""}
          onValueChange={(value) =>
            dispatch({ type: "SET_CATEGORY", payload: value })
          }
        >
          <SelectTrigger className="w-full max-w-[400px] truncate">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="max-w-[400px]">
            {["all", "gen", "ews", "obc", "sc", "st"].map((category) => (
              <SelectItem key={category} value={category}>
                {category.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Get Data Button */}
      <div className="w-full flex justify-center items-center">
        <Button
          onClick={onFetch}
          disabled={isDisabled || state.loading}
          className="cursor-pointer bg-blue-600 hover:bg-blue-500 transition-all ease-in-out w-fit flex justify-center items-center mt-4"
        >
          {state.loading && (
            <Loader2 className="animate-spin text-black h-5 w-5 mr-2" />
          )}
          Get Data
        </Button>
      </div>
    </div>
  );
};

export default AllFilters;
