import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducer/userSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'

const reducers = combineReducers({
  user : userSlice
  
}) 
const persistConfig = {
  key: 'root',
  version : 1,
  storage
}
const persistedReducer = persistReducer(persistConfig , reducers)
const store = configureStore({
  reducer: persistedReducer
})
export default store