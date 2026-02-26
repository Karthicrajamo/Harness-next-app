"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardMiddleware } from "@/features/Thunks/dashboard/dashboardThunk";
import { AppDispatch, RootState } from "@/redux/store";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const { dashboardData, isLoading } = useSelector(
    (state: RootState) => state.dashboardReducers,
  );

  useEffect(() => {
    dispatch(dashboardMiddleware());
  }, [dispatch]);

  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="my-card-gradient border-l-[6px] border-[#2196f3] dark:bg-gray-700 px-4 py-3 rounded-bl-[8px]">
          <h1 className="font-semibold text-gray-800 dark:text-white text-[15px] tracking-wide">
            Recent Tabs
          </h1>
        </div>
        <div className="px-4 py-8 bg-white dark:bg-gray-700">
          <p className="text-gray-400 dark:text-gray-300 text-[15px] text-center">
            No recent tabs yet
          </p>
        </div>
      </div>

      <div className="px-4 py-8 bg-white dark:bg-gray-700">
        {!dashboardData ? (
          <p className="text-gray-400 dark:text-gray-300 text-[15px] text-center">
            No recent tabs yet
          </p>
        ) : (
          Object.entries(dashboardData).map(([department, modules]) => (
            <div key={department} className="mb-4">
              <h2 className="font-semibold text-gray-700 dark:text-white mb-2">
                {department}
              </h2>
              <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300 text-sm">
                {modules.map((module) => (
                  <li key={module.module_id}>{module.module_name}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


