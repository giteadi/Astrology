import { createSlice } from '@reduxjs/toolkit';

// **Cart Slice Definition**
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [], // Array to store cart items
    totalAmount: 0, // Total amount of the cart
  },
  reducers: {
    // **Add item to cart**
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem.name === item.name);

      if (existingItem) {
        // If the item is already in the cart, increase the quantity
        existingItem.quantity += 1;
      } else {
        // Add a new item to the cart
        state.cartItems.push({ ...item, quantity: 1 });
      }

      // Recalculate the total amount
      state.totalAmount = state.cartItems.reduce(
        (total, cartItem) => total + parseFloat(cartItem.price.replace('₹', '')) * cartItem.quantity,
        0
      );
    },

    // **Remove item from cart**
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.name !== action.payload.name);

      // Recalculate the total amount after removal
      state.totalAmount = state.cartItems.reduce(
        (total, cartItem) => total + parseFloat(cartItem.price.replace('₹', '')) * cartItem.quantity,
        0
      );
    },

    // **Clear cart**
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
});

// **Export Actions and Reducer**
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
