// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage"; 
import GerantDashboard from "./pages/GerantDashboard";


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for login page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard-gerant" element={<GerantDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
