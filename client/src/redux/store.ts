import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: userSlice,
});

const saveToLocalStorage = (state: ReturnType<typeof store.getState>) => {
  localStorage.setItem("user", JSON.stringify(state.user));
};

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
