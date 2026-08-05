import { useEffect, useState } from "react";
import axios from "axios";

const AddPlanModal = ({
  open,
  onClose,
  fetchPlans,
  editPlan,
}) => {
  const initialState = {
    planName: "",
    description: "",
    price: "",
    billing: "Monthly",
    badge: "Basic",
    users: 0,
    revenueForecast: 0,
    features: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editPlan) {
      setFormData({
        planName: editPlan.planName,
        description: editPlan.description,
        price: editPlan.price,
        billing: editPlan.billing,
        badge: editPlan.badge,
        users: editPlan.users,
        revenueForecast: editPlan.revenueForecast,
        features: editPlan.features.join(", "),
        status: editPlan.status,
      });
    } else {
      setFormData(initialState);
    }
  }, [editPlan]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        price: Number(formData.price),
        users: Number(formData.users),
        revenueForecast: Number(formData.revenueForecast),
        features: formData.features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editPlan) {
        await axios.put(
          `http://localhost:5000/api/plans/${editPlan._id}`,
          payload
        );

        alert("Plan Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/plans",
          payload
        );

        alert("Plan Added Successfully");
      }

      fetchPlans();
      onClose();
      setFormData(initialState);

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">

      <div className="bg-white w-full max-w-2xl rounded-xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          {editPlan ? "Edit Plan" : "Add New Plan"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="planName"
            placeholder="Plan Name"
            value={formData.planName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            rows="3"
            required
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
              required
            />

            <select
              name="billing"
              value={formData.billing}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            >
              <option>Monthly</option>
              <option>Yearly</option>
            </select>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <select
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            >
              <option>Basic</option>
              <option>Popular</option>
              <option>Enterprise</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              name="users"
              placeholder="Users"
              value={formData.users}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="number"
              name="revenueForecast"
              placeholder="Revenue Forecast"
              value={formData.revenueForecast}
              onChange={handleChange}
              className="border rounded-lg px-4 py-3"
            />

          </div>

          <textarea
            name="features"
            placeholder="Features (comma separated)"
            value={formData.features}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            rows="4"
          />

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
            >
              {loading
                ? "Saving..."
                : editPlan
                ? "Update Plan"
                : "Save Plan"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddPlanModal;