import "./App.css";
import Signup from "./components/Signup";
import Search from "./components/Search";
import Home from "./components/Home";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Profile from "./features/Profile";
import { useSelector } from "react-redux";
import React from "react";
import Product from "./features/product";
import Cart from "./features/cart";
import AddressForm from "./features/placeOrder";
import TrackOrder from "./features/trackOrder";
import NotAuth from "./components/notAuth";
import MainAdmin from "./Admin/mainAdmin";
import Navbar from "./features/navbar";
import { BrowserRouter } from "react-router-dom";
function App() {
  // const isAuthenticated = getToken();
  const { role, loggedIn } = useSelector((state) => state.user);

  React.useEffect(() => {
    console.log(role);
  }, [role, loggedIn]);

  const RequireAuth = ({ children }) => {
    return loggedIn ? children : <NotAuth />;
  };
  const ProtectedRoute = ({ children }) => {
    return loggedIn && role === 'admin' ? children : <NotAuth />;
  };
  return (
    <>
      <div className="App">
        <Toaster />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="search" element={<Search />} />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart/" element={<Cart />} />
            <Route path="checkout" element={<AddressForm />} />
            <Route path="trackorder" element={<TrackOrder />} />
          </Route>
          <Route path="/admin">
            <Route
              index
              element={
                <ProtectedRoute>
              <MainAdmin />
              </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
