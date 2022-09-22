import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        userId : '',
       Productid : ''
    }
})