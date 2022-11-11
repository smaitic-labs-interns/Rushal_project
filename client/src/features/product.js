import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import baseAxi from "../axiosUrl/axios.base";
import { cartEnd, productEnd } from "../axiosUrl/axios.endpoint";
import DialogContentText from "@mui/material/DialogContentText";

const Product = ({ userCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = React.useState();
  const { userId, loggedIn, role } = useSelector((state) => state.user);
  const [qty, setQty] = React.useState(1);
  const [submitMsg, setSubmitMsg] = React.useState({});
  const [submitMsgStyle, setSubmitMsgStyle] = React.useState({
    display: "none",
  });
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState();
  const [quantity, setQuantity] = React.useState();
  const [remove, setRemove] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      // const res = await axI(productEnd.getProductById)
      const res = await axios.get(`http://localhost:8000/api/product/${id}`);
      setProduct(res.data);
      setPrice(res.data.price);
      setQuantity(res.data.Quantity);
    };
    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      price: price,
      quantity: quantity,
    },
    onSubmit: async (values) => {
      const payload = {
        price: values.price,
        Quantity: values.quantity,
      };
      const res = await baseAxi({
        apiDetails: productEnd.updateProduct,
        path: { id: id },
        body: payload,
      });

      try {
        if (res.status === 200) {
          navigate(0);
          toast.success("Product has been updated");
        }
      } catch (err) {
        toast.error("Error occured");
      }
    },
  });

  const handleIncrease = () => {
    setQty(qty + 1);
  };

  const handleDecrease = () => {
    qty !== 1 ? setQty(qty - 1) : toast.error("Quantity cannot be less than 1");
  };

  const handleClick = async () => {
    if (!loggedIn) {
      navigate("/login");
      toast.error("You need to login first");
    }
    const payload = {
      productId: id,
      productQuantity: qty,
    };
    const cartRes = await baseAxi({
      apiDetails: cartEnd.addCart,
      path: { userid: userId },
      body: payload
    });
    console.log(cartRes);
    if (cartRes && cartRes.status === 200) {
      toast.success("Quantity added to cart");
    } else {
      toast.error("Error occur adding to cart");
    }
  };
  const handleUpdate = async () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveOpen = async () => {
    setRemove(true);
  };
  const handleRemoveClose = async () => {
    setRemove(false);
  };
  const handleDelete = async () => {
    const res = await baseAxi({
      apiDetails: productEnd.removeProduct,
      path: { id: id },
    });

    try {
      if (res.status === 200) {
        navigate("/");
        toast.success("Product has been deleted");
      }
    } catch (err) {
      toast.error("Error occured");
    }
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Enter Price"
            type="number"
            fullWidth
            variant="standard"
            required
            defaultValue={price}
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Enter Quantity"
            type="number"
            fullWidth
            variant="standard"
            required
            defaultValue={quantity}
            value={formik.values.quantity}
            onChange={formik.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={formik.handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={remove}
        onClose={handleRemoveClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
                  <Typography>
                    Available Quantity: {product?.Quantity}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="p">{"description"}</Typography>
                </Box>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box>
                  {role !== "admin" && (
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
                            InputProps={{
                              readOnly: true,
                            }}
                            value={qty}
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
                            onClick={handleDecrease}
                          >
                            Decrease
                          </Button>
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={handleIncrease}
                          >
                            Increase
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {role !== "admin" && (
                      <Button
                        variant="contained"
                        color="success"
                        // onClick={handleBuyNow}
                      >
                        Buy Now
                      </Button>
                    )}
                    {role === "admin" && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleUpdate}
                      >
                        Update
                      </Button>
                    )}

                    {role === "admin" && (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={handleRemoveOpen}
                      >
                        Delete
                      </Button>
                    )}
                    {role !== "admin" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                      >
                        ADD to Cart
                      </Button>
                    )}
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
    </>
  );
};

export default Product;
