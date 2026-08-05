import { FaSearch, FaPlus, FaDownload } from "react-icons/fa";
import AddUserModal from "./AddUserModal";

const UserFilters = ({
  fetchUsers,
  openModal,
  setOpenModal,
  editUser,
  setEditUser,
}) => {
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Left */}
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border rounded-lg w-72 outline-none"
            />
          </div>

          {/* User Type */}
          <select className="border rounded-lg px-4 py-2">
            <option>All User Types</option>
            <option>Basic</option>
            <option>Premium</option>
            <option>Enterprise</option>
          </select>

          {/* Status */}
          <select className="border rounded-lg px-4 py-2">
            <option>All Status</option>
            <option>Active</option>
            <option>Blocked</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Right */}
        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100">
            <FaDownload />
            Export
          </button>

          <button
            onClick={() => {
              setEditUser(null);
              setOpenModal(true);
            }}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800"
          >
            <FaPlus />
            Add New User
          </button>
        </div>
      </div>

      <AddUserModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditUser(null);
        }}
        fetchUsers={fetchUsers}
        editUser={editUser}
      />
    </>
  );
};

export default UserFilters;
