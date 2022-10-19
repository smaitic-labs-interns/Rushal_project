import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducer/userSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import orderSlice from './reducer/orderSlice'
import { persistCombineReducers } from 'redux-persist'



const reducers = combineReducers({
  user : userSlice,
  order : orderSlice
}) 
const persistConfig = {
  key: 'root',
  version : 1,
  storage,
  // blacklist: ['login']
}
const persistedReducer = persistReducer(persistConfig , reducers)
const store = configureStore({
  reducer: persistedReducer,
})

export default store