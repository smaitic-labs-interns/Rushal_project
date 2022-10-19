import React from 'react'
import { Box, Grid, TextField} from "@mui/material";
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Product = ({userCart}) => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = React.useState()
  console.log(product);
  const { userId, loggedIn } = useSelector(state => state.user)
  const [qty, setQty] = React.useState(1);
  const [submitMsg, setSubmitMsg] = React.useState({});
  const [submitMsgStyle, setSubmitMsgStyle] = React.useState({ display: "none" });
  
  React.useEffect(() => {
    const fetchData = async () => {
      // const res = await axI(productEnd.getProductById)
      const res = await axios.get(`http://localhost:8000/api/product/${id}`)
      setProduct(res.data)
    }
    fetchData() 
  }, [id])

  const handleClick = async () => {
    if (userCart.message && userCart.message.type.length !== 0) {
      setSubmitMsg(userCart.message);
      if (submitMsg.type === "success") {
        setSubmitMsgStyle({
          border: "solid green 1px",
          background: "#a5cca5",
          color: "white",
          padding: "20px 30px",
          borderRadius: "10px",
          position: "absolute",
        });
      } else {
        setSubmitMsgStyle({
          border: "solid red 1px",
          background: "#f1b4b3",
          color: "white",
          padding: "20px 30px",
          borderRadius: "10px",
          position: "absolute",
        });
      }
    }
    if(!loggedIn){
      navigate('/login')
      toast.error('You need to login first')
    }
    const payload  ={
      productId: id,
      productQuantity: 1
    }

    const res = await axios.post(`http://localhost:8000/api/cart/addcart/${userId}`,payload)
    // console.log(addToCart);
   
    if(res.status === 200){
      toast.success(res.data)
    }else{
       toast.error("error occured")
    } 
    
}
  return (

   
    <Box>
      <Box
        sx={{
          top: "0",
          marginTop: "-10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={submitMsgStyle}>
          <Typography>{submitMsg.msg}</Typography>
        </Box>
      </Box>
      <Box>
        <Link to={"/cart"} style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box
              sx={{
                background: "red",
                padding: "4px 7px",
                borderRadius: "50%",
                color: "white",
                position: "absolute",
                top: "0",
              }}
            >
              {/* {userCart.noOfProducts} */}
            </Box>
            <Box
              sx={{
                background: "Blue",
                color: "white",
                padding: "5px 10px",
                marginTop: "3px",
                borderRadius: "20%",
              }}
            >
              Cart
            </Box>
          </Box>
        </Link>
      </Box>
      <Grid container key={id}>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <Box sx={{}}>
            <img src={"emptyImage"} alt="Product" />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                margin: "20px 0",
              }}
            >
              <Button variant="contained"> {`<<`} </Button>
              <Button variant="contained"> {`>> `}</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box>
                <Typography>PRODUCT DETAILS</Typography>
              </Box>
              <Box sx={{ textAlign: "left" }}>
              <Typography>Name: {product?.name}</Typography>
                <Typography>Category: {product?.category} </Typography>
                <Typography>Brand: {product?.brand}</Typography>
                <Typography>Price: Rs. {product?.price}</Typography>
                <Typography>Available Quantity: {product?.Quantity}</Typography>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="p">{'description'}</Typography>
              </Box>
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box>
                <Box
                  sx={{
                    border: "solid blue 2px",
                    margin: "10px 0 20px 0",
                    boxShadow: "5px 10px #888888",
                  }}
                >
                  <Box sx={{ margin: "5px 0" }}>
                    <Typography variant="h4">
                      Select required number of quantities
                    </Typography>
                  </Box>
                  <Box>
                    <Box sx={{ textAlign: "center" }}>
                      <TextField
                        id="quantity"
                        label="My Quantity"
                        // defaultValue={quty}
                        InputProps={{
                          readOnly: true,
                        }}
                        value={'0'}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "10px 0",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        // onClick={handleDecrease}
                      >
                        Decrease
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        // onClick={handleIncrease}
                      >
                        Increase
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    color="success"
                    // onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    ADD to Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          <Box>
            <Typography>Extra details</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  
  
  )
}

export default Product