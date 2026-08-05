import { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../layouts/AdminLayout";
import UserStats from "../components/users/UserStats";
import UserFilters from "../components/users/UserFilters";
import UsersTable from "../components/users/UsersTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [openModal, setOpenModal] = useState(false);

  // Edit User State
  const [editUser, setEditUser] = useState(null);

  // Fetch Users

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");

      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load Users
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout>

      {/* User Stats */}
      <UserStats users={users} />

      {/* Filters */}
      <UserFilters
        fetchUsers={fetchUsers}
        openModal={openModal}
        setOpenModal={setOpenModal}
        editUser={editUser}
        setEditUser={setEditUser}
      />

      {/* Users Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border mt-6 p-8 text-center">
          <p className="text-gray-500">Loading Users...</p>
        </div>
      ) : (
        <UsersTable
          users={users}
          fetchUsers={fetchUsers}
          setOpenModal={setOpenModal}
          setEditUser={setEditUser}
        />
      )}
    </AdminLayout>
  );
};

export default Users;
