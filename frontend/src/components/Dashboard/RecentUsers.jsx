const users = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    plan: "Premium",
    status: "Active",
  },
  {
    id: 2,
    name: "Amit Kumar",
    email: "amit@gmail.com",
    plan: "Basic",
    status: "Pending",
  },
  {
    id: 3,
    name: "Priya Singh",
    email: "priya@gmail.com",
    plan: "Enterprise",
    status: "Active",
  },
  {
    id: 4,
    name: "Rohit Verma",
    email: "rohit@gmail.com",
    plan: "Premium",
    status: "Blocked",
  },
];

const RecentUsers = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-3">

      <div className="flex justify-between items-center p-6 border-b">

        <h2 className="text-xl font-bold">
          Recent Users
        </h2>

        <button className="text-blue-600 font-medium cursor-pointer">
          View All
        </button>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b bg-gray-50">

            <th className="text-left p-4">Name</th>

            <th className="text-left p-4">Email</th>

            <th className="text-left p-4">Plan</th>

            <th className="text-left p-4">Status</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">
                {user.plan}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : user.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {user.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentUsers;