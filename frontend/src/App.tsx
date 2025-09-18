// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"; 
import GerantDashboard from "./pages/GerantDashboard";
import AssistantDashboard from "./pages/AssistantDashboard";
import IntervenantDashboard from "./pages/IntervenantDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard-gerant" element={<GerantDashboard/>}/>
        <Route path="/dashboard-assistant" element={<AssistantDashboard/>}/>
        <Route path="/dashboard-intervenant" element={<IntervenantDashboard/>}/>
        <Route path="/dashboard-admin" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
