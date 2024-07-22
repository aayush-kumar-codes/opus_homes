import { combineReducers } from "@reduxjs/toolkit";
import jobPageSlice from "./jobPageSlice";
import jobPageSliceTwo from "./jobPageSliceTwo";

const rootReducer = combineReducers({
  jobPageSlice: jobPageSlice,
  jobPageSliceTwo:jobPageSliceTwo
});

export default rootReducer;
