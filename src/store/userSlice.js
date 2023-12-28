import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      console.log(state.name);
      state.name = "park";
    },
    increaseAge(state, a) {
      state.age += a.payload;
    },
  },
});

export let { changeName, increaseAge } = user.actions;

export default user;
