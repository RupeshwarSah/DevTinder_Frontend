import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRuquests: (state, action) => {
      return action.payload;
    },
    removeRuquests: (state, action) => {
      return null;
    },
  },
});

export const { addRuquests, removeRuquests } = requestSlice.actions;
export default requestSlice.reducer;
