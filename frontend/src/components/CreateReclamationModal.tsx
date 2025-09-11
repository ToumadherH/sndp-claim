// src/components/CreateReclamationModal.tsx
import React, { useState } from "react";
import axios from "axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void; // callback to refresh table after creating
}

const CreateReclamationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/reclamations",
        { type, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setType("");
      setDescription("");
      onCreated(); // refresh data
      onClose(); // close modal
    } catch (err) {
      console.error("Error creating reclamation:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">
          Create Reclamation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            >
              <option value="">-- Select a Type --</option>
              <option value="Fuel Shortage">Fuel Shortage</option>
              <option value="Pump Issue">Pump Issue</option>
              <option value="Cash Register Problem">
                Cash Register Problem
              </option>
              <option value="Electricity Failure">Electricity Failure</option>
              <option value="Maintenance Request">Maintenance Request</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition"
            >
              {loading ? "Saving..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReclamationModal;
