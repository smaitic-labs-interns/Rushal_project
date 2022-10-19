import './App.css';
import Signup from "./components/Signup"
import Search from './components/Search';
import Home from "./components/Home"
import Login from './components/Login';
import {Toaster} from "react-hot-toast"
import {Routes , Route} from 'react-router-dom'
import Profile from './features/Profile';
import { useSelector } from 'react-redux';
import React from 'react';
import Product from './features/product';
import Cart from './features/cart';
import AddressForm from './features/placeOrder';
import TrackOrder from './features/trackOrder';
import Navbar from './features/navbar';
function App() {
  const {firstName} = useSelector(state => state.user)
  React.useEffect(()=> {
    console.log(firstName);
  }, [firstName])
  return (
   <>
   <div className='App'>
    <Navbar />
   <Toaster />
   <Routes>
    <Route path = '/register' element = {<Signup />}/>
    <Route path = '/' element = {<Home />}/>
    <Route path = '/login' element = {<Login />}/>
    <Route path = '/search' element = {<Search />}/>
    <Route path = '/profile' element = {<Profile />}/>
    <Route path = '/product/:id' element = {<Product />}/>
    <Route path = '/cart/' element = {<Cart/>}/>
    <Route path = '/checkout' element = {<AddressForm/>}/>
    <Route path = '/trackorder' element = {<TrackOrder/>}/>
 
    </Routes>
   </div>

   </>
  );
}

export default App;
