import React from 'react'
import { Box, Grid , TextField , Button } from '@mui/material'
import { useFormik } from 'formik'
import axios from "axios"
import toast from 'react-hot-toast';

export const Updateproduct = () => {

    const formik = useFormik({
        initialValues: {
          price : ' ',
          quantity: ''
        },
        onSubmit: async(values) =>{
          const payload = {
            price : values.price,
            quantity : values.quantity,
          }
          const res = await axios.put(`http://localhost:8000/api/product/updateproduct`, payload)
          const resData = await res.data;
          console.log(resData);
      
          try{
            if (res.status === 200) {
              toast.success("Product has been added")
            } 
          }catch(err){
            toast.error("Error occured");
          }
        }
      })
  return (
   <>
   <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid item xs={12}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="price"
        label="Edit Price"
        name="price"
        autoComplete="price"
        autoFocus
        value={formik.values.price}
        onChange={formik.handleChange}
      />
    </Grid>

    <Grid item xs={5}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="quantity"
        label="Edit Quantity"
        name="quantity"
        autoComplete="quantity"
        autoFocus
        value={formik.values.quantity}
        onChange={formik.handleChange}
      />
    </Grid>
    <Button variant="contained">Update Product</Button>
    </Box>
   </>
  )
}
