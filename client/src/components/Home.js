import React from 'react';
import axios from 'axios'
import Products from './Products';
import { Grid , Link } from '@mui/material';

const Home = () => {
  
  const [products , setProducts] = React.useState()
  React.useEffect(()=>{
    const fechData = async ()=>{
      const res = await axios.get('http://localhost:8000/api/product') 
      const allProducts = res.data
      setProducts(allProducts)
    }
    fechData()
  }, [])
  if(!products) return<div>loading</div>

  
  return products && (
    <>
      <h1>Ecommerce portal</h1>
      <Grid item>
            <Link href="search" variant="body2">
              Search for items?
            </Link>
          </Grid>
  
      <Products products = {products} />
      
    </>
  );
};

export default Home;
