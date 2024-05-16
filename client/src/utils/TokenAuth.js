// script to check if token expired -> refreash token

import { useDispatch, useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode";
import { SetRefreshSucess, SetTokenFailed, SetTokenSucess } from "../redux/User/userSlice"
import axios from "axios";
import { useEffect } from "react";
import privateaxious from "./api";

function TokenAuth() {
    const dispatch = useDispatch()
    useEffect(() => {
        auth().catch(() => {
            dispatch(SetTokenFailed())
            console.log("Not Authorised Bie...")
        })
    }, [])

    const accessToken = useSelector((state) => state.user.ACESS_TOKEN)
    const refreshToken = useSelector((state) => state.user.REFRESH_TOKEN)
    console.log("acc: ", accessToken)
    console.log("reff :", refreshToken)

    const ReToken = async () => {
        // Refreshing the token
        try {
            const res = await privateaxious.post('/api/token/refresh/', {
                refresh: refreshToken
            })
            if (res.status === 200) {
                console.log("refreshing token!")
                dispatch(SetRefreshSucess(res.data.access))
            } else {
                dispatch(SetTokenFailed())
            }
        } catch (error) {
            console.log(error)
            dispatch(SetTokenFailed())
        }
    }

    // check if access token expired ? refreshToken
    const auth = async () => {
        // setting the auth token
        if (accessToken === '') {
            dispatch(SetTokenFailed())
        }
        const decoded = jwtDecode(accessToken)
        console.log(decoded)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000
        console.log(now)

        if (tokenExpiration < now) {
            await ReToken()
        } else {
            dispatch(SetTokenSucess(accessToken, refreshToken))
        }

    }


}

export default TokenAuth
