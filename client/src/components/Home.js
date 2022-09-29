import React from 'react';

import Products from './Products';
import baseAxi from '../axiosUrl/axios.base';
import { productEnd } from '../axiosUrl/axios.endpoint';

const Home = () => {
  
  const [products , setProducts] = React.useState()
  React.useEffect(()=>{
    const fechData = async ()=>{
      const res = await baseAxi({apiDetails:productEnd.allProduct})
      const allProducts = res.data
      setProducts(allProducts)
    }
    fechData()
  }, [])
  if(!products) return<div>loading</div>

  
  return products && (
    <>
      <Products products = {products} />
      <h1>Ecommerce portal</h1>
      
    </>
  );
};

export default Home;
