import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Typewriter from "typewriter-effect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetRefreshToken, SetTokenFailed, SetTokenSucess } from "../redux/User/userSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

function NewLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [eyeopen, seteyeopen] = useState(false);
  const sampleusername = "roshan";
  const samplepass = "roshanhere";
  const authenticated = useSelector((state) => state.user.authenticated);
  const [formdata, setformdata] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };
  console.log(formdata);

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

  const handleEye = () => {
    if (eyeopen) {
        seteyeopen(false);
        setformdata({ ...formdata, username: "", password: "" });
        
    } else {
        seteyeopen(true);
        setformdata({
            ...formdata,
            username: sampleusername,
            password: samplepass,
          });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login/", formdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      // console.log(data)
      dispatch(SetTokenSucess(data.access));
      dispatch(SetRefreshToken(data.refresh));
      toast.success("User Signin Sucessfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      dispatch(SetTokenFailed());
      toast.error(`Err: ${error}`);
    }
  };

  return (
    <div className="w-full bg-gray-900 bg-auto min-h-screen overflow-hidden">
      {isLoading ? (
        <Loader about={"Logined..."} />
      ) : (
        <>
          <Toaster />
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col mt-3 ml-4 md:m-12">
              <div className="flex justify-center gap-2">
                <h1 className="flex md:justify-center text-3xl font-bold ">
                  Login to
                </h1>
                <span className=" text-3xl font-bold text-blue-600">
                  {" "}
                  One
                  <span className="text-3xl font-semibold text-cyan-300">
                    Compiler{" "}
                  </span>
                </span>
              </div>
              <div className="hidden md:flex flex-col mt-5 text-xl font-light text-gray-50">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("We are glad  you are here ...")
                      .pauseFor(4500)
                      .stop()
                      .start();
                  }}
                />
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .pauseFor(4500)
                      .typeString(
                        `let's explore  <strong>oneCompiler</strong> Together`
                      )
                      .start();
                  }}
                />
              </div>
              <div className="ml-14 md:ml-1 mt-2 md:mt-10 flex flex-col justify-center">
                <h1>Lookin for tour ?</h1>
                <h1
                  onClick={handleEye}
                  className="flex gap-3 hover:cursor-pointer link"
                >
                  Use Demo Account
                  <FontAwesomeIcon
                    className="text-xl"
                    icon={eyeopen ? faEye : faEyeSlash}
                  />
                </h1>
              </div>
            </div>
            <div className="flex justify-center md:mt-20 card min-w-max md:w-96 shadow-2xl md:mr-24 md:ml-6 ml-20 mr-20 bg-base-100">
              <form onSubmit={handleSubmit} method="post" className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="username"
                    value={eyeopen ? formdata?.username : formdata?.username}
                    onChange={handlechange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="password"
                    onChange={handlechange}
                    className="input input-bordered"
                    value={eyeopen ? formdata?.password : formdata?.password}
                    required
                  />
                  <label className="label">
                    <a
                      onClick={() => navigate("/register")}
                      className="label-text-alt link link-hover"
                    >
                      No account? Crete new
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
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

export default NewLogin;
