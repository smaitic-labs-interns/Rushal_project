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

export default function AddressForm() {
  const { userId } = useSelector((state) => state.user);
  const [paymentCharge , setPaymentCharge] = React.useState('')
  const [location, setLocation] = React.useState('');
  const [shipmentStatus , setShipmentStatus] = React.useState('')
  const [ payload , setPayload] = React.useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()

  React.useEffect(()=>{
    console.log(location);
    if(location === 'insideRingroad'){
      setPaymentCharge(150)
      setShipmentStatus('received')
    }else if (location === 'outsideRingroad'){
      setPaymentCharge(300)
      setShipmentStatus('received')
    } else{
      setPaymentCharge('')
      setShipmentStatus('')
    }
  },[location])
 
  const formik = useFormik({
    initialValues: {
      country: "",
      location: "",
      city: "",
      charge: "",
      shipmentstatus: "",
      payment: "",
      status:""
    },
    validationSchema: shipmentValidationSchema,
    onSubmit: async() =>{
      setPayload({
        shipementAddress: {
          country : formik.country, 
          city: formik.city,
          name : formik.location,
          charge : formik.charge, 
          status: formik.status 
        },
        Payment: {
          type: formik.payment,
          status: formik.shipmentstatus 
                 },
      })
      const res = await axios.post(`http://localhost:8000/api/order/placeorder/${userId}`, payload)
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
              value={formik.country}
              onChange={formik.handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="name">Location</InputLabel>
              <Select
                required
                name="location"
                margin="normal"
                labelId="name"
                id="location"
                value={location}
                label="Choose Location"
                onChange={(e) => [setLocation(e.target.value) , formik.handleChange]}  
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
              value={formik.city}
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
              margin="normal"
              required
              fullWidth
              value={[paymentCharge , formik.charge]}
              id="charge"
              label="Payment charge"
              name="charge"
              autoComplete="charge"
              autoFocus
              onChange={formik.handleChange}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={[shipmentStatus , formik.shipementAddress]}
              id="shipmentstatus"
              label="shipmentstatus"
              name="shipmentstatus"
              autoComplete="shipmentstatus"
              autoFocus
              onChange={formik.handleChange}
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
                value={formik.payment}
                onChange={formik.handleChange}
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
              required
              fullWidth
              id="status"
              label="Payment Status"
              name="status"
              autoComplete="status"
              autoFocus
              value={formik.status}
              onChange={formik.handleChange}
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
