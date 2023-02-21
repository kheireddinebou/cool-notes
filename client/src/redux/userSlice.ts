import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/user";

export interface UserState {
  user: UserModel;
}

const userJson = localStorage.getItem("user");

const initialState: UserState = {
  user: userJson ? JSON.parse(userJson) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
