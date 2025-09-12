// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"; 
import GerantDashboard from "./pages/GerantDashboard";
import AssistantDashboard from "./pages/AssistantDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for login page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard-gerant" element={<GerantDashboard/>}/>
        <Route path="/dashboard-assistant" element={<AssistantDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
