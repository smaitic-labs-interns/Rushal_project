import React from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import { Box, Button } from '@mui/material';
import { logout } from '../reducer/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { removeId } from '../reducer/orderSlice';
import { Outlet } from 'react-router-dom';


const Navbar = () => {
  const {firstName} = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loggedIn} = useSelector(state => state.user)
  const {orderId} = useSelector(state => state.order)

  const handleLogout = ()=>{
   dispatch(
      logout()
    )
    dispatch(
      removeId()
    )
  }
  const handleClick = ()=>{
    navigate('/login')
    // alert('hello')
  }
  const handleNext = () =>{
    navigate('/register')
  }
  return (
    <>
    <Box
    sx={{ marginBottom: '100px'}}>
    <AppBar
    position="fixed"
    sx={{
      marginleft: "5px",
      width: `100%`,
     
    }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Link  style={{ color:'Black', textDecoration: 'inherit'}} to="/" > <MenuItem
           style={{ paddingRight: 700 , paddingLeft : 20 }}
            >LOGO</MenuItem></Link>

        <nav style= {{
          display : 'flex',
          flexDirection : 'row'
        }}>
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/search"> <MenuItem
              style={{ paddingLeft: 20 }}
            >Search Product</MenuItem></Link>
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/cart"><MenuItem
              style={{ paddingLeft: 20}}
            > Cart</MenuItem></Link>
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/profile">
            <MenuItem
             style={{ paddingLeft: 20 }}
            > Profile</MenuItem>
          </Link>
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/trackorder">
            <MenuItem
             style={{ paddingLeft: 20 }}
            > Track Order</MenuItem>
          </Link>
          
        </nav>
        <Avatar alt={firstName} src="avatar.png" />
        {loggedIn ? (
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{ my: 1, mx: 1.5 }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ my: 1, mx: 1.5 }}
            onClick={handleClick}
          >
            {" "}
            Signin{" "}
          </Button>
        )}
         {loggedIn ? (
          <Button>   
          </Button>
        ) : (
          <Button
        variant="contained"
        sx={{ my: 0, mb: 1 }}
        onClick={handleNext}>
          Register
        </Button>
        )}
       
      </Toolbar>
    </AppBar>
    </Box>
    <Outlet />
    </>
  );
}

export default Navbar