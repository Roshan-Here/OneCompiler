import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ACESS_TOKEN: "",
    REFRESH_TOKEN: "",
    authenticated: false
}

export const UserSlice = createSlice({
    name: 'userstate',
    initialState,
    reducers: {
        SetTokenSucess: (state, action) => {
            // console.log(action)
            state.ACESS_TOKEN = action.payload,
                state.authenticated = true
        },
        SetRefreshToken: (state, action) => {
            state.REFRESH_TOKEN = action.payload
        },
        SetTokenFailed: (state) => {
            state.ACESS_TOKEN = '',
                state.REFRESH_TOKEN = '',
                state.authenticated = false
        },
        SetRefreshSucess: (state, action) => {
            state.ACESS_TOKEN = action.payload,
                state.authenticated = true
        }
    }
})

export const { SetTokenSucess, SetTokenFailed, SetRefreshSucess, SetRefreshToken } = UserSlice.actions
export default UserSlice.reducer