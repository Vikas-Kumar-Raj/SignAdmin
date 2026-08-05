import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaDownload, FaSearch } from "react-icons/fa";

import AdminLayout from "../layouts/AdminLayout";
import AddSignatureModal from "../components/Signatures/AddSignatureModal";

const Signatures = () => {
  const [signatures, setSignatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editSignature, setEditSignature] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 3;

  const fetchSignatures = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/signatures");

      setSignatures(response.data.signatures);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignatures();
  }, []);

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const currentSignatures = signatures.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(signatures.length / recordsPerPage);

  return (
    <AdminLayout>
      {/* Stats */}

      <div className="flex flex-row w-full  gap-6 mb-8">
        <div className="bg-white w-1/4 rounded-xl border p-4">
          <h3 className="text-gray-500 uppercase">Total Signatures</h3>

          <h1 className="text-3xl font-bold ">
            12,8{signatures.length}
            <span className="text-green-500 text-[13px] font-normal mt-4 ml-2 ">
              +12%
            </span>
          </h1>
        </div>

        <div className=" bg-white w-1/4 rounded-xl border p-4">
          <h3 className="text-gray-500 uppercase">Processing Rate</h3>

          <h1 className="flex text-3xl font-bold">
            93.
            {signatures.filter((item) => item.status === "Processing").length}%
            <span className="text-green-500 text-[13px] font-normal mt-4 ml-2 ">
              stable
            </span>
          </h1>
        </div>

        <div className="flex bg-zinc-800 w-1/2 rounded-xl border p-4 ">
          <div className="w-1/2">
            <h3 className="text-zinc-200 uppercase">DAILY GENRATION PEAK</h3>

            <h1 className="text-3xl font-bold text-white">2,104 / hr</h1>
          </div>
          <div className="w-1/2 flex items-end gap-2  ">
            <div className="bg-blue-900  w-6 h-5"></div>
            <div className="bg-blue-900  w-6 h-7"></div>
            <div className="bg-blue-800  w-6 h-4"></div>
            <div className="bg-blue-800  w-6 h-11"></div>
            <div className="bg-blue-700  w-6 h-14"></div>
            <div className="bg-blue-600  w-6 h-8"></div>
            <div className="bg-blue-600  w-6 h-9"></div>
          </div>
        </div>
      </div>

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
              setEditSignature(null);
              setOpenModal(true);
            }}
            className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800"
          >
            <FaPlus />
            Add Signature
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl border overflow-hidden mt-3">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">Signature</th>

              <th className="text-left px-6 py-4">Signature ID</th>

              <th className="text-left px-6 py-4">User</th>

              <th className="text-left px-6 py-4">Style</th>

              <th className="text-left px-6 py-4">Status</th>

              <th className="text-left px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : (
              currentSignatures.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{item.signatureName}</td>

                  <td className="px-6 py-4">{item.signatureId}</td>

                  <td className="px-6 py-4">{item.user}</td>

                  <td className="px-6 py-4">{item.style}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs
                ${
                  item.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : item.status === "Processing"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setEditSignature(item);
                          setOpenModal(true);
                        }}
                        className="text-blue-600 cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          if (!window.confirm("Delete Signature?")) return;

                          await axios.delete(
                            `http://localhost:5000/api/signatures/${item._id}`,
                          );

                          fetchSignatures();
                        }}
                        className="text-red-600 cursor-pointer"
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
      

      {/* Pagination */}

      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-500 text-sm">
          Showing {firstIndex + 1} -{Math.min(lastIndex, signatures.length)} of{" "}
          {signatures.length} Signatures
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Table Next Part */}

      <AddSignatureModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditSignature(null);
        }}
        fetchSignatures={fetchSignatures}
        editSignature={editSignature}
      />
    </AdminLayout>
  );
};

export default Signatures;
