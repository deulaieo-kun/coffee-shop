import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    activeUser: userReducer,
  },
});

export default store;
