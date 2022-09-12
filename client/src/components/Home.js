import React from 'react';
import axios from 'axios'
import Products from './Products';

const Home = () => {
  const [products , setProducts] = React.useState()
  React.useEffect(()=>{
    const fethData = async ()=>{
      const res = await axios.get('http://localhost:8000/api/product') 
      const allProducts = res.data
      setProducts(allProducts)
    }
    fethData()
  }, [])
  if(!products) return<div>loading</div>

  
  return products && (
    <>
      <h1>Home</h1>
      
      <Products products = {products} />
    </>
  );
};

export default Home;
