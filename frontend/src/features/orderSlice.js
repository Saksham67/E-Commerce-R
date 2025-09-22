// import Cart from "../pages/Cart";

// const orderData = {
//   orderItems: cartItem.map((item) => ({
//     product: item._id, // product ID
//     qty: item.qty,
//   })),
//   shippingAddress: {
//     address: form.address,
//     city: form.city,
//     postalCode: form.postalCode,
//     country: form.country,
//   },
//   phone: form.phone,
//   paymentMethod: selectedPaymentMethod, // "COD" or "Online"
// };
// await API.post("/orders", orderData);


// export default orderSlice;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],   // ✅ corrected
  order: []
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload); // ✅ use cartItems
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    placeOrder: (state) => {
      state.order.push(...state.cartItems);
      state.cartItems = [];
    }
  }
});

export const { addToCart, removeFromCart, placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
