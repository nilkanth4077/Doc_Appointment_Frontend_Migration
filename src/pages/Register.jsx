import Navigation from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Register() {
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
            navigate('/login', { replace: true });
        }, 1100);

    }

    const handleSubmit = async e => {
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
            <Navigation />
            <div className="flex items-center justify-center px-4 lg:px-8 py-4 bg-back">
                <div className="w-full max-w-3xl p-6 drop-shadow rounded-md">
                    <h2 className="text-center text-2xl font-bold tracking-tight text-white">
                        Sign up your account
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-white">
                                    Full Name
                                </label>
                                <input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => handleInput(e)}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm/6"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-white">
                                    Phone Number
                                </label>
                                <input
                                    id="phonenumber"
                                    name="phonenumber"
                                    type="text"
                                    value={phonenumber}
                                    onChange={(e) => handleInput(e)}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => handleInput(e)}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm/6"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => handleInput(e)}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm/6"
                            />
                        </div>

                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-white">
                                Confirm Password
                            </label>
                            <input
                                id="confirmpassword"
                                name="confirmpassword"
                                type="password"
                                value={confirmpassword}
                                onChange={(e) => handleInput(e)}
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm/6"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-primary px-4 py-2 text-white font-semibold shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 sm:text-sm"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already a member?{" "}
                        <a href="/login" className="font-semibold text-primary hover:text-secondary">
                            Login Here
                        </a>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}