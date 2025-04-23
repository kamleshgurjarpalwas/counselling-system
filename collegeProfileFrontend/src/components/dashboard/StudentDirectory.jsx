export default function StudentDirectory({ students, branches }) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold">Student Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => {
                const branch = branches.find((b) => b.branchId === student.branch);
                return (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                      {student.studentId}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                      {student.email}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                      {branch?.branchName || "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }