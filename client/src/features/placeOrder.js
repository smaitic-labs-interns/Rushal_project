import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setId } from "../reducer/orderSlice";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Select  from "@mui/material/Select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from "formik";
import { shipmentValidationSchema } from "../validation/validation";
import FormLabel from '@mui/material/FormLabel';
import baseAxi from "../axiosUrl/axios.base";
import { orderEnd } from "../axiosUrl/axios.endpoint";


export default function AddressForm() {
  const { userId } = useSelector((state) => state.user);
  const [ status , setStatus] = React.useState({paymentCharge: '' , shipmentStatus: '' , paymentStatus: ''})
  const navigate = useNavigate()
  const dispatch = useDispatch()


 
  const formik = useFormik({
    initialValues: {
      country: "",
      location: "",
      city: "",
      payment: "",
    },
    validationSchema: shipmentValidationSchema,
    onSubmit: async(values) =>{
   
      const payload = {
        shipementAddress: {
          country : values.country, 
          city: values.city,
          name : values.location,
          charge : status.paymentCharge, 
          status: status.shipmentStatus
        },
        Payment: {
          type: values.payment,
          status: status.paymentStatus 
                 },
      }
      console.log(payload);
      const res = await baseAxi({apiDetails: orderEnd.order , path: {userid: userId}, body:payload})
      const resData = await res.data;
      console.log(resData);
  
    try{
      if (res.status === 200) {
        navigate('/')
        toast.success(resData.data.message);
        toast.success(resData.data.orderid)
        dispatch(
          setId({
            orderId: resData.data.orderid,
          })
        );
      } 
    }catch(err){
      toast.error("Error occured");
    }
    }
  })
  function handleChangeprice(e){
    let val = e.target.value
    if(val === 'insideRingroad'){
      // setPaymentCharge(150)
      setStatus({...status, shipmentStatus : 'received' , paymentCharge: 150} )
      // setShipmentStatus('received')
    }else if (val === 'outsideRingroad'){
      // setPaymentCharge(300)
      // setShipmentStatus('received')
      setStatus({...status, shipmentStatus : 'received' , paymentCharge: 300} )
    } else{
      // setPaymentCharge(null)
      // setShipmentStatus(null)
      setStatus({...status, paymentCharge : null , shipmentStatus : null } )
    }
  }

  function handleChangePaymentStatus(e){
    let val = e.target.value
    if(val === 'E-sewa' || val === "Khalti"|| val === 'fone pay' ){
      // setPaymentStatus('Paid')
      setStatus({...status, paymentStatus : 'Paid'} )
    }else if (val === 'CASH'){
      // setPaymentStatus('Pending')
      setStatus({...status, paymentStatus : 'Pending'} )
    }else{
      // setPaymentStatus(null)
      setStatus({...status, paymentStatus : null} )
    }
  }
   
  return  (
    
      <>
      <Box sx={{display : 'flex' , justifyContent: 'center'}}>
        <Box noValidate sx={{ mt: 1 , width: '60%' }}  >
          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Country Name"
              name="country"
              autoComplete="country"
              autoFocus
              value={formik.values.country}
              onChange={formik.handleChange}
            />
            </Grid>
            <Grid item xs={12} sx ={{textAlign : 'left'}}>
              
            <FormControl fullWidth>
              <InputLabel id="name">Location</InputLabel>
              <Select
                required
                name="location"
                margin="normal"
                labelId="name"
                id="location"
                value={formik.values.location}
                label="Choose Location"
                onChange={(e) => {formik.handleChange(e) ; handleChangeprice(e)}}  
              >
                <MenuItem value= "insideRingroad">Inside Ringroad</MenuItem>
                <MenuItem value= "outsideRingroad">Outside Ringroad</MenuItem>
              </Select>
            </FormControl>
             </Grid>
             
            <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              value={formik.values.city}
              fullWidth
              id="city"
              label="Enter City"
              name="city"
              autoComplete="city"
              autoFocus
              onChange={formik.handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              fullWidth
              value={status.paymentCharge !== null?status.paymentCharge: 0}
              id="charge"
              label="Payment charge"
              name="charge"     
              InputProps={{
                readOnly: true,
              }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              value={status.shipmentStatus}
              id="shipmentstatus"
              label="shipmentstatus"
              name="shipmentstatus"
              autoComplete="shipmentstatus"
              autoFocus
              InputProps={{
                readOnly: true,
              }}
            />
            </Grid> 
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>

          <Grid item xs={12}>
            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Payment Type</FormLabel>
               <RadioGroup
                defaultValue="payment"
                value={formik.values.payment}
                onChange={(e) => {formik.handleChange(e) ; handleChangePaymentStatus(e)}}
                name = "payment"
                id = "payment"
              >
                <FormControlLabel
                  value= "E-sewa"
                  control= {<Radio/>}
                  label="E-sewa"
      
                />
                <FormControlLabel
                  value="Khalti"
                  control={<Radio />}
                  label="Khalti"
                 
                />
                <FormControlLabel
                  value="fone pay"
                  control={<Radio />}
                  label="fone pay"
                  
                />
                 <FormControlLabel
                  value="CASH"
                  control={<Radio />}
                  label= "CASH"
                />
              </RadioGroup> 
            </FormControl>
            </Grid>
            <Grid item xs={12}>
             <TextField
              margin="normal"
              fullWidth
              id="status"
              label="Payment Status"
              name="status"
              value={status.paymentStatus}
              InputProps={{
                readOnly: true,
              }}
            />  
            </Grid>
            <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Order Now
          </Button>
          </Box>
        </Box>
        </Box>
      </>
    
  );
}
