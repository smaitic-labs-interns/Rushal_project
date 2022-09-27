import React from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { logout } from '../reducer/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';




const Navbar = () => {
  const {firstName} = useSelector(state => state.user)
  const navigate = useNavigate()
  const userLogout = useDispatch()
  const {loggedIn} = useSelector(state => state.user)
  const handleClick = ()=>{
    navigate('/login')
    // alert('hello')
  }
  return (
    <AppBar
    position="fixed"
    sx={{
      marginleft: "5px",
      width: `100%`,
    }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography
          textAlign="left"
          variant="h5"
          noWrap
          sx={{ flexGrow: 1 }}
          style={{ color: 'inherit', textDecoration: 'inherit'}}
          
        >
          Ecommerce
        </Typography>
        
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
          
        </nav>
        <Avatar alt={firstName} src="avatar.png" />
        {loggedIn ? (
          <Button
            onClick={() => userLogout(logout())}
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
      </Toolbar>
    </AppBar>
  );
}

export default Navbar