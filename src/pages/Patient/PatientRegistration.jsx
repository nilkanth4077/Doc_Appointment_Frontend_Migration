import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from 'axios';
import { Link, useNavigate } from "react-router-dom";


function PatientRegistration() {
  const [loading, setLoading] = useState(false);
  const [patientdetails, setdetails] = useState({
    fullname: "", phonenumber: "", email: "", password: "", confirmpassword: "",
  })
  const { fullname, phonenumber, email, password, confirmpassword } = patientdetails;
  const handleInput = (e) => {
    setdetails({ ...patientdetails, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();
  function navigator() {
    setTimeout(() => {
      navigate('/patientlogin', { replace: true });
    }, 1100);

  }
  const submit = async e => {
    if (patientdetails.fullname == "" || patientdetails.phonenumber == "" || patientdetails.email == "" || patientdetails.password == "" || patientdetails.confirmpassword == "") {
      toast.error("Fill up details !");
    }
    else {
      e.preventDefault();
      if (patientdetails.password === patientdetails.confirmpassword) {
        await axios.post("https://doc-appointment-node-backend.onrender.com/register", patientdetails).then((res) => {
          //console.log(res);
          if (res.data.message === "ok") {
            toast.success("Registration Successful");
            navigator();

          }
          if (res.data.message === "error") {
            toast.error("Something went wrong");
          }
          if (res.data.message === "Exists") {
            toast.error("User already exist on this email");
          }


        });
      }
      else {
        toast.error("Password doesn't match with Confirpassword");
      }

    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-back">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Patient Registration</h2>
          <p className="text-center text-gray-500 mb-6">Fill in the details below to register.</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={patientdetails.name}
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
                value={patientdetails.email}
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
                value={patientdetails.password}
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
    </>
  )
}

export default PatientRegistration;