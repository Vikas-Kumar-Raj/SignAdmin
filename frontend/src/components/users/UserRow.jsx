import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserRow = ({
  user,
  fetchUsers,
  setOpenModal,
  setEditUser,
}) => {

  // ==========================
  // Delete User
  // ==========================
  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {

      const response = await axios.delete(
        `http://localhost:5000/api/users/${user._id}`
      );

      alert(response.data.message);

      await fetchUsers();

    } catch (error) {

      alert(
        error.response?.data?.message || "Delete failed."
      );

    }
  };

  // ==========================
  // Edit User
  // ==========================
  const handleEdit = () => {
    setEditUser(user);
    setOpenModal(true);
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">

      {/* User */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h3 className="font-medium">
              {user.name}
            </h3>

            <p className="text-sm text-gray-500">
              {user.email}
            </p>

          </div>

        </div>
      </td>

      {/* Credits */}
      <td className="px-6 py-4">
        ₹ {user.credits}
      </td>

      {/* Status */}
      <td className="px-6 py-4">

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.status === "Active"
              ? "bg-green-100 text-green-600"
              : user.status === "Blocked"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {user.status}
        </span>

      </td>

      {/* Join Date */}
      <td className="px-6 py-4">
        {new Date(user.createdAt).toLocaleDateString("en-IN")}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">

        <div className="flex gap-3">

          {/* Edit */}
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <FaEdit />
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 cursor-pointer"
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default UserRow;