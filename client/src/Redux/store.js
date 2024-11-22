// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import Cart from '../pages/Cart';
import cartReducer from '../Redux/CartSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});