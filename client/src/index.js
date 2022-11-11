import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
import store from './store';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

import { AdminApp } from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store)
const path = window.location.pathname.includes('/admin')? true : false

root.render(
  
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate persistor={persistor}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* <BrowserRouter> */}
    {/* {!path? (
      <>
    <Navbar />
    <App />
    </>
    ): (<AdminApp/>)} */}
     <App />
    {/* </BrowserRouter> */}
    </ThemeProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
