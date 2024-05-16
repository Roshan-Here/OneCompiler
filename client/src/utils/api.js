// for custom axious api -> with token

import axios from "axios"
import { store } from "../redux/store"


const privateaxious = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

privateaxious.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().user.ACESS_TOKEN
        // console.log(accessToken)
        if (accessToken !== '') {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default privateaxious