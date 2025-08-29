import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { role, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">Rôle connecté : <b>{role || "?"}</b></p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
