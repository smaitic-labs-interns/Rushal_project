import React from 'react'
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box  from '@mui/material/Box';
import { Button } from '@mui/material';
import { useFormik } from "formik";
import axios from "axios"
import toast from 'react-hot-toast';

export const Addproduct = () => {
    
const formik = useFormik({
  initialValues: {
    category: ' ',
    productName : ' ',
    price : ' ',
    brand : '',
    quantity: ''
  },
  onSubmit: async(values) =>{
    const payload = {
      category: values.category,
      name : values.productName,
      price : values.price,
      brand : values.brand,
      quantity : values.quantity,
    }
    const res = await axios.post('http://localhost:8000/api/product/addproduct', payload)
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
        id="category"
        label="Enter Category"
        name="category"
        autoComplete="category"
        autoFocus
        value={formik.values.category}
        onChange={formik.handleChange}
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="productName"
        label="Enter Product name"
        name="productName"
        autoComplete="productName"
        autoFocus
        value={formik.values.productName}
        onChange={formik.handleChange}
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="price"
        label="Enter Price"
        name="price"
        autoComplete="price"
        autoFocus
        value={formik.values.price}
        onChange={formik.handleChange}
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="brand"
        label="Enter Brand"
        name="brand"
        autoComplete="brand"
        autoFocus
        value={formik.values.brand}
        onChange={formik.handleChange}
      />
    </Grid>

    <Grid item xs={5}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="quantity"
        label="Enter Quantity"
        name="quantity"
        autoComplete="quantity"
        autoFocus
        value={formik.values.quantity}
        onChange={formik.handleChange}
      />
    </Grid>
    <Button type = 'submit' variant="contained"> Add Product</Button>
  </Box>
  </>
  )
}
