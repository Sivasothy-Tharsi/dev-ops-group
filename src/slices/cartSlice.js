import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;

      const existingItem = state.cartItems.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ productId, quantity });
      }
    },

      removeFromCart: (state, action) => {
        return state.filter(item => item.id !== action.payload);
      },
      editCart: (state, action) => {
        const { itemId, quantity } = action.payload;
        const itemIndex = state.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          state[itemIndex].quantity = quantity;
        }
      },
  },
});

export const { addToCart, removeFromCart, editCart } = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
