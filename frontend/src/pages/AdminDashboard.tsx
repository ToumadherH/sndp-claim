// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import logoAgil from "../assets/logoagil.png";

interface User {
  _id: string;
  email: string;
  role: string;
  name?: string;
  stationId?: string;
  assistantId?: string;
}

interface Reclamation {
  _id: string;
  type: string;
  status: string;
  gerantId?: { name?: string; email: string; stationId?: string };
  createDate?: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [assistants, setAssistants] = useState<User[]>([]);
  const [reclamations, setReclamations] = useState<Reclamation[]>([]);
  const [loading, setLoading] = useState(true);

  const [showUsers, setShowUsers] = useState(true);
  const [showReclamations, setShowReclamations] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showStationForm, setShowStationForm] = useState(false);
  const [showAssistantForm, setShowAssistantForm] = useState(false);

  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "" });
  const [selectedGerantId, setSelectedGerantId] = useState("");
  const [newStationId, setNewStationId] = useState("");
  const [newAssistantId, setNewAssistantId] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const usersRes = await axios.get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(usersRes.data);
      setAssistants(usersRes.data.filter((u: User) => u.role === "Assistant"));

      const recRes = await axios.get("http://localhost:8000/api/reclamations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReclamations(recRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/users", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //alert("User created successfully!");
      setNewUser({ name: "", email: "", password: "", role: "" });
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Error creating user");
    }
  };

  const handleChangeStation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8000/api/admin/change-station",
        { gerantId: selectedGerantId, newStationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //alert("Station updated successfully!");
      setSelectedGerantId("");
      setNewStationId("");
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Error updating station");
    }
  };

  const handleChangeAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8000/api/admin/change-assistant",
        { gerantId: selectedGerantId, newAssistantId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //alert("Assistant updated successfully!");
      setSelectedGerantId("");
      setNewAssistantId("");
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || "Error updating assistant");
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-700 text-white flex flex-col">
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log Out
        </button>
      </header>

      <main className="flex-1 p-6">
        <h1 className="text-5xl font-bold">Admin Dashboard</h1>
        <p className="mt-3 text-gray-400">Welcome back, Admin!</p>
        <br />

        {/* USERS */}
        <section>
          <button
            className="w-full flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg shadow hover:bg-gray-700 transition"
            onClick={() => setShowUsers(!showUsers)}
          >
            <span className="text-xl font-semibold">All Users</span>
            <span>{showUsers ? "▲" : "▼"}</span>
          </button>
          {showUsers && (
            <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow mt-3">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-3 text-left">User ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Station ID</th>
                  <th className="p-3 text-left">Assistant</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-gray-700">
                    <td className="p-3 font-mono text-sm">{u._id}</td>
                    <td className="p-3">{u.name || "-"}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">{u.stationId || "-"}</td>
                    <td className="p-3">
                      {u.assistantId
                        ? assistants.find((a) => a._id === u.assistantId)?.name || "-"
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <br />

        {/* RECLAMATIONS */}
        <section>
          <button
            className="w-full flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg shadow hover:bg-gray-700 transition"
            onClick={() => setShowReclamations(!showReclamations)}
          >
            <span className="text-xl font-semibold">All Reclamations</span>
            <span>{showReclamations ? "▲" : "▼"}</span>
          </button>
          {showReclamations && (
            <table className="w-full bg-gray-800 rounded-lg overflow-hidden shadow mt-3">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Gerant</th>
                  <th className="p-3 text-left">Station</th>
                  <th className="p-3 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {reclamations.map((r) => (
                  <tr key={r._id} className="border-t border-gray-700">
                    <td className="p-3">{r.type}</td>
                    <td className="p-3">{r.status}</td>
                    <td className="p-3">{r.gerantId?.name || r.gerantId?.email}</td>
                    <td className="p-3">{r.gerantId?.stationId || "-"}</td>
                    <td className="p-3">
                      {r.createDate ? new Date(r.createDate).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <br />

        {/* ADD USER */}
        <section>
          <button
            className="w-full flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg shadow hover:bg-gray-700 transition"
            onClick={() => setShowAddUser(!showAddUser)}
          >
            <span className="text-xl font-semibold">Add User</span>
            <span>{showAddUser ? "▲" : "▼"}</span>
          </button>
          {showAddUser && (
            <form
              onSubmit={handleCreateUser}
              className="bg-gray-800 p-6 rounded-lg shadow mt-3 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-2 rounded text-black"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2 rounded text-black"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full p-2 rounded text-black"
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-2 rounded text-black"
                >
                  <option value="">Select Role</option>
                  <option value="Gerant">Gerant</option>
                  <option value="Intervenant">Intervenant</option>
                  <option value="Assistant">Assistant</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button className="bg-yellow-500 px-6 py-2 rounded font-bold hover:bg-yellow-600 transition">
                Create User
              </button>
            </form>
          )}
        </section>

        <br />

        {/* CHANGE STATION */}
        <section>
          <button
            className="w-full flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg shadow hover:bg-gray-700 transition"
            onClick={() => setShowStationForm(!showStationForm)}
          >
            <span className="text-xl font-semibold">Change Gerant Station</span>
            <span>{showStationForm ? "▲" : "▼"}</span>
          </button>
          {showStationForm && (
            <form
              onSubmit={handleChangeStation}
              className="bg-gray-800 p-6 rounded-lg shadow mt-3 space-y-4"
            >
              <input
                type="text"
                placeholder="Gerant ID"
                value={selectedGerantId}
                onChange={(e) => setSelectedGerantId(e.target.value)}
                className="w-full p-2 rounded text-black"
              />
              <input
                type="text"
                placeholder="New Station ID"
                value={newStationId}
                onChange={(e) => setNewStationId(e.target.value)}
                className="w-full p-2 rounded text-black"
              />
              <button className="bg-yellow-500 px-6 py-2 rounded font-bold hover:bg-yellow-600 transition">
                Update Station
              </button>
            </form>
          )}
        </section>

        <br />

        {/* CHANGE ASSISTANT */}
        <section>
          <button
            className="w-full flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg shadow hover:bg-gray-700 transition"
            onClick={() => setShowAssistantForm(!showAssistantForm)}
          >
            <span className="text-xl font-semibold">Change Gerant Assistant</span>
            <span>{showAssistantForm ? "▲" : "▼"}</span>
          </button>
          {showAssistantForm && (
            <form
              onSubmit={handleChangeAssistant}
              className="bg-gray-800 p-6 rounded-lg shadow mt-3 space-y-4"
            >
              <input
                type="text"
                placeholder="Gerant ID"
                value={selectedGerantId}
                onChange={(e) => setSelectedGerantId(e.target.value)}
                className="w-full p-2 rounded text-black"
              />
              <select
                value={newAssistantId}
                onChange={(e) => setNewAssistantId(e.target.value)}
                className="w-full p-2 rounded text-black"
              >
                <option value="">Select Assistant</option>
                {assistants.map((a) => (
                  <option key={a._id} value={a._id}>{a.name}</option>
                ))}
              </select>
              <button className="bg-yellow-500 px-6 py-2 rounded font-bold hover:bg-yellow-600 transition">
                Update Assistant
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
