import { configureStore } from "@reduxjs/toolkit";
import priceSlice from "./priceSlice";
const store = configureStore({
  reducer: {
    priceSlice,
  },
});
export default store;
