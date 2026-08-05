import AdminLayout from "../layouts/AdminLayout";
import DashboardCard from "../components/Dashboard/DashboardCard";
import RecentUsers from "../components/Dashboard/RecentUsers";

import {
  FaUsers,
  FaSignature,
  FaMoneyBillWave,
  FaBoxOpen,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <AdminLayout>

      

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Users"
          value="1,250"
          icon={<FaUsers className="text-white text-2xl" />}
          color="bg-blue-500"
        />

        <DashboardCard
          title="Signatures"
          value="865"
          icon={<FaSignature className="text-white text-2xl" />}
          color="bg-green-500"
        />

        <DashboardCard
          title="Revenue"
          value="₹52,400"
          icon={<FaMoneyBillWave className="text-white text-2xl" />}
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Active Plans"
          value="315"
          icon={<FaBoxOpen className="text-white text-2xl" />}
          color="bg-purple-500"
        />

      </div>

      <RecentUsers />

    </AdminLayout>
  );
};

export default Dashboard;