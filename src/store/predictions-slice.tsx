import { createSlice } from "@reduxjs/toolkit";

const predictionSlice = createSlice({
  name: "predictionSlice",
  initialState: {
    startOver: false,
  },
  reducers: {
    stayInPredictions(state) {
      state.startOver = false;
    },
    leavePredictions(state) {
      state.startOver = true;
    },
  },
});

export const predictionsActions = predictionSlice.actions;
export default predictionSlice;
