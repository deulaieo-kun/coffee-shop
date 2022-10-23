import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import promise from "redux-promise";
import thunk from "redux-thunk";
import productReducer from "./reducers/productReducer";
import reviewReducer from "./reducers/reviewReducer";

const store = configureStore({
  reducer: {
    productList: productReducer,
    reviewList: reviewReducer
  },
  middleware: [
    thunk,
    promiseMiddleware,
    promise,
    logger,
]
});

export default store;
