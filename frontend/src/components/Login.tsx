import React, { useState } from "react";
import logoAgil from "../assets/logoagil.png";
import bg from "../assets/agil1.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ import navigation hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      switch (role) {
        case "Gerant":
          window.location.href = "/dashboard-gerant";
          break;
        case "Intervenant":
          window.location.href = "/dashboard-intervenant";
          break;
        case "Assistant":
          window.location.href = "/dashboard-assistant";
          break;
        case "Admin":
          window.location.href = "/dashboard-admin";
          break;
        default:
          alert("Unknown role, please contact support.");
          break;
      }
    } catch (err: any) {
      alert(err.response?.data?.error || "Invalid credentials. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-yellow-400 to-gray-900">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and slogan */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center space-x-3">
              <img src={logoAgil} alt="SNDP Logo" className="w-12" />
            </div>
            <p className="text-black-700 mt-3 font-bold">
              Claim Management Portal
            </p>
          </div>

          {/* Login card */}
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 border border-white border-opacity-20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Sign in to your account
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email field */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-3 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-colors"
                  placeholder="you@gmail.com"
                />
              </div>

              {/* Password field */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-3 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-colors"
                  placeholder="••••••"
                />
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-700 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-bold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mb-4 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              {/* Go Back button */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full bg-gray-300 text-gray-900 py-3 px-4 rounded-lg font-bold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4 transition-all duration-300"
              >
                Go Back
              </button>

              {/* Forgot password */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-yellow-700 transition-colors"
                >
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>

          {/* Support */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-700">
              Need help? Contact our support team at{" "}
              <a
                href="mailto:support@sndp.com"
                className="text-yellow-700 font-medium"
              >
                boc@agil.com.tn
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="hidden lg:block w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
