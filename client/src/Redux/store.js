import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import cartReducer from './CartSlice'; // Assuming you have a cart slice

// Import persist functionality
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Local storage

// Set up persist config
const persistConfig = {
  key: 'root', // Key for localStorage
  storage,     // Storage type
  whitelist: ['auth'], // Only persist the auth slice
};

// Persisted reducer for auth
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the store with the persisted auth reducer
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: cartReducer,
  },
});

// Create the persistor to handle state rehydration
export const persistor = persistStore(store);
