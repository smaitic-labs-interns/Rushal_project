import { lazy , Suspense } from 'react';
import './App.css';
import Signup from "./components/Signup"
import Search from './components/Search';
import Home from "./components/Home"
import Login from './components/Login';
import {Toaster} from "react-hot-toast"
import {Routes , Route , Router} from 'react-router-dom'
import Profile from './features/Profile';
import { useSelector } from 'react-redux';
import React from 'react';
import Product from './features/product';
import Cart from './features/cart';
import AddressForm from './features/placeOrder';
import TrackOrder from './features/trackOrder';
import Navbar from './features/navbar';
import { Drawer } from './Admin/drawer';
import PrivateRoute from './routes/privateRoute';
import PublicRoute from './routes/publicRoute';

function App() {
  // const isAuthenticated = getToken();
  const {role} = useSelector(state => state.user)
  React.useEffect(()=> {
    console.log(role);
  }, [role])
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
    <Route path = '/admin' element = {<Drawer/>}/>
 
    </Routes>
    {/* <Router>
        <Routes>
          <PublicRoute
            path="/login"
            isAuthenticated={true}
          >
            <Login />
          </PublicRoute>
          <PublicRoute
            path="/register"
            // isAuthenticated={isAuthenticated}
          >
            <Signup />
          </PublicRoute>
          <PublicRoute
            path="/forgot-password"
            // isAuthenticated={isAuthenticated}
          >
          
          </PublicRoute>
          <PrivateRoute
            path="/"
            // isAuthenticated={isAuthenticated}
          >

          </PrivateRoute>
          <Route path="*">
            
          </Route>
        </Routes>
    </Router> */}

 
   </div>

   </>
  );
}

export default App;
