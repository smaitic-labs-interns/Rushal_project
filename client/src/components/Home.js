import React from 'react';
import axios from 'axios'
import Products from './Products';
import Navbar from '../features/navbar';

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
    <Navbar />
      <h1>Ecommerce portal</h1>
   
  
      <Products products = {products} />
      
    </>
  );
};

export default Home;
