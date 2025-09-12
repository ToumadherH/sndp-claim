// src/components/ReclamationsTableAssistant.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Reclamation {
  _id: string;
  type: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected" | "Closed";
  createDate: string;
  gerantId: { name: string }; // populate côté backend
}

interface Intervenant {
  _id: string;
  name: string;
}

interface Props {
  assistantId: string;
}

const statusColors: Record<Reclamation["status"], string> = {
  Pending: "bg-yellow-500 text-black",
  "In Progress": "bg-blue-500 text-white",
  Resolved: "bg-green-500 text-white",
  Rejected: "bg-red-500 text-white",
  Closed: "bg-gray-500 text-white",
};

const ReclamationsTableAssistant: React.FC<Props> = ({ assistantId }) => {
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [intervenants, setIntervenants] = useState<Intervenant[]>([]);
  const [selectedIntervenant, setSelectedIntervenant] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    fetchReclamations();
    fetchIntervenants();
  }, [assistantId]);

  const fetchReclamations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get<Reclamation[]>(
        `http://localhost:8000/api/reclamations/assistant/${assistantId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReclamations(res.data);
    } catch (error) {
      console.error("Error fetching reclamations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIntervenants = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<Intervenant[]>(
        "http://localhost:8000/api/intervenant/intervenants", // <-- ton endpoint à vérifier
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIntervenants(res.data);
    } catch (error) {
      console.error("Error fetching intervenants:", error);
    }
  };

  const handleAssign = async (reclamationId: string) => {
    try {
      const intervenantId = selectedIntervenant[reclamationId];
      if (!intervenantId) {
        alert("Please select an intervenant before assigning.");
        return;
      }

      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8000/api/reclamations/assign",
        { reclamationId, intervenantId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReclamations();
    } catch (error) {
      console.error("Error assigning reclamation:", error);
    }
  };

  if (loading) return <p className="text-gray-300">Loading reclamations...</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        Managers' Claims
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Gérant</th>
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
                <td className="px-4 py-3 text-gray-200">
                  {rec.gerantId?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-gray-200">{rec.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[rec.status]
                    }`}
                  >
                    {rec.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {new Date(rec.createDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 space-x-2">
                  {rec.status === "Pending" && (
                    <div className="flex items-center space-x-2">
                      <select
                        value={selectedIntervenant[rec._id] || ""}
                        onChange={(e) =>
                          setSelectedIntervenant((prev) => ({
                            ...prev,
                            [rec._id]: e.target.value,
                          }))
                        }
                        className="w-52 px-3 py-2 rounded-lg text-sm bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                      >
                        <option value="">-- Select Intervenant --</option>
                        {intervenants.map((int) => (
                          <option key={int._id} value={int._id}>
                            {int.name && int.name.trim() !== ""
                              ? int.name
                              : "Unnamed Intervenant"}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleAssign(rec._id)}
                        className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg text-sm"
                      >
                        Assign
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {reclamations.length === 0 && (
              <tr>
                <td
                  colSpan={5}
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

export default ReclamationsTableAssistant;
