import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Notifications: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8000/api/assistant/alerts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlerts(res.data.alerts);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (alertId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8000/api/alerts/read",
        { alertId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlerts((prev) =>
        prev.map((a) => (a._id === alertId ? { ...a, read: true } : a))
      );
    } catch (err) {
      console.error("Error marking alert as read:", err);
    }
  };

  const toggleOpen = async () => {
    setOpen(!open);

    if (!open) {
      // Mark all unread alerts as read locally first
      setAlerts((prev) =>
        prev.map((a) => (!a.read ? { ...a, read: true } : a))
      );

      // Then update backend asynchronously
      alerts.filter((a) => !a.read).forEach((a) => markAsRead(a._id));
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div ref={ref} className="relative flex flex-col items-end mt-4">
      <button
        onClick={toggleOpen}
        className="relative p-4 bg-gray-500 rounded-full hover:bg-gray-600 transform transition duration-300 hover:scale-110 text-3xl"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-lg">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-800 text-white rounded-xl shadow-xl p-4 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-yellow-400">Alerts</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white font-bold text-xl"
            >
              ✕
            </button>
          </div>
          {alerts.length === 0 ? (
            <p className="text-gray-300 italic">No alerts</p>
          ) : (
            <ul className="space-y-2 max-h-72 overflow-y-auto">
              {alerts.map((alert) => (
                <li
                  key={alert._id}
                  className={`p-3 rounded-lg shadow-sm transition ${
                    !alert.read
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {`${alert.gerantId?.name || "Unknown gerant"} has created ${
                    alert.count
                  } reclamations of type "${alert.type}"`}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
