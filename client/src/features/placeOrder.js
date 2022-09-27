import * as React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from '@mui/material';


export default function PlaceOrder() {


    const {userId} = useSelector(state => state.user)

    const [values , setValues] = React.useState()

    const handleClick = async () => {

      const payload = {
        
          shipmentAddress: {  
                charge: 150,
                status: "received"
            },
            Payment:{
                status: "Paid"
            }
      }  
         const res = await axios.post(`http://localhost:8000/api/order/placeorder/${userId}` , payload)

        console.log(res);

         if(res.status === 200){
            toast.success(res.data)
          }else{
             toast.error("error occured")
          } 
    }
   
 
  return (
    <>
   <div>Order Summary </div>
 


   <Button type="submit"
          variant="contained"
        //   onClick={handleClick}
          sx={{ mt: 3, mb: 2 }}>Order Now</Button>
            
          </>
            
  );
}




