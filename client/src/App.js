import './App.css';
import Signup from "./components/Signup"
import Search from './components/Search';
import Home from "./components/Home"
import Login from './components/Login';
import {Toaster} from "react-hot-toast"
import {Routes , Route} from 'react-router-dom'




function App() {
  return (
   <>
   <div className='App'>
   <Toaster />
   <Routes>
    <Route path = '/register' element = {<Signup />}/>
    <Route path = '/' element = {<Home />}/>
    <Route path = '/login' element = {<Login />}/>
    <Route path = '/search' element = {<Search />}/>
    </Routes>
   </div>

   </>
  );
}

export default App;
