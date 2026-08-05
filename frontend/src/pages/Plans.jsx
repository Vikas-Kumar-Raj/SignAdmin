import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaSearch } from "react-icons/fa";

import AdminLayout from "../layouts/AdminLayout";
import PlanCard from "../components/Plans/PlanCard";
import AddPlanModal from "../components/Plans/AddPlanModal";
import PlanSlider from "../components/Plans/PlanSlider";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  const [search, setSearch] = useState("");

  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/plans");

      setPlans(response.data.plans);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter((plan) =>
    plan.planName.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPlans = plans.length;

  const activeUsers = plans.reduce((total, item) => total + item.users, 0);

  const revenueForecast = plans.reduce(
    (total, item) => total + item.revenueForecast,
    0,
  );

  return (
    <AdminLayout>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Subscription Plans</h1>

          <p className="text-gray-500 mt-2">
            Configure service tiers, credit allocation, <br /> and pricing
            strututes for the enterprise signature platform.
          </p>
        </div>

        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Plans..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-50 pl-11 pr-4 py-3 outline-none"
          />
        </div>

        <div>
          <button
            onClick={() => {
              setEditPlan(null);
              setOpenModal(true);
            }}
            className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800"
          >
            <FaPlus />
            Add New Plan
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="flex flex-row  gap-6 mb-8">
        <div className="w-1/4 bg-white rounded-xl border p-3 pl-6">
          <p className="text-gray-500 text-sm">TOTAL PLANS</p>

          <h2 className="text-3xl font-bold mt-2">{totalPlans}</h2>
          <div className="text-blue-500">+2% this month</div>
        </div>

        <div className="w-1/4 bg-white rounded-xl border p-3 pl-6">
          <p className="text-gray-500 text-sm">ACTIVE USERS</p>

          <h2 className="text-3xl font-bold mt-2">
            {activeUsers.toLocaleString()}
          </h2>
          <div className="text-gray-700">Across all Tiers</div>
        </div>

        <div className="w-1/2 bg-white rounded-xl border p-3 pl-6">
          <div>
            <p className="text-gray-500 text-sm">REVENUE FORECAST</p>
            <div className="flex justify-between items-center">
              <h2 className=" text-3xl font-bold mt-2">
                ₹ {revenueForecast.toLocaleString()}
              </h2>
              <div className=" flex w-70 h-2 bg-zinc-300 rounded-2xl ">
                <div className="w-2/3 bg-black rounded-2xl"></div>
                
              </div>
            </div>
            <div className="text-gray-700">
              72% of quarterly target rreached
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}

      {loading ? (
        <div className="bg-white rounded-xl border p-10 text-center">
          Loading Plans...
        </div>
      ) : filteredPlans.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
          No Plans Found
        </div>
      ) : (
        <PlanSlider
          plans={filteredPlans}
          fetchPlans={fetchPlans}
          setEditPlan={setEditPlan}
          setOpenModal={setOpenModal}
        />
      )}

      {/* Add / Edit Modal */}

      <AddPlanModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditPlan(null);
        }}
        fetchPlans={fetchPlans}
        editPlan={editPlan}
      />
    </AdminLayout>
  );
};

export default Plans;
