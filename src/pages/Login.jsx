import React, { useState } from "react";
import DoctorLogin from "./Doctor/DoctorLogin";
import DoctorRegister from "./Doctor/DoctorRegistration";
import VerifierLogin from "./Verifier/VerifierLogin";
import VerifierRegister from "./Verifier/VerifierRegistration";
import PatientLogin from "./Patient/PatientLogin";
import PatientRegister from "./Patient/PatientRegistration";
import AdminLogin from "./Admin/AdminLogin";
import AdminRegister from "./Admin/AdminRegistration";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

const Login = () => {
    const [role, setRole] = useState("doctor");
    const [authType, setAuthType] = useState("login");

    const renderAuthComponent = () => {
        if (role === "doctor") return authType === "login" ? <DoctorLogin /> : <DoctorRegister />;
        if (role === "verifier") return authType === "login" ? <VerifierLogin /> : <VerifierRegister />;
        if (role === "patient") return authType === "login" ? <PatientLogin /> : <PatientRegister />;
        if (role === "admin") return authType === "login" ? <AdminLogin /> : <AdminRegister />;
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-back p-6">
                {/* Left Panel: Role & Auth Selection */}
                <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 md:mr-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        {authType === "login" ? "Login to Your Account" : "Create a New Account"}
                    </h2>

                    {/* Toggle Buttons */}
                    <div className="flex justify-center space-x-3 mb-4">
                        <button
                            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${authType === "login"
                                ? "bg-primary text-white shadow-md"
                                : "bg-gray-200 text-gray-600 hover:bg-green-100"
                                }`}
                            onClick={() => setAuthType("login")}
                        >
                            Login
                        </button>
                        <button
                            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${authType === "register"
                                ? "bg-primary text-white shadow-md"
                                : "bg-gray-200 text-gray-600 hover:bg-green-100"
                                }`}
                            onClick={() => setAuthType("register")}
                        >
                            Register
                        </button>
                    </div>

                    {/* Dropdown for Role Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Select Role:</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="doctor">Doctor</option>
                            <option value="verifier">Verifier</option>
                            <option value="patient">Patient</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {/* Right Panel: Auth Form */}
                {renderAuthComponent()}
            </div>
            <Footer />
        </>
    );
};

export default Login;