import React from 'react'
import { Typography, TextField, Button, Box, Container } from '@mui/material'
import { toast } from 'react-hot-toast';
import Products from './Products';
import axios from 'axios';
import { productEnd } from '../axiosUrl/axios.endpoint';
import baseAxi from '../axiosUrl/axios.base';


const Search = () => {
  const [search , setSearch] = React.useState()
  const [products , setProducts] = React.useState()
 

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setSearch(data.get('search'))
    console.log(search);
    const res = await baseAxi({apiDetails: productEnd.search , path: {keyword: search}})
    const resData = res.data.data
   
    if (res.status === 400){
      toast.error(`no product found with name ${search}`)
      return;
    }else if(res.status === 200){
      setProducts(resData)
    }
  }
  return (
    <>
    <Container sx={{ maxWidth: '100%' }}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Search products
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="search"
                label="Search Products"
                name="search"
                autoComplete="search"
                autoFocus
                onInput ={(e) => setSearch(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Search
              </Button>
            </Box>
          </Box>
          <Box>
            {products && <Products products = {products}/>}
          </Box>
        </Container>
        </>
  )
}

export default Search