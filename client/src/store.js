import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducer/userSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import orderSlice from './reducer/orderSlice'



const reducers = combineReducers({
  user : userSlice,
  order : orderSlice
}) 
const persistConfig = {
  key: 'root',
  version : 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig , reducers)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})
let persistor = persistStore(store)
export default store