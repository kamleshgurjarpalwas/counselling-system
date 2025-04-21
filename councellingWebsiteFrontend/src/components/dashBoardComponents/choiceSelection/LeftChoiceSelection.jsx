import { useState } from "react";
const LeftChoiceSelection = ({ slectedChoicesId, allchoices, selectChoice }) => {
  return (
    <>
      <div className="w-full border rounded p-2 bg-white max-h-[700px] overflow-hidden flex flex-col">
        <div className=" p-2 pb-5">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Available Choices
          </h2>
        </div>

        <div className="overflow-y-auto flex-grow">
          <table className="w-full border-collapse border border-gray-300 table-fixed">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-2 w-1/12">SN.</th>
                <th className="border p-2 w-1/3">Institute</th>
                <th className="border p-2 w-1/4">Branch</th>
                <th className="border p-2 w-1/10">Duration</th>
                <th className="border p-2 w-1/8">Action</th>
              </tr>
            </thead>
            <tbody>
              {slectedChoicesId.length !== allchoices.length ? (
                allchoices
                  .filter(
                    (choice) => !slectedChoicesId.includes(choice.choiceId)
                  )
                  .map((choice, idx) => (
                    <tr key={choice.choiceId} className="bg-white">
                      <td className="border font-semibold text-center">
                        {idx + 1}
                      </td>
                      <td className="border p-2 text-blue-600 font-semibold">
                        {choice.collegeName}
                      </td>
                      <td className="border p-2 text-gray-600 truncate">
                        {choice.branchName}
                      </td>
                      <td className="border text-gray-600 text-center">
                        {choice.duration}
                      </td>
                      <td className="border p-2">
                        <div className="flex justify-center">
                          <button
                            onClick={() => selectChoice(choice.choiceId)}
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                          >
                            Select
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 p-3">
                    No available choices.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default LeftChoiceSelection;
