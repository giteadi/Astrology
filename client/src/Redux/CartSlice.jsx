import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],  // You will now store cart items with title, description, etc.
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const { item_id, title, description, price, quantity } = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find((item) => item.item_id === item_id);

      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If the item does not exist, add it to the cart
        state.cartItems.push({ item_id, title, description, price, quantity });
      }
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.item_id !== action.payload);
    },

    // Update item quantity in the cart
    updateCartItem: (state, action) => {
      const { item_id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.item_id === item_id);
      if (item) {
        item.quantity = quantity;
      }
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
