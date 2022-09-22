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

function App() {
  const {firstName} = useSelector(state => state.user)
  React.useEffect(()=> {
    console.log(firstName);
  }, [firstName])
  return (
   <>
   <div className='App'>
   <Toaster />
   <Routes>
    <Route path = '/register' element = {<Signup />}/>
    <Route path = '/' element = {<Home />}/>
    <Route path = '/login' element = {<Login />}/>
    <Route path = '/search' element = {<Search />}/>
    <Route path = '/profile' element = {<Profile />}/>
    <Route path = '/product/:id' element = {<Product />}/>
    </Routes>
   </div>

   </>
  );
}

export default App;
