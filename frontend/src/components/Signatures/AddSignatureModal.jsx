import { useEffect, useState } from "react";
import axios from "axios";

const AddSignatureModal = ({
  open,
  onClose,
  fetchSignatures,
  editSignature,
}) => {
  const initialState = {
    signatureName: "",
    signatureId: "",
    user: "",
    style: "Signature",
    status: "Processing",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editSignature) {
      setFormData({
        signatureName: editSignature.signatureName,
        signatureId: editSignature.signatureId,
        user: editSignature.user,
        style: editSignature.style,
        status: editSignature.status,
      });
    } else {
      setFormData(initialState);
    }
  }, [editSignature]);

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

      if (editSignature) {
        await axios.put(
          `http://localhost:5000/api/signatures/${editSignature._id}`,
          formData,
        );

        alert("Signature Updated");
      } else {
        await axios.post("http://localhost:5000/api/signatures", formData);

        alert("Signature Added");
      }

      fetchSignatures();

      onClose();

      setFormData(initialState);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editSignature ? "Edit Signature" : "Add Signature"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="signatureName"
            placeholder="Signature Name"
            value={formData.signatureName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            name="signatureId"
            placeholder="Signature ID"
            value={formData.signatureId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            name="user"
            placeholder="User Name"
            value={formData.user}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <select
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="Autograph">Autograph</option>
            <option value="Signature">Signature</option>
            <option value="Handwriting">Handwriting</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Failed">Failed</option>
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
              {loading ? "Saving..." : editSignature ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSignatureModal;
