import { useState } from "react";
import SwapPopUp from "./SwapPopUp";
const RightSelectedChoices = ({
  selectedChoicesDetails,
  upChoice,
  downChoice,
  swapChoices,
  deleteChoice,
  submitSelectedChoices,
}) => {
  return (
    <>
      <div className="w-full border rounded p-2 bg-white max-h-[700px] overflow-hidden flex flex-col">
        <div className="relative flex items-center justify-end p-2 pb-4">
          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold text-gray-800">
            Selected Choices
          </h2>

          <button
            className="bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-600 transition"
            onClick={submitSelectedChoices}
          >
            Save changes
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          <table className="w-full border-collapse border border-gray-300 table-fixed">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-2 w-1/12">SN.</th>
                <th className="border p-2 w-1/3">Institute</th>
                <th className="border p-2 w-1/3">Branch</th>
                <th className="border p-2 w-1/3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedChoicesDetails.length !== 0 ? (
                selectedChoicesDetails.map((choice, idx) => (
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
                    {/* <td className="border text-gray-600 text-center">
                        {choice.duration}
                      </td> */}
                    <td className="border p-2">
                      <div className="flex gap-2 justify-center flex-wrap">
                        <SwapPopUp
                          startInd={idx}
                          handleSwap={swapChoices}
                          disabled={selectedChoicesDetails.length === 1}
                        />
                        <button
                          onClick={() => upChoice(idx)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                          disabled={idx === 0}
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => downChoice(idx)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                          disabled={idx === selectedChoicesDetails.length - 1}
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => deleteChoice(idx)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                        >
                          ✕
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
export default RightSelectedChoices;
