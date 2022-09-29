import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        userId : '',
        firstName : '',
        lastName : '',
        loggedIn : false
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.loggedIn = true
            console.log(action.payload);
        },
        logout: (state) => {
            state.userId = ""
            state.firstName = ""
            state.lastName = ""
            state.loggedIn = false
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;