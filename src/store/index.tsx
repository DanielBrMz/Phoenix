import { configureStore } from "@reduxjs/toolkit";
import predictionSlice from "./predictions-slice";

const store = configureStore({
  reducer: {
    settings: predictionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
