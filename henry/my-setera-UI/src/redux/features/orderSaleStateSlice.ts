import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type orderSaleState = {
  orderSaleState: any;
};

const initialState: orderSaleState = {
  orderSaleState: []
};

export const orderSaleStateSlice = createSlice({
  name: "orderSale",
  initialState,
  reducers: {
    setorderSaleState: (state, action: PayloadAction<Object>) => {
      state.orderSaleState = action.payload;
    },
    getorderSaleState: (state) => state.orderSaleState,
    resetOrderSale: (state) => {
      state.orderSaleState = [];
    }
  }
});

export const {
  setorderSaleState,
  getorderSaleState,
  resetOrderSale
} = orderSaleStateSlice.actions;

export default orderSaleStateSlice.reducer;