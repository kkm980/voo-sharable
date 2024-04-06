import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  supportingLangs: string[];
  name: string;
  count: number;
  loading: boolean;
  multiLangInputListStore: any[];
};

const initialState = {
    supportingLangs: ["m"],
    name: "ram",
    count: 0,
    loading: true,
} as CounterState;

export const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
        console.log("hi");
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.count -= action.payload;
    },
    addName: (state, action: PayloadAction<string>) => {
        state.name+= action.payload;
    },
    setSupportingLangs: (state, action: PayloadAction<string>) => {
        state.supportingLangs.push(action.payload);
        console.log("supporting", state.supportingLangs, action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMultiLangInputListStore: (state, action: PayloadAction<any>) => {
      console.log("fist", action.payload);
      state.multiLangInputListStore = {...action.payload};
    },
  },
});

export const {
  increment,
  incrementByAmount,
  decrement,
  addName,
  setSupportingLangs,
  decrementByAmount,
  reset,
  setLoading,
  setMultiLangInputListStore
} = counter.actions;
export default counter.reducer;
