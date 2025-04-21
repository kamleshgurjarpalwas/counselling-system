import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

const FilterSection = ({ dataForFilterBox, onApply, onClear }) => {
  const [typeFilters, setTypeFilters] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const handleTypeToggle = (value) => {
    setTypeFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearFilters = () => {
    setTypeFilters([]);
    setSelectedCollege("");
    setSelectedBranch("");
    onClear?.();
  };

  const applyFilters = () => {
    onApply?.({
      typeFilters,
      selectedCollege,
      selectedBranch,
    });
  };

  return (
    <div className="flex flex-wrap items-start gap-4 bg-white p-4 rounded border border-gray-200 mb-5">
      {/* College Type Checkboxes */}
      <div className="flex flex-wrap gap-3 items-center min-w-full md:min-w-[250px]">
        <Label className="text-gray-700 font-medium w-full md:w-auto">
          College Type:
        </Label>
        {dataForFilterBox.tag.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={type}
              checked={typeFilters.includes(type)}
              onCheckedChange={() => handleTypeToggle(type)}
            />
            <Label htmlFor={type} className="text-gray-600">
              {type.toUpperCase()}
            </Label>
          </div>
        ))}
      </div>

      {/* College Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[400px] rounded-md text-gray-700 border-gray-300 justify-start"
          >
            {selectedCollege || "Select College"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-[400px] p-0">
          <Command className="w-full">
            <CommandInput className="w-full" placeholder="Search college..." />
            <CommandList className="w-full max-h-[400px] overflow-y-auto">
              {dataForFilterBox.colleges.map((college) => (
                <CommandItem
                  key={college}
                  onSelect={() => setSelectedCollege(college)}
                >
                  {college}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Branch Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[300px] rounded-md text-gray-700 border-gray-300 justify-start"
          >
            {selectedBranch || "Select Branch"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-[300px] p-0">
          <Command className="w-full">
            <CommandInput className="w-full" placeholder="Search branch..." />
            <CommandList className="w-full max-h-[200px] overflow-y-auto">
              {dataForFilterBox.branches.map((branch) => (
                <CommandItem
                  key={branch}
                  onSelect={() => setSelectedBranch(branch)}
                >
                  {branch}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 ml-auto w-full sm:w-auto">
        <Button
          variant="outline"
          onClick={clearFilters}
          className="rounded-md border-gray-300 text-gray-700"
        >
          Clear
        </Button>
        <Button
          onClick={applyFilters}
          className="bg-green-500 hover:bg-green-600 text-white rounded-md"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
