import React, { useEffect, useState } from "react";
import axios from "axios";

interface Reclamation {
  _id: string;
  type: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected" | "Closed";
  createDate: string;
}

const statusColors: Record<Reclamation["status"], string> = {
  Pending: "bg-yellow-500 text-black",
  "In Progress": "bg-blue-500 text-white",
  Resolved: "bg-green-500 text-white",
  Rejected: "bg-red-500 text-white",
  Closed: "bg-gray-500 text-white",
};

const ReclamationsTable: React.FC = () => {
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchReclamations();
  }, []);

  const fetchReclamations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get<Reclamation[]>(
        "http://localhost:8000/api/gerant/my-reclamations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReclamations(res.data);
    } catch (error) {
      console.error("Error fetching reclamations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8000/api/gerant/confirm",
        { reclamationId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReclamations();
    } catch (error) {
      console.error("Error confirming reclamation:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8000/api/gerant/reject",
        { reclamationId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReclamations();
    } catch (error) {
      console.error("Error rejecting reclamation:", error);
    }
  };

  if (loading) return <p className="mt-4 text-gray-300">Loading reclamations...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        Mes Réclamations
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reclamations.map((rec) => (
              <tr
                key={rec._id}
                className="border-t border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="px-4 py-3 text-gray-200">{rec.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[rec.status]}`}
                  >
                    {rec.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {new Date(rec.createDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 space-x-2">
                  {rec.status === "Pending" && (
                    <button
                      onClick={() => handleReject(rec._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                    >
                      Reject
                    </button>
                  )}
                  {rec.status === "Resolved" && (
                    <button
                      onClick={() => handleConfirm(rec._id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                    >
                      Confirm
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {reclamations.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-4 text-gray-400 italic"
                >
                  No reclamations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReclamationsTable;
