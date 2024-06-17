// script to check if token expired -> refreash token

import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {
  SetRefreshSucess,
  SetTokenFailed,
  SetTokenSucess,
} from "../redux/User/userSlice";
import axios from "axios";
import { useEffect } from "react";
import privateaxious from "./api";

function TokenAuth() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.ACESS_TOKEN);
  const refreshToken = useSelector((state) => state.user.REFRESH_TOKEN);

  useEffect(() => {
    const interval = setInterval(() => {
      auth().catch(() => {
        dispatch(SetTokenFailed());
        console.log("Not Authorized Bye...");
      });
    }, 1 * 60 * 1000); // 5 minutes interval

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [accessToken, refreshToken, dispatch]);

  // console.log("acc: ", accessToken)
  // console.log("reff :", refreshToken)

  const ReToken = async () => {
    // Refreshing the token
    try {
      const res = await axios.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        console.log("refreshing token!");
        dispatch(SetRefreshSucess(res.data.access));
      } else {
        dispatch(SetTokenFailed());
      }
    } catch (error) {
      console.log(error);
      dispatch(SetTokenFailed());
    }
  };

  // check if access token expired ? refreshToken
  const auth = async () => {
    // setting the auth token
    if (accessToken === "") {
      dispatch(SetTokenFailed());
      return;
    }
    const decoded = jwtDecode(accessToken);
    // console.log(decoded);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // befor 5 min new token call.
    console.log(now);

    if (tokenExpiration < now + 299) {
      await ReToken();
    } else {
      dispatch(SetTokenSucess(accessToken, refreshToken));
    }
  };
  return null;
}

export default TokenAuth;
