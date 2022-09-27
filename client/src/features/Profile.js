import React from 'react'
import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux'

const Profile = () => {
  const {orderId} = useSelector((state)=> state.order)
  console.log(orderId);
  const {firstName , lastName} = useSelector(state => state.user)
  console.log(firstName );
  return (
    <Container sx={{ maxWidth: '100%' }}>
        <Typography component= "h1" variant="h5">
              {firstName +' '+ lastName} is logged in 
            
        </Typography>
        
        <Typography component= "h1" variant="h5"> 
              {orderId} is your order id
        </Typography>
        
        </Container>
  )
}

export default Profile