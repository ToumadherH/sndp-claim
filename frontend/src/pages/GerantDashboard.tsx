import React, { useEffect, useState } from "react";
import logoAgil from "../assets/logoagil.png";
import axios from "axios";
import CreateReclamationModal from "../components/CreateReclamationModal";
import ReclamationsTable from "../components/ReclamationsTable";

interface GerantProfile {
  name: string;
  stationId: string;
}

const GerantDashboard: React.FC = () => {
  const [profile, setProfile] = useState<GerantProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/gerant/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch gerant profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleReclamationCreated = () => {
    // bump key to re-render ReclamationsTable and trigger fetch
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-700 text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-600 shadow">
        <div className="text-xl font-bold">
          <img src={logoAgil} alt="SNDP Logo" className="w-12" />
        </div>
         <button
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Log Out
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 p-6">
        <h1 className="text-5xl font-bold">Manager Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Welcome back {" "}
          <span className="font-semibold">{profile?.name || "Loading..."}</span>
        </p>
        <p className="mt-1 text-gray-400">
          Station ID: <span className="font-semibold">{profile?.stationId}</span>
        </p>
        <ReclamationsTable key={refreshKey}/>
        {/* Create Reclamation Button */}
        <div className="mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            + Create Reclamation
          </button>
        </div>
      </main>
      
      {/* Modal */}
      <CreateReclamationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={handleReclamationCreated}
      />
    </div>
  );
};

export default GerantDashboard;
