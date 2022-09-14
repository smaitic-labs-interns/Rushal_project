import React from "react";
import {Avatar, Button, Grid , TextField, Typography , Link ,Box , Container} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import { registerValidationSchema } from "../validation/validation";
const Signup = () => {

const navigate = useNavigate()
const formik =  useFormik({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: ''
  },

  validationSchema: registerValidationSchema,
  onSubmit:  async (values) => {
    const res =  await fetch('http://localhost:8000/api/user/adduser' , {
              method :  'POST' , 
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
            })
            const resData = await res.json()
            
            console.log(resData);

            
            // const resData =  res.json()
  },
})
  // const handlesubmit = async (e)=>{
  //   e.preventDefault()
  //   const data = new FormData(e.currentTarget);
  //   const formData = {
  //     fname: data.get('firstName'),
  //     lname: data.get('lastName'),
  //     password : data.get('password'),
  //     email: data.get('email'),
  //     contact: data.get('contact')
  //   }
  //   console.log(formData);
   

  //   const res = await fetch('http://localhost:8000/api/user/adduser' , {
  //     method :  'POST' , 
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(formData)
  //   })

  //   console.log(res.status);
  //   const resData = await res.json()
    
  //   if(res.status === 400){
  //     toast.error("Somthing went wrong") 
  //     return
  //   }else if(res.status === 200){
  //     navigate('/login')
  //     toast.success(resData.data)
  //   }
  //   console.log(resData);
  // }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              type = "email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
               onChange={formik.handleChange}
               error={formik.touched.email && Boolean(formik.errors.email)}
               helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="contact"
              type = 'number'
              label="Contact"
              name="contact"
              autoComplete="phone no."
              value={formik.values.contact}
              onChange={formik.handleChange}
              error={formik.touched.contact && Boolean(formik.errors.contact)}
              helperText={formik.touched.contact && formik.errors.contact}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  );
};
export default Signup;
