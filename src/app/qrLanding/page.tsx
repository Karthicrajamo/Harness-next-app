import React from "react";
import "primeicons/primeicons.css";

const page = () => {
  return (
    <div>
      <div className="h-full w-full p-3 border-b border-gray-200 flex justify-between">
        <div className="flex items-center justify-center">
          <h1 className="flex items-center justify-center">Harness ERP</h1>
          <span
            className="pi pi-chevron-right"
            style={{
              fontSize: "0.7rem",
              marginLeft: "6px",
              color: "gray",
            }}
          ></span>
          <h3 className="mx-2 justify-center flex items-center text-gray-600 text-sm ">
            QR Landing
          </h3>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pi pi-search text-gray-500"></span>

            <input
              type="text"
              className="pl-10 border border-gray-300 rounded-lg bg-gray-100 w-full py-1"
              placeholder="Search..."
            />
          </div>

          <span
            className="pi pi-bell"
            style={{ fontSize: "1rem", marginLeft: "12px", color: "gray" }}
          ></span>
          <h3 className="mx-2 border-l pl-2 border-gray-200 justify-center flex items-center text-gray-600">
            Help
            <span
              className="pi pi-chevron-down"
              style={{
                fontSize: "0.8rem",
                marginLeft: "4px",
                color: "lightgray",
              }}
            ></span>
          </h3>
          <h1 className="bg-orange-400 w-10 h-10 flex items-center justify-center rounded-full">
            KA
          </h1>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between font-bold">
          <h1>QR Operation Report - STLS-00000233451</h1>{" "}
          <span
            className="pi pi-ellipsis-h bg-gray-200 p-2 rounded-sm
"
            style={{ fontSize: ".5rem", marginLeft: "12px", color: "gray" }}
          ></span>
        </div>
        <div className="border border-gray-100 rounded-md h-screen w-full flex mt-2 ">
          <div className="w-1/2">
            <h1>jii2</h1>
          </div>
          <div>
            
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
