import { createSlice } from "@reduxjs/toolkit";
import { data } from '../utils/data';
const initialState = {
  data,
  column: 0,
  row: 0,
};

export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    changeValue: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.store.name === action.payload.storeId) {
          const newMonths = item.months.map((month) => {
            if (month.id === action.payload.id) {
              return {
                ...month,
                value: action.payload.value,
              };
            }
            return month;
          });

          return {
            ...item,
            months: newMonths,
          };
        }
        return item;
      });
    },
  },
});

export const actionPriceSlice = priceSlice.actions;

export default priceSlice.reducer;
