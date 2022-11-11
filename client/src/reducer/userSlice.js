import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        userId : '',
        firstName : '',
        lastName : '',
        email : '',
        contact : '',
        role: '',
        loggedIn : false
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.contact = action.payload.contact
            state.loggedIn = true
            state.role = action.payload.role
           console.log(action.payload.role);
        },
        logout: (state) => {
            state.userId = ""
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.contact = ""
            state.loggedIn = false
            state.role = " "
        }
        
    }
    
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;