import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { loginValidationSchema } from "../validation/validation";
import baseAxi from "../axiosUrl/axios.base";
import { userEnd } from "../axiosUrl/axios.endpoint";
import { useDispatch } from "react-redux";
import { login } from "../reducer/userSlice";
import { useSelector } from "react-redux";
import MainAdmin from "../Admin/mainAdmin";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {role} = useSelector(state => state.user)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginValidationSchema,

    onSubmit: async (values) => { 
   try{
    const res = await baseAxi({apiDetails: userEnd.login,body:values});
    const resData = res.data;
    console.log(resData.data.role);
     if (res.status === 200 && resData.data.role === 'admin'){
      dispatch(
        login({
          userId: resData.data._id,
          firstName: resData.data.fname,
          lastName: resData.data.lname,
          email: resData.data.email,
          contact: resData.data.contact,
          role: resData.data.role
        })
      );
      navigate('/admin')
    }
    else if (res.status === 200 ){
      
      dispatch(
        login({
          userId: resData.data._id,
          firstName: resData.data.fname,
          lastName: resData.data.lname,
          email: resData.data.email,
          contact: resData.data.contact,
          role: resData.data.role
        })
      );
      navigate("/");
   
      toast.success("welcome" + ' ' + resData.data.fname + ' ' + resData.data.lname);
    }
   
   }catch(err){
    toast.error("Invalid email Password");
   }
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>

        <Typography component="h1" variant="h5">
          Sign in
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
