import { useEffect, useState } from "react";
import axios from "axios";

const AddTransactionModal = ({
  open,
  onClose,
  fetchTransactions,
  editTransaction,
}) => {

  const initialState = {
    orderId: "",
    userName: "",
    email: "",
    plan: "Standard",
    amount: "",
    status: "Pending",
    paymentMethod: "UPI",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        orderId: editTransaction.orderId,
        userName: editTransaction.userName,
        email: editTransaction.email,
        plan: editTransaction.plan,
        amount: editTransaction.amount,
        status: editTransaction.status,
        paymentMethod: editTransaction.paymentMethod,
      });
    } else {
      setFormData(initialState);
    }
  }, [editTransaction]);

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

      if (editTransaction) {

        await axios.put(
          `http://localhost:5000/api/transactions/${editTransaction._id}`,
          formData
        );

        alert("Transaction Updated Successfully");

      } else {

        await axios.post(
          "http://localhost:5000/api/transactions",
          formData
        );

        alert("Transaction Added Successfully");

      }

      fetchTransactions();

      onClose();

      setFormData(initialState);

    } catch (error) {

      alert(
        error.response?.data?.message || "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-xl rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-6">

          {editTransaction ? "Edit Transaction" : "Add Transaction"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="orderId"
            placeholder="Order ID"
            value={formData.orderId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            name="userName"
            placeholder="Customer Name"
            value={formData.userName}
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

          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>Enterprise Elite</option>
            <option>Professional</option>
            <option>Standard</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>Success</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>UPI</option>
            <option>Card</option>
            <option>Net Banking</option>
            <option>Cash</option>
          </select>

          <div className="flex justify-end gap-3">

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
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              {loading
                ? "Saving..."
                : editTransaction
                ? "Update"
                : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddTransactionModal;