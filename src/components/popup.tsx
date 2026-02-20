"use client";

import React from "react";
import ButtonCommon from "../components/button";

const Popup = ({ text, setOpenPopup, handleLogout }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[1000]">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">{text}</h2>

        <div className="flex justify-center gap-4">
          <ButtonCommon
            label="No"
            className="px-4 py-2 border border-gray-400 text-gray-700 rounded"
            onClick={() => {
              setOpenPopup(false);
            }}
          />

          <ButtonCommon
            label="Yes"
            className="px-4 py-2 bg-red-600 text-white rounded bg-[#2196f3] text-white hover:bg-[#1976d2] focus:ring-blue-500"
            onClick={() => handleLogout()}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
