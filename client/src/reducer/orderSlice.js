import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        orderId : ''
       
    },
    reducers: {
        setId: (state, action) => {
            state.orderId = action.payload.orderId
            console.log(action.payload);
        },
        removeId: (state) => {
            state.orderId = " "
        }
    }   
})

export const { setId , removeId} = orderSlice.actions;
export default orderSlice.reducer;