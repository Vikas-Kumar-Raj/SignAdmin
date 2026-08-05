import UserCard from "./UserCard";
import { FaUsers, FaUserCheck, FaUserSlash } from "react-icons/fa";

const UserStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UserCard
        title="Total Users"
        value="12,842"
        subtitle="+8%"
        color="bg-blue-100"
        icon={<FaUsers className="text-blue-600 text-xl" />}
      />

      <UserCard
        title="Active Users"
        value="11,209"
        subtitle="87.3%"
        color="bg-green-100"
        icon={<FaUserCheck className="text-green-600 text-xl" />}
      />

      <UserCard
        title="Blocked Users"
        value="1,633"
        subtitle="Action Required"
        color="bg-red-100"
        icon={<FaUserSlash className="text-red-600 text-xl" />}
      />
    </div>
  );
};

export default UserStats;
