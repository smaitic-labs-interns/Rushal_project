import React from 'react'
import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux'

const Profile = () => {

  const {firstName , lastName} = useSelector(state => state.user)
  console.log(firstName );
  return (
    <Container sx={{ maxWidth: '100%' }}>
        <Typography component= "h1" variant="h5">
              {firstName +' '+ lastName} is logged in
        </Typography>
       
        </Container>
  )
}

export default Profile