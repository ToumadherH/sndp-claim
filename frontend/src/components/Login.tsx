import React, { useState } from "react";
import logoAgil from "../assets/logoagil.png";
import bg from "../assets/agil1.jpg";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    // Save token + role in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    alert("Login successful!");

    // Redirect based on role
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-colors"
                    placeholder="you@gmail.com"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-colors"
                    placeholder="••••••"
                  />
                </div>
              </div>

              {/* Remember me checkbox */}
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
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
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

          {/* Additional info */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-700">
              Need help? Contact our support team at
              <a
                href="mailto:support@sndp.com"
                className="text-yellow-700 font-medium"
              >
                {" "}
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
