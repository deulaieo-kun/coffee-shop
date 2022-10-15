import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import userReducer from './reducers/userReducer';
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import promise from "redux-promise";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    activeUser: userReducer,
  },
  middleware: [
    thunk,
    promiseMiddleware,
    promise,
    logger,
]
});

export default store;
