import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import { useCollege } from "@/hooks/UseCollege";

const OutputTable = () => {
  const { state, fetchFilteredData } = useCollege();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    fetchFilteredData(currentPage, pageSize);
  }, [currentPage]);

  if (!state.responseData || !state.responseData.data || state.responseData.data.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  const { totalPages, data } = state.responseData;

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full mt-10">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">College Cutoff Ranks</h2>
        <p className="text-gray-500">View opening and closing ranks for different colleges and branches</p>
      </div>

      <Table className="w-full border border-gray-200 rounded-lg table-fixed">
        <TableHeader className="bg-gray-100 text-gray-700">
          <TableRow className="border-b border-gray-300">
            <TableHead className="border p-3 px-5 w-[200px] break-words whitespace-normal overflow-hidden">College Name</TableHead>
            <TableHead className="border p-3 px-5 w-[200px] break-words whitespace-normal overflow-hidden">Branch</TableHead>
            <TableHead className="border p-3 px-5 w-[100px] break-words whitespace-normal overflow-hidden">Category</TableHead>
            <TableHead className="border p-3 px-5 w-[110px] break-words whitespace-normal overflow-hidden">HS - Total Seats</TableHead>
            {/* <TableHead className="border p-3 px-5 w-[110px] break-words whitespace-normal overflow-hidden">HS - Closing Rank</TableHead> */}
            <TableHead className="border p-3 px-5 w-[110px] break-words whitespace-normal overflow-hidden">OS - Total Seats</TableHead>
            {/* <TableHead className="border p-3 px-5 w-[110px] break-words whitespace-normal overflow-hidden">OS - Closing Rank</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((college) =>
            college.branches.map((branch) =>
              Object.keys(branch.categories).map((category) => (
                <TableRow
                  key={`${college.collegeId}-${branch.branchId}-${category}`}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <TableCell className="border p-3 px-5 w-[200px] break-words whitespace-normal overflow-hidden">{college.collegeName}</TableCell>
                  <TableCell className="border p-3 px-5 w-[200px] break-words whitespace-normal overflow-hidden">{branch.branchName}</TableCell>
                  <TableCell className="border p-3 px-5 w-[100px] break-words whitespace-normal overflow-hidden">{category.toUpperCase()}</TableCell>
                  <TableCell className="border p-3 px-5 w-[110px] break-words whitespace-normal overflow-hidden">{branch.categories[category].homeState.totalSeats || "N/A"}</TableCell>
                  {/* <TableCell className="border p-3 px-5 w-[110px] break-words whitespace-normal overflow-hidden">{branch.categories[category].homeState.closingRank || "N/A"}</TableCell> */}
                  <TableCell className="border p-3 px-5 w-[110px] break-words whitespace-normal overflow-hidden">{branch.categories[category].otherState.totalSeats || "N/A"}</TableCell>
                  {/* <TableCell className="border p-3 px-5 w-[110px] break-words whitespace-normal overflow-hidden">{branch.categories[category].otherState.closingRank || "N/A"}</TableCell> */}
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>

      <Pagination className="mt-6 flex justify-center">
        <PaginationContent className="flex items-center space-x-2">
          <PaginationItem>
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 border cursor-pointer rounded-md transition duration-200 disabled:opacity-50"
            >
              <PaginationPrevious />
            </Button>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <PaginationItem key={page}>
              <Button
                variant="ghost"
                onClick={() => handlePageClick(page)}
                className={`cursor-pointer px-4 py-2 border rounded-md transition duration-200 
                  ${currentPage === page ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-200"}`}
              >
                {page}
              </Button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border cursor-pointer rounded-md transition duration-200 disabled:opacity-50"
            >
              <PaginationNext />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default OutputTable;
