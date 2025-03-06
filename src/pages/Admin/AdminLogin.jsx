import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [admindetails, setDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setDetails({ ...admindetails, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!admindetails.email || !admindetails.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://doc-appointment-node-backend.onrender.com/adminlogin",
        admindetails
      );

      if (res.data.message === "ok") {
        localStorage.setItem("admintoken", res.data.token);
        toast.success("Login Successful!");
        setTimeout(() => navigate("/admin-dashboard"), 1200);
      } else if (res.data.message === "don'tmatch") {
        toast.error("Incorrect email or password.");
      } else if (res.data.message === "error") {
        toast.error("User does not exist.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-back">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Login</h2>
          <p className="text-center text-gray-500 mb-6">Fill in the details below to Login.</p>

          <form onSubmit={submit} className="space-y-4">

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={admindetails.email}
                onChange={handleInput}
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={admindetails.password}
                onChange={handleInput}
                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full mt-4 py-3 rounded-lg text-white font-semibold transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-secondary"
                }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                  Logging In...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AdminLogin;