import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import axios, { isCancel, AxiosError } from 'axios';
import { Link, useNavigate } from "react-router-dom";

const DoctorRegistration = () => {
  const [loading, setloder] = useState(false);
  //let filedetails:{email:"",file:""}
  const [docdetails, setdetails] = useState({
    fullname: "", phonenumber: "", email: "", password: "", specialty: "", filedoc: { name: "", size: "", type: "" },
  })
  const { fullname, phonenumber, email, password, specialty, filedoc } = docdetails;
  const handleInput = (e) => {
    setdetails({ ...docdetails, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate();
  function navigator() {

    navigate('/docreg', { replace: true });
  }
  const [file, setfile] = useState();
  const handleFile = (e) => {
    setfile(e.target.files[0]);


  }
  const submit = async e => {
    if (docdetails.fullname == "" || docdetails.email == "" || docdetails.phonenumber == "" || docdetails.password == "") {
      toast.error("Fill up details !");
    }
    else {
      setloder(true);
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("docfile", file);
      filedoc.name = file.name;
      filedoc.size = file.size;
      filedoc.type = file.type;
      axios.post("https://doc-appointment-node-backend.onrender.com/check", docdetails).then((res) => {
        if (res.data.message === "Exists") {
          setloder(false);
          toast.error("User already exist on this email");
        }
        if (res.data.message === "ok") {
          axios.post("https://doc-appointment-node-backend.onrender.com/upload", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then(async (res) => {
            if (res.data.message === "only pdf file are allowed") {
              setloder(false);
              toast.error("only pdf file are allowed");
            }
            if (res.data.message === "okk") {
              await axios.post("https://doc-appointment-node-backend.onrender.com/docreg", docdetails).then((res) => {
                //console.log(res);
                if (res.data.message === "ok") {
                  toast.success("registration Successful");
                  setloder(false);
                  axios.post("https://doc-appointment-node-backend.onrender.com/afterdocreg", docdetails).then((res) => {
                    toast.success("check email");
                  })

                  setTimeout(() => {
                    navigate("/doclogin");
                  }, 2000);


                }
                if (res.data.message === "error") {
                  toast.error("Something went wrong");
                }



              });
            }
          });

        }
      })


    }

  }

  const [specialties, setSpecialties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get("https://doc-appointment-node-backend.onrender.com/getSpeciality");
        console.log("API Response:", response.data); // Check the structure of the response

        // Accessing specialistdata from the response
        if (Array.isArray(response.data.specialistdata)) {
          setSpecialties(response.data.specialistdata);
        } else {
          setError("Invalid response format");
        }
      } catch (error) {
        setError("Error fetching specialties: " + error.message);
      }
    };

    fetchSpecialties();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-back">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Doctor Registration</h2>
          <p className="text-center text-gray-500 mb-6">Fill in the details below to register.</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={docdetails.name}
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
                value={docdetails.email}
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
                value={docdetails.password}
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

export default DoctorRegistration;