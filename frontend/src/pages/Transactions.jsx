import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaPlus, FaDownload } from "react-icons/fa";

import { saveAs } from "file-saver";
import AdminLayout from "../layouts/AdminLayout";
import RevenueChart from "../components/transactions/RevenueChart";
import PlanDistribution from "../components/transactions/PlanDistribution";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import Pagination from "../components/transactions/Pagination";
import { IoMdPhotos } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { AiOutlineCalculator } from "react-icons/ai";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions",
      );

      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((item) => {
    return (
      item.orderId.toLowerCase().includes(search.toLowerCase()) ||
      item.userName.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const currentTransactions = filteredTransactions.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);

  const totalRevenue = transactions.reduce(
    (total, item) => total + item.amount,
    0,
  );

  const averageOrder =
    transactions.length > 0
      ? Math.round(totalRevenue / transactions.length)
      : 0;

  const exportCSV = () => {
    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Plan",
      "Amount",
      "Payment",
      "Status",
      "Date",
    ];

    const rows = filteredTransactions.map((item) => [
      item.orderId,
      item.userName,
      item.email,
      item.plan,
      item.amount,
      item.paymentMethod,
      item.status,
      new Date(item.transactionDate).toLocaleDateString("en-IN"),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "transactions.csv");
  };

  return (
    <AdminLayout>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Finaclal Overview</h1>

          <p className="text-gray-500 mt-2">
            Real-time revenue and growth indicator.
          </p>
        </div>

        <div className="relative w-96">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Transactions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-50 pl-11 pr-4 py-3 focus:outline-none "
          />
        </div>

        <button
          onClick={() => {
            setEditTransaction(null);
            setOpenModal(true);
          }}
          className="bg-zinc-800 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
        >
          <FaPlus />
          Add Transaction
        </button>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 uppercase">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">totel revenue</p>

              <h2 className="text-3xl font-bold mt-2">
                $ {totalRevenue.toLocaleString()}
              </h2>
            </div>
            <div
              className={`w-14 h-14 text-4xl rounded-full flex items-center justify-center`}
            >
              <IoMdPhotos />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Transactions</p>

              <h2 className="text-3xl font-bold mt-2">{transactions.length}</h2>
            </div>
            <div
              className={`w-14 h-14 text-4xl rounded-full flex items-center justify-center`}
            >
              <MdCalendarMonth/>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Average Order value</p>

              <h2 className="text-3xl font-bold mt-2">$ {averageOrder}</h2>
            </div>
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-4xl`}
            >
              <AiOutlineCalculator/>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}

      <div className="bg-white rounded-xl border overflow-x-auto shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">Order ID</th>

              <th className="text-left px-6 py-4">Customer</th>

              <th className="text-left px-6 py-4">Plan</th>

              <th className="text-left px-6 py-4">Amount</th>

              <th className="text-left px-6 py-4">Payment</th>

              <th className="text-left px-6 py-4">Status</th>

              <th className="text-left px-6 py-4">Date</th>

              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : currentTransactions.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-500">
                  No Transactions Found
                </td>
              </tr>
            ) : (
              currentTransactions.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{item.orderId}</td>

                  <td className="px-6 py-4">
                    <h3 className="font-semibold">{item.userName}</h3>

                    <p className="text-sm text-gray-500">{item.email}</p>
                  </td>

                  <td className="px-6 py-4">{item.plan}</td>

                  <td className="px-6 py-4 font-semibold">₹ {item.amount}</td>

                  <td className="px-6 py-4">{item.paymentMethod}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        item.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(item.transactionDate).toLocaleDateString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditTransaction(item);
                          setOpenModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          const ok = window.confirm("Delete this transaction?");

                          if (!ok) return;

                          try {
                            await axios.delete(
                              `http://localhost:5000/api/transactions/${item._id}`,
                            );

                            alert("Transaction Deleted Successfully");

                            fetchTransactions();
                          } catch (error) {
                            alert(
                              error.response?.data?.message || "Delete failed.",
                            );
                          }
                        }}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RevenueChart transactions={transactions} />

        <PlanDistribution transactions={transactions} />
      </div>

      {/* Add / Edit Modal */}

      <AddTransactionModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditTransaction(null);
        }}
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
      />
    </AdminLayout>
  );
};

export default Transactions;
