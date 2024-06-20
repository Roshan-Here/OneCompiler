import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import ListProblemSamples from "../utils/ListProblemSample";
import AttemptedProblemList from "../components/AttemptedProblemList";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import BlankProfilePNG from "../components/Statiacimages/BlankUserProfile.png";
import privateaxious from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SetTokenFailed } from "../redux/User/userSlice";
import TokenAuth from "../utils/TokenAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faShareNodes,
  faShieldHalved,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  TokenAuth(); // refreahing token
  const authenticated = useSelector((state) => state.user.authenticated);
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [incommingdata, setincommingdata] = useState([]);
  const [enableupdate, setenableupdate] = useState(false);
  const [postperpage] = useState(9);
  const [currentpage, setcurrentpage] = useState(1);
  const [isloading, setisLoading] = useState(false);
  const [NewImage, setNewImage] = useState();
  const [ImagePreview, setImagePreview] = useState();
  const [formdata, setformdata] = useState({
    full_name: "",
    about: "",
    picture_url: null,
  });

  // console.log(import.meta.env.VITE_FRONTEND_URL);
  // console.log(formdata);
  // console.log(username);
  // console.log(NewImage);

  const uploadToCloudinary = async () => {
    const cloudinarydata = new FormData();
    cloudinarydata.append("file", NewImage);
    cloudinarydata.append("upload_preset", import.meta.env.VITE_PRESET_NAME);
    // cloudinarydata.append("api_key", import.meta.env.VITE_API_KEY);
    cloudinarydata.append("folder", "OneCompiler");
    // console.log(cloudinarydata);
    if (NewImage) {
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/image/upload`,
          cloudinarydata
        );
        console.log(res.data);
        setNewImage(res.data.secure_url);
        return res.data.secure_url
      } catch (err) {
        toast.error("Err while uploading to cloud");
        // setImagePreview()
      }
    }
  };

  const handlecopy = () => {
    // for share button
    try {
      const value = `https://${import.meta.env.VITE_FRONTEND_URL}/profile/${incommingdata.username}`;
      navigator.clipboard.writeText(value);
      toast.success("Link added to clipboard");
    } catch (error) {
      toast.error("Unable to copy to clipboard");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await privateaxious.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/`);
      console.log(res.data);
      setincommingdata(res.data);
      setImagePreview(res.data.picture_url);
    } catch (error) {
      toast.error(`Error fetching ${username} profile ${error}`);
    }
  };

  const fetchUserProfileWithoutJWT = async () => {
    try {
      setisLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${username}`);
      // console.log(res.data);
      setincommingdata(res.data);
      setImagePreview(res.data.picture_url);
    } catch (error) {
      toast.error(`error while fetching user ${error}`);
      setTimeout(() => {
        setisLoading(false);
        navigate("/");
      }, 300);
    }
  };

  const handleImageChange = (event) => {
    setNewImage(event.target.files[0]);
    if (event.target.files[0]) {
      const imageurl = URL.createObjectURL(event.target.files[0]);
      setImagePreview(imageurl);
      // HandleUpdateProfile();
    }
  };

  useEffect(() => {
    setisLoading(true);
    if (username === undefined && authenticated) {
      fetchUserProfile();
    } else {
      // console.log(username);
      fetchUserProfileWithoutJWT();
      // setTimeout(() => {
      //   navigate("/about");
      // }, 1800);
    }
    setTimeout(() => {
      setisLoading(false);
    }, 4000);
  }, []);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  const HandleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      let picture_url = formdata.picture_url;
      if (NewImage) {
        picture_url = await uploadToCloudinary();
      }

      const data = {
        full_name: formdata.full_name,
        about: formdata.about,
        picture_url: picture_url,
      };
      const res = await privateaxious.put(`${import.meta.env.VITE_BACKEND_URL}/api/profile/update/`, data);
      console.log(res.data);
      toast.success("Profile Updated Sucessfully");
      fetchUserProfile();
      setenableupdate(false);
    } catch (error) {
      toast.error(`Err : ${error}`);
    }
    // console.log(formdata);
  };

  const HandleDeleteProfile = async () => {
    try {
      const res = await privateaxious.delete(`${import.meta.env.VITE_BACKEND_URL}/api/profile/delete/`);
      // console.log(res);
      toast.success("Account Deleted Sucessfully!");
      dispatch(SetTokenFailed());
      setTimeout(() => {
        setisLoading(false);
        navigate("/");
      }, 1800);
    } catch (error) {
      toast.error(`Err while deleting account ${error}`);
    }
  };

  const LoadingText =
    username === undefined && authenticated
      ? `Welcome ${incommingdata?.username?incommingdata?.username:""}`
      : "Profile Loading ...";

  const Indexoflastpage = currentpage * postperpage;
  const IndexoFirstpage = Indexoflastpage - postperpage;

  const totalPages = incommingdata?.usersolvedquestionlist
    ? incommingdata?.usersolvedquestionlist?.length
    : 0;

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

  const currentproblems = incommingdata.usersolvedquestionlist?.slice(
    IndexoFirstpage,
    Indexoflastpage
  );

  // console.log(currentproblems);

  return (
    <div className="w-full bg-gray-900 bg-auto min-h-screen overflow-hidden">
      {isloading ? (
        <Loader about={LoadingText} />
      ) : (
        <>
          <Toaster />
          <div className="flex justify-center">
            {/* Profile pic & usernme part */}
            <div className="flex-col">
              <div className="avatar mt-7">
                <div className="relative w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={ImagePreview ? ImagePreview : BlankProfilePNG} />
                  {/* hide button on enable update */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`${enableupdate ? "" : "hidden"} 
                    px-7 absolute 
                    -bottom-1  w-full text-sm text-slate-500
                    file:m-4 file:py-2 file:px-1
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-slate-500
`}
                  />
                </div>
              </div>
              <div className="flex justify-center text-2xl font-bold">
                {incommingdata.score >= 250 ? (
                  <>
                    <FontAwesomeIcon
                      className="text-3xl text-amber-300"
                      icon={faMedal}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-center text-2xl font-bold">
                {`@${incommingdata.username}`}
              </div>
              <div className="mt-2 flex justify-center text-2xl font-semibold gap-3">
                {/* hidden if not authenticated */}
                <button
                  className={`${
                    authenticated ? "" : "hidden"
                  } btn btn-sm border-t-green-600 btn-accent`}
                  onClick={() => setenableupdate(true)}
                >
                  Update
                </button>
                <button
                  className={`${
                    authenticated ? "" : "hidden"
                  } btn btn-sm  btn-error`}
                  onClick={HandleDeleteProfile}
                >
                  Delete
                </button>
              </div>
              <div className="mt-2 flex justify-center">
                <button
                  onClick={handlecopy}
                  className="btn btn-sm btn-ghost text-sky-500"
                >
                  <FontAwesomeIcon className="text-2xl" icon={faShareNodes} />
                  Share
                </button>
              </div>
            </div>
          </div>
          <div className="flex mt-6">
            <div className="card ml-12 mr-12 md:ml-44 md:mr-44 w-full bg-slate-500 text-primary-content">
              <div className={`${enableupdate ? "hidden" : ""} card-body`}>
                <div className={`${incommingdata?.score===null?"hidden":"flex  justify-center text-2xl font-bold gap-2"}`}>
                  Total Score :{" "}
                  {incommingdata.score <= 50 ? (
                    <>
                      {`${incommingdata.score}`}
                      <FontAwesomeIcon
                        className="text-3xl text-amber-900"
                        icon={faShieldHalved}
                      />
                    </>
                  ) : incommingdata.score <= 249 ? (
                    <>
                      {`${incommingdata.score}`}
                      <FontAwesomeIcon
                        className="text-3xl text-indigo-600"
                        icon={faStar}
                      />
                    </>
                  ) : (
                    <>{`${incommingdata.score}`}</>
                  )}
                </div>
                {/* // change hidden onupdate */}
                <h1 className="flex justify-center text-2xl text-zinc-100">{`${incommingdata.full_name}`}</h1>
                <p className="flex justify-center text-xl text-red-100">
                  {`${incommingdata.about}`}
                </p>
              </div>
              <div className={`${!enableupdate ? "hidden" : ""} card-body`}>
                {/* unhiden on onupdate */}
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center text-2xl font-semibold">
                    Update
                  </div>
                  <form className="mt-3">
                    <label
                      className="input input-bordered flex items-center gap-2"
                      htmlFor="fullname"
                    >
                      <input
                        className="grow text-slate-200"
                        type="text"
                        placeholder="Full Name"
                        name="full_name"
                        onChange={handleUpdateChange}
                        id=""
                      />
                    </label>
                    <label
                      className="mt-1 input input-bordered flex items-center gap-2"
                      htmlFor="About"
                    >
                      <input
                        className="grow text-slate-200"
                        type="text-area"
                        placeholder="About"
                        name="about"
                        onChange={handleUpdateChange}
                        id=""
                      />
                    </label>
                    <div className="mt-3 flex text-2xl font-semibold">
                      <button
                        onClick={HandleUpdateProfile}
                        className="btn  border-t-green-600 btn-success"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                  <div className="flex text-2xl font-semibold">
                    <button
                      onClick={() => setenableupdate(false)}
                      className="btn btn-link text-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* solution table part */}
          <div
            className={`mt-3 ${
              incommingdata?.usersolvedquestionlist?.length === 0
                ? "hidden"
                : ""
            } flex flex-col justify-center`}
          >
            {/* // hide with respect to length */}
            <div className="ml-12 mr-12 md:ml-44 md:mr-44 card bg-gray-950 shadow xl">
              <div className="py-3 flex justify-center">
                <h1 className="text-3xl font-bold">Attended Questions</h1>
              </div>
              <AttemptedProblemList CurrentProblems={currentproblems} />
              <Pagination
                postPerPage={postperpage}
                totalPages={totalPages}
                paginate={paginate}
                currentPage={currentpage}
              />
              <div className="card-body"></div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Profile;
