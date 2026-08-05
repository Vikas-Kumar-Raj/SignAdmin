import { useEffect, useState } from "react";
import axios from "axios";

const AddUserModal = ({
  open,
  onClose,
  fetchUsers,
  editUser,
}) => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    userType: "Basic",
    status: "Active",
    credits: 0,
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  
  // Fill Form for Edit
  // ==========================
  useEffect(() => {
    if (editUser) {
      setFormData({
        name: editUser.name || "",
        email: editUser.email || "",
        phone: editUser.phone || "",
        userType: editUser.userType || "Basic",
        status: editUser.status || "Active",
        credits: editUser.credits || 0,
      });
    } else {
      setFormData(initialState);
    }
  }, [editUser]);

  
  // Handle Change
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "credits"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  
  // Submit
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editUser) {
        // Update User
        await axios.put(
          `http://localhost:5000/api/users/${editUser._id}`,
          formData
        );

        alert("User updated successfully");
      } else {
        // Add User
        await axios.post(
          "http://localhost:5000/api/users",
          formData
        );

        alert("User added successfully");
      }

      await fetchUsers();

      setFormData(initialState);

      onClose();

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-lg rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {editUser ? "Edit User" : "Add New User"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Enterprise">Enterprise</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
            <option value="Pending">Pending</option>
          </select>

          <input
            type="number"
            name="credits"
            placeholder="Credits"
            value={formData.credits}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() => {
                setFormData(initialState);
                onClose();
              }}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-black text-white rounded-lg disabled:bg-gray-400"
            >
              {loading
                ? "Saving..."
                : editUser
                ? "Update User"
                : "Save User"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddUserModal;