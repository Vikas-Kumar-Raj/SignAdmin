import UserRow from "./UserRow";

const UsersTable = ({
  users,
  fetchUsers,
  setOpenModal,
  setEditUser,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mt-6 overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-6 py-4">
              User Details
            </th>

            <th className="text-left px-6 py-4">
              Credits
            </th>

            <th className="text-left px-6 py-4">
              Status
            </th>

            <th className="text-left px-6 py-4">
              Join Date
            </th>

            <th className="text-left px-6 py-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              fetchUsers={fetchUsers}
              setOpenModal={setOpenModal}
              setEditUser={setEditUser}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default UsersTable;