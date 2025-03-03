// import img1 from '../images/stath.jpg';
// import css from '../images/patientreg.css';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from 'axios';
import { Link, useNavigate } from "react-router-dom";

function AdminRegistration() {
  const [loading, setLoading] = useState(false);
  const [admindetails, setdetails] = useState({
    name: "", email: "", password: "",
  })
  const { name, email, password } = admindetails;
  const handleInput = (e) => {
    setdetails({ ...admindetails, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();
  function navigator() {

    navigate('/adminlogin', { replace: true });
  }
  const submit = async e => {
    if (admindetails.name == "" || admindetails.email == "" || admindetails.password == "") {
      toast.error("Fill info first");
    }
    else {
      console.log("submit call");
      e.preventDefault();
      setLoading(true);
      await axios.post("https://doc-appointment-node-backend.onrender.com/adminreg", admindetails).then((res) => {
        //console.log(res);
        if (res.data.message === "ok") {
          toast.success("registration Successful");
          toast.info("Admin added successfully");

          var i = 0;
          var count = 0;
          for (i = 0; i < 100000; i++) {
            count = count + 1;
          }
          if (count > 1000) {
            window.location.reload();
          }
          setLoading(false);
        }
        if (res.data.message === "error") {
          toast.error("Something went wrong");
          setLoading(false);
        }
        if (res.data.message === "Exists") {
          toast.error("User already exist on this email");
          setLoading(false);
        }


      });
    }
  }





  return (
    <div className="flex items-center justify-center min-h-screen bg-back">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Registration</h2>
        <p className="text-center text-gray-500 mb-6">Fill in the details below to register.</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={admindetails.name}
              onChange={handleInput}
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your name"
              required
            />
          </div>

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
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
export default AdminRegistration;