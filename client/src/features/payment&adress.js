import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { shipmentValidationSchema } from "../validation/validation";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setId } from "../reducer/orderSlice";

export default function AddressForm() {
  const { userId } = useSelector((state) => state.user);
 
  const [shipment, setShipment] = React.useState({});
  const [payload , setPayload] = React.useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // console.log(shipment);
  // console.log(userId);
  const formik = useFormik({
    initialValues: {
      country: "",
      name: "",
      city: "",
      charge: "",
      shipmentstatus: "",
      payment: "",
      status: "",    
    },
    validationSchema: shipmentValidationSchema,

    onSubmit: async () => {
      // console.log(formik.values);
    },
  });
  // console.log(formik.values);
  const [shipping, setShipping] = React.useState({ padding: "100px" });
  const [shippingDet, setShippingDet] = React.useState({
    display: "none",
    width: "80%",
    margin: "20px",
  });

  function handleNext() {
    setShipping({ display: "none" });
    setShipment(formik.values);
    setShippingDet({ dispaly: "block", width: "80%", margin: "20px" });
    const country = document.getElementById("country").value;
    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;
    const payment = document.getElementById("payment").value;
    const status = document.getElementById("status").value;
    const charge = document.getElementById("charge").value;
    const shipmentstatus = document.getElementById("shipmentstatus").value;
    setShipment({country, city, name, payment, status, charge, shipmentstatus});  
    setPayload({shipementAddress: {country, city, name, charge, status}, Payment:{type: payment, status:shipmentstatus}})
  }
   const handleClick = async () => {
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


  return shipment && (
    <>
      <Box className="shipping" sx={shipping}>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
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
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label=" Choose Location"
            name="name"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            label="Enter City"
            name="city"
            autoComplete="city"
            autoFocus
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="charge"
            label="Payment charge"
            name="charge"
            autoComplete="charge"
            autoFocus
            value={formik.values.charge}
            onChange={formik.handleChange}
            error={formik.touched.charge && Boolean(formik.errors.charge)}
            helperText={formik.touched.charge && formik.errors.charge}
          />
           <TextField
            margin="normal"
            required
            fullWidth
            id="shipmentstatus"
            label="shipmentstatus"
            name="shipmentstatus"
            autoComplete="shipmentstatus"
            autoFocus
            value={formik.values.shipmentstatus}
            onChange={formik.handleChange}
            error={formik.touched.shipmentstatus && Boolean(formik.errors.shipmentstatus)}
            helperText={formik.touched.shipmentstatus && formik.errors.shipmentstatus}
          />
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="payment"
            label="Payment type"
            name="payment"
            autoComplete="payment"
            autoFocus
            value={formik.values.payment}
            onChange={formik.handleChange}
            error={formik.touched.payment && Boolean(formik.errors.payment)}
            helperText={formik.touched.payment && formik.errors.payment}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="status"
            label="Payment Status"
            name="status"
            autoComplete="status"
            autoFocus
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          />
          <Button
            type="submit"
            onClick={() => {
              handleNext();
            }}
            color="primary"
            variant="contained"
          >
            Next
          </Button>
        </Box>
      </Box>
      <Box sx={shippingDet}>
        
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Shipping Details
              </Typography>
              <Typography gutterBottom>{shipment.country}</Typography>
              <Typography gutterBottom>{shipment.city}</Typography>
              <Typography gutterBottom>{shipment.name}</Typography>
              <Typography gutterBottom>{shipment.charge}</Typography>
              <Typography gutterBottom>{shipment.shipmentstatus}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Payment details
              </Typography>
              <Typography gutterBottom>{shipment.payment}</Typography>
              <Typography gutterBottom>{shipment.status}</Typography>
              <Grid container></Grid>
            </Grid>
          </Grid>
          <Button
          variant="contained"
          onClick={handleClick}
          sx={{ mt: 3, mb: 2 }}>Order Now</Button>
      </Box>
    </>
  );
}
