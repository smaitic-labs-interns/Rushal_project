import * as React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';




export default function TrackOrder() {

  const handleClick = async () => {
    try{
      const id = document.getElementById('orderid').value
      const res = await axios.get(`http://localhost:8000/api/order/trackorder/${id}`)
      const resData = res.data
      console.log(res.data);
      if(res.status === 200){
        toast.success(resData)
        }
      }catch(err){
        toast.error('order id didnt found')
      }
  }
 
  return (

      <Box
          component="form"
          noValidate
          sx={{ mt: 1}}
        >
          <Typography variant="h5" gutterBottom>
          Your Order Information
          </Typography>
          <TextField
             margin="normal"
             size='small'
             required
             id="orderid"
             label="Order id"
             name="orderid"
             autoComplete="orderid"
             autoFocus
             />
            <Button sx={{ mb: 1 , my:10 }} variant='contained' onClick={handleClick}>Track your order</Button>
           </Box>
          
            
  );
}




