import React from 'react'
import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux'
import axios from 'axios';
import Box from '@mui/material/Box';
const Profile = () => {
  const {orderId} = useSelector(state => state.order)
  const { userId } = useSelector((state) => state.user);
  const [ordered , setOrdered] = React.useState();
  console.log(orderId);
  const {firstName , lastName , email, contact} = useSelector(state => state.user)
  console.log(firstName);
  console.log(email);

  React.useEffect(() => {
    const fetchData = async () => {
      // const res = await axI(cartEnd.getCartByUserId)
      const res = await axios.get(
        `http://localhost:8000/api/order/getallorders/${userId}`
      );
      setOrdered(res.data);
    };
  
    fetchData();
  }, []);

console.log(ordered);

  return (
    <>
      <Container sx={{ maxWidth: "100%" }}>
    <Box sx={{ display: "flex", flexDirection: "column", padding: "0 20px" }}
          >
      
          <h1>Your Profile</h1>
         
          <table border={1}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th> Contact </th>
              </tr>
            </thead>
            <tbody>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>{contact}</td>
            </tbody>
          </table>
         
          </Box>
      </Container>

      {ordered ? (
        <>
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "0 20px" }}
          >
            <h1>Your Order History</h1>
            <table border={1}>
              <thead>
                <tr>
                  <th>OrderId</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {ordered["data"].map((order) => {
                  return (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      {/* <td>{product.Quantity}</td> */}
                      <td>{order.totalcost}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </>
      ) : (
        <Box>no order found</Box>
      )}
    </>
  ); }
export default Profile