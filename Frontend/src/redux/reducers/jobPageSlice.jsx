import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/Store";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: [],
};

const jobPageSlice = createSlice({
  name: "jobPageOne",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    jobPageOneSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = [...state.data, action.payload];
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = action.payload;
    },
    resetSliceReducer1(state) {
    //   state.isError = false;
    //   state.isLoading = false;
      state.isSuccess = false;
    //   state.data = [];
    },
  },
});

export function fetched0Data1() {
  return async () => {
    dispatch(jobPageSlice.actions.startLoading());
    try {
      const response = await axiosInstance.get(
        `admin-form/${Cookies.get("job_id")}/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status) {
        dispatch(jobPageSlice.actions.jobPageOneSuccess(response.data));
      }
    } catch (e) {
     dispatch(jobPageSlice.actions.hasError(e));
    }
  };
}

export const { startLoading, hasError, jobPageOneSuccess, resetSliceReducer1 } =
  jobPageSlice.actions;

export default jobPageSlice.reducer;
