// src/components/ReclamationsTableIntervenant.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Reclamation {
  _id: string;
  type: string;
  status: "Pending" | "In progress" | "Resolved" | "Rejected" | "Closed";
  createDate: string;
  gerantId: {
    name?: string;
    email?: string;
    stationId?: string;
  };
}

const statusColors: Record<Reclamation["status"], string> = {
  Pending: "bg-yellow-500 text-black",
  "In progress": "bg-blue-500 text-white",
  Resolved: "bg-green-500 text-white",
  Rejected: "bg-red-500 text-white",
  Closed: "bg-gray-500 text-white",
};

const ReclamationsTableIntervenant: React.FC = () => {
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReclamations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/intervenant/my-reclamations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReclamations(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markResolved = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8000/api/intervenant/update-status",
        { reclamationId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReclamations();
    } catch (error: any) {
      alert(error.response?.data?.error || "Error updating status");
    }
  };

  useEffect(() => {
    fetchReclamations();
  }, []);

  if (loading) return <p className="text-gray-300">Loading reclamations...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        My Reclamations
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Gérant</th>
              <th className="px-4 py-3 text-left">Station</th>
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
                <td className="px-4 py-3">{rec.gerantId?.name || "N/A"}</td>
                <td className="px-4 py-3">{rec.gerantId?.stationId || "N/A"}</td>
                <td className="px-4 py-3">{rec.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[rec.status]}`}
                  >
                    {rec.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(rec.createDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {rec.status === "In progress" && (
                    <button
                      onClick={() => markResolved(rec._id)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded-lg text-sm"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {reclamations.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 text-gray-400 italic"
                >
                  No reclamations assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReclamationsTableIntervenant;
