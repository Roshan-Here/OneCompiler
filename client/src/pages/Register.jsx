import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetRefreshToken, SetTokenSucess } from "../redux/User/userSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

function Register() {
  const navigate = useNavigate();
  const authenticated = useSelector((state) => state.user.authenticated);
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userprofile: {
      full_name: "",
      about: "",
      score: null,
      picture: null,
      usersolvedquestionlist: [],
    },
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id in formData) {
      setFormData({ ...formData, [id]: value });
    } else {
      setFormData({
        ...formData,
        userprofile: { ...formData.userprofile, [id]: value },
      });
    }
  };
//   console.log(formData);

  useEffect(() => {
    if (authenticated) {
      toast.error("Already Logind");
      setisLoading(true);
      setTimeout(() => {
        navigate("/");
      }, 800);
    } else {
      setisLoading(false);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      // console.log(data)
      toast.success("User Registed Sucessfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(`Err: ${error}`);
    }
  };

  return (
    <div className="w-full bg-gray-900 bg-auto min-h-screen overflow-hidden">
      {isLoading ? (
        <Loader about={"Already Logined"} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Toaster />
            <div className="flex justify-center md:mt-10 card ml-8 mr-8 mt-12 md:w-96 shadow-2xl  bg-base-100">
              <div className="mt-4 flex justify-center">
                <h1 className="font-medium text-2xl">Register</h1>
              </div>
              <form onSubmit={handleSubmit} method="post" className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="username"
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="email"
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="password"
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <span className="label-text">About</span>
                  </label>
                  <textarea
                    id="about"
                    placeholder="About"
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  ></textarea>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Register;
