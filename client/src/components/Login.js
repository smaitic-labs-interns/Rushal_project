import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate()
    const handlesubmit = async (e)=>{
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const formData = {    
          password : data.get('password'),
          email: data.get('email')  
        }
        console.log(formData);
        const res = await fetch('http://localhost:8000/api/user/signin' , {
            method :  'POST' , 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
          })
      
          const resData = await res.json()
          
          if(res.status === 400){
            toast.error("Invalid password or email") 
            return;
          }else if(res.status === 200){
            navigate('/')
            toast.success(resData.data)
          }
          console.log(resData);
        }
        
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
        Sign in
      </Typography>
      <Box component="form" onSubmit={handlesubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
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
          <Grid item xs> 
          </Grid>
          <Grid item>
            <Link href="register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  )
}
export default Login;