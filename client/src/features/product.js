import React from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Product = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = React.useState()
  // console.log(product);
  const { userId, loggedIn } = useSelector(state => state.user)
  
  React.useEffect(() => {
    const fetchData = async () => {
      // const res = await axI(productEnd.getProductById)
      const res = await axios.get(`http://localhost:8000/api/product/${id}`)
      setProduct(res.data)
    }
    fetchData()
  }, [])

  const handleClick = async () => {
    if(!loggedIn){
      navigate('/login')
      toast.error('You need to login first')
    }
    const payload  ={
      productId: id,
      productQuantity: 1
    }

    const res = await axios.post(`http://localhost:8000/api/cart/addcart/${userId}`,payload)
    // console.log(addToCart);
   
    if(res.status === 200){
      toast.success(res.data)
    }else{
       toast.error(res.data)
    } 
  }
  return (

    <Typography textAlign="left" variant="h6">
      {JSON.stringify(product)}
    This product id is {id}
    <Button type="submit"
          variant="contained"
          onClick={handleClick}
          sx={{ mt: 3, mb: 2 }}>Add to Cart</Button>
  </Typography>
  
  )
}

export default Product