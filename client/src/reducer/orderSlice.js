import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        orderId : ''
       
    },
    reducers: {
        setId: (state, action) => {
            state.orderId = action.payload.orderId
            
        }
    }
})

export const { setId } = orderSlice.actions;
export default orderSlice.reducer;