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

const jobPageSliceTwo = createSlice({
  name: "jobPageTwo",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    jobPageTwoSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      const newData = action.payload;
      const index = state.data.findIndex(item =>`${item.job_record.job_id}` ===  Cookies.get("job_id"));
      console.log(index,"index")
      if (index !== -1) {
        state.data[index] = newData;
      } else {
        state.data = [...state.data, newData];
      }
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = action.payload;
    },
    resetSliceReducer2(state) {
    //   state.isError = false;
    //   state.isLoading = false;
      state.isSuccess = false;
    //   state.data = [];
    },
  },
});

export function JobPageEntry() {
  return async () => {
    dispatch(jobPageSliceTwo.actions.startLoading());
    try {
      const response = await axiosInstance.get(
        `admin-form/entries/${Cookies.get("job_id")}/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status) {
        dispatch(jobPageSliceTwo.actions.jobPageTwoSuccess(response.data));
      }
    } catch (e) {
     dispatch(jobPageSliceTwo.actions.hasError(e));
    }
  };
}

export const { startLoading, hasError, jobPageTwoSuccess, resetSliceReducer2 } =
  jobPageSliceTwo.actions;

export default jobPageSliceTwo.reducer;
