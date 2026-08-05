import React from "react";

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>

      </div>

    </div>
  );
};

export default DashboardCard;