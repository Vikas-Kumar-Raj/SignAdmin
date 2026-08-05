import { useEffect, useState } from "react";
import axios from "axios";
import { FaShieldAlt } from "react-icons/fa";

import AdminLayout from "../layouts/AdminLayout";

const Settings = () => {
  const [settings, setSettings] = useState({
    welcomeCredits: 50,
    creditsPerSignature: 15,
    multiplier: 1.5,
  });

  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/settings");

      setSettings(data.setting);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const saveSettings = async () => {
    try {
      setLoading(true);

      await axios.put("http://localhost:5000/api/settings", settings);

      alert("Settings Saved Successfully");
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-zinc-50 ">
        {/* Header */}

        <div className=" flex justify-between items-start mb-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              System Configuration
            </h1>

            <p className="text-gray-500 mt-1 max-w-2xl">
              Manage the core economic parameters, subscription plans, and
              global interface preferences for the entire ecosystem.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={fetchSettings}
              className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition "
            >
              Discard <br /> Changes
            </button>

            <button
              onClick={saveSettings}
              className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition"
            >
              {loading ? "Saving..." : "Save All Settings"}
            </button>
          </div>
        </div>

        {/* Form */}

        <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-4">
          {/* Welcome Bonus Credits */}

          <div>
            <label className="font-semibold block ">Global Credits</label>
            <p className="text-sm text-gray-500 mb-1">Welcome Bonus Credits.</p>

            <div className="relative">
              <input
                type="number"
                name="welcomeCredits"
                value={settings.welcomeCredits}
                onChange={handleChange}
                className="w-full border rounded-xl px-1 py-1 pl-5 pr-16 outline-none focus:border-blue-600"
              />

              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                CR
              </span>
            </div>
          </div>

          {/* Credits Per Signature */}

          <div>
            <label className="font-semibold block mb-1 mt-3">
              Credits Per Signature
            </label>

            <div className="relative">
              <input
                type="number"
                name="creditsPerSignature"
                value={settings.creditsPerSignature}
                onChange={handleChange}
                className="w-full border rounded-xl px-1 py-1 pl-5 pr-16 outline-none focus:border-blue-600"
              />

              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                CR
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Credits deducted after every generated signature.
            </p>
          </div>

          {/* Active Multiplier */}
          <div className="flex justify-between border-2 rounded-sm mt-3 p-2 pr-4 pl-4">
            <div>
              <label className="font-semibold block mb-1">
                Active Multiplier
              </label>
            </div>
            <div className="bg-black text-white rounded-3xl px-1 text-sm flex justify-center items-center">
              1.2xHOLIDAY 
            </div>
          </div>
         
          {/*Card */}


          <div className="mt-6 bg-[#1B2234] rounded-2xl p-6 flex items-start gap-5">
            {/* Icon */}

            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
              <FaShieldAlt className="text-white text-lg" />
            </div>

            {/* Text */}

            <div>
              <h2 className="text-lg font-semibold text-white">
                Advanced Encryption Standard (AES-256) is active.
              </h2>

              <p className="text-gray-400 mt-2 leading-6">
                All changes to global credit systems and plan pricing are logged
                with biometric verification requirements for downstream
                implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
