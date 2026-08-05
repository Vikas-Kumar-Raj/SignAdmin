import axios from "axios";
import { FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";

const PlanCard = ({ plan, fetchPlans, setEditPlan, setOpenModal }) => {
  const handleDelete = async () => {
    const ok = window.confirm("Delete this plan?");

    if (!ok) return;

    try {
      await axios.delete(`http://localhost:5000/api/plans/${plan._id}`);

      alert("Plan Deleted Successfully");

      fetchPlans();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg
      transition-all duration-200
      hover:-translate-y-1
            hover:shadow-2xl
      hover:border-blue-500"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{plan.planName}</h2>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold
            ${
              plan.badge === "Popular"
                ? "bg-yellow-400 text-black"
                : plan.badge === "Enterprise"
                  ? "bg-green-400 text-black"
                  : "bg-white text-blue-700"
            }`}
          >
            {plan.badge}
          </span>
        </div>

        <p className="text-blue-100 mt-3">{plan.description}</p>
      </div>

      {/* Price */}

      <div className="px-6 pt-6">
        <h1 className="text-5xl font-bold text-gray-900">₹ {plan.price}</h1>

        <p className="text-gray-500 mt-2">Per {plan.billing}</p>
      </div>

      {/* Features */}

      <div className="px-6 mt-8 space-y-3">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <FaCheckCircle className="text-green-600" />

            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="px-6 py-6 mt-8 border-t">
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          <span>👥 {plan.users} Users</span>

          <span>₹ {plan.revenueForecast}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditPlan(plan);
              setOpenModal(true);
            }}
            className="flex-1  border border-black hover:bg-black hover:text-white text-black py-3 rounded-xl flex justify-center items-center gap-2 transition"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="w-14 rounded-xl  text-red-600 text-2xl flex justify-center items-center transition"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
