import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increaseQuantity(state, action) {
      let index = state.findIndex((obj) => obj.id === action.payload);
      state[index].count++;
    },
    decreaseQuantity(state, action) {
      let index = state.findIndex((obj) => obj.id === action.payload);
      if (state[index].count === 1) {
        state.splice(index, 1);
      } else {
        state[index].count--;
      }
    },
    addItem(state, action) {
      let a = state.find((obj) => obj.id === action.payload.id);
      if (a === undefined) {
        state.push(action.payload);
      } else {
        let b = state.findIndex((obj) => obj.id === action.payload.id);
        state[b].count++;
      }
    },
    rmItem(state, action) {
      let index = state.findIndex((obj) => obj.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export let { increaseQuantity, decreaseQuantity, addItem, rmItem } =
  cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
