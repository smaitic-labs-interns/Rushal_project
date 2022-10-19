import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import {Routes , Route} from 'react-router-dom'
import AddressForm from "./placeOrder";

const Cart = () => {
  const { userId } = useSelector((state) => state.user);

  const [cart, setCart] = React.useState();
  const displayToast = () => {
    if(cart) {
      console.log(cart);
      toast.success("Your item are in Cart");
      <Routes>
      <Route path ='/checkout' element = {<AddressForm/>}/>
      </Routes> 
    } else {
      toast.error("No items on Cart");
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      // const res = await axI(cartEnd.getCartByUserId)
      const res = await axios.get(
        `http://localhost:8000/api/cart/getcart/${userId}`
      );
      setCart(res.data);
    };

    fetchData();
  }, []);

  return cart && (
  
      <>
        <h1>user Cart</h1>
        <table border={1}>
          <thead>
            <tr>
              <th>ProductId</th>
              <th>quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart["Products"].map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.Quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button
          href="/checkout"
          color="primary"
          variant="contained"
          onClick={displayToast}
        >
          {" "}
          Check out
        </Button>

        <form></form>
      </>
  );
};

export default Cart;
