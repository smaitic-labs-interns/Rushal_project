import * as React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';




export default function TrackOrder() {


  const [resData , setresData] = React.useState()
  const handleClick = async () => {
    try{
      const id = document.getElementById('orderid').value
      const res = await axios.get(`http://localhost:8000/api/order/trackorder/${id}`)
      // const resData = res.data
      console.log(res.data);
      setresData(res.data)
      // console.log(resData);
      if(res.status === 200){
        toast.success(resData)
        }
      }catch(err){
        toast.error('order id didnt found')
      }
  }
 
  return (
    <>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Typography variant="h5" gutterBottom>
          Your Order Information
        </Typography>
        <TextField
          margin="normal"
          size="small"
          required
          id="orderid"
          label="Order id"
          name="orderid"
          autoComplete="orderid"
          autoFocus
        />
        <Button
          sx={{ mb: 1, my: 10 }}
          variant="contained"
          onClick={handleClick}
        >
          Track your order
        </Button>
      </Box>
    {resData?(
      <>
      <Box sx = {{padding: '20px' , display:'flex' , justifyContent:'space-between'}}>
      <table border={1}>
      <tbody>
        <tr>
          <th>country</th>
          <td>{resData.shipementAddress.country}</td>
        </tr>
        <tr>
        <th>city</th>
        <td>{resData.shipementAddress.city}</td>
        </tr>
        <tr>
        <th>Delivery charge</th>
        <td>{resData.shipementAddress.charge}</td>
        </tr>
      </tbody>
    </table>
    <br/>
      <table border={1}>
        <thead>
          <tr>
            <th>ProductId</th>
            <th>quantity</th>
          </tr>
        </thead>
        <tbody>
          {resData["Products"].map((product) => {
            return (
              <tr key={product?.id}>
                <td>{product?.id}</td>
                <td>{product?.Quantity}</td>
                
              </tr>
            );
          })}

        </tbody>
      </table>
      </Box>
      </>
    ):''}
    </>
    
  );
}




