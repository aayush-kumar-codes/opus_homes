import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import {
  CrmFormDetails,
  NewJobEntryDetails,
  newJobEntryValidateSchema,
} from "../../utiles/validation";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ButtonComponent from "../../components/button";
import dayjs from "dayjs";

const NewJobEntry = () => {
  const [userData, setUserData] = useState([]);
  const [fetchedDataLoader, setFetchedDataLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const initialValues = {
    job_name: "",
    job_address: "",
    // job_id: "",
    job_model: "",
    contract_type: "",
    contract_price: "",
    projected_start_date: "",
    projected_completed_date: "",
    permit_municipalities: "",
    owner_first_name: "",
    owner_last_name: "",
    owner_current_address: "",
    owner_phone_number: "",
    owner_email: "",
    // owner_id: "",
    living_sqft: "",
    total_sqft: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: newJobEntryValidateSchema,
    onSubmit: async (values) => {
      setLoader(true);
      console.log(values, "valll");
      try {
        const response = await axiosInstance.post("user/admin_form/", values, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (response.status) {
          console.log(response.data.message);
          toast.success("New Job Entry Registered Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          formik.resetForm();
        } else {
          toast.error(response.data.message || "Error submitting form", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.detail ||"Server Issue", {
          position: "top-right",
          autoClose: 5000,
        });
      }
      setLoader(false);
    },
  });

  return (
    <Box
      sx={{
        borderRadius: "20px",
        backgroundImage: "linear-gradient(to right, lightgrey,#E9E9E9)",
        backdropFilter: "blur(15px)",
        p: 1,
      }}
    >
      <ToastContainer />
      <Typography
        variant="h4"
        align="center"
        sx={{ fontSize: "calc(20px + 2vmin)", fontWeight: 600 }}
      >
        New Job Entry
      </Typography>
      <Paper component="form" onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "stretch", p: 4, justifyContent: "start" }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="job_name"
              name="job_name"
              label="Job Name"
              variant="outlined"
              value={formik.values.job_name}
              onChange={formik.handleChange}
              error={formik.touched.job_name && Boolean(formik.errors.job_name)}
              helperText={formik.touched.job_name && formik.errors.job_name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="job_address"
              name="job_address"
              label="Job Address"
              variant="outlined"
              value={formik.values.job_address}
              onChange={formik.handleChange}
              error={
                formik.touched.job_address && Boolean(formik.errors.job_address)
              }
              helperText={
                formik.touched.job_address && formik.errors.job_address
              }
            />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled
              fullWidth
              id="job_id"
              name="job_id"
              label="Job Id"
              variant="outlined"
              value={formik.values.job_id}
              onChange={formik.handleChange}
              error={formik.touched.job_id && Boolean(formik.errors.job_id)}
              helperText={formik.touched.job_id && formik.errors.job_id}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={4}>
            <Select
              id="job_model"
              name="job_model"
              onChange={formik.handleChange}
              value={formik.values.job_model}
              sx={{ width: "100%" }}
              displayEmpty
              error={
                formik.touched.job_model && Boolean(formik.errors.job_model)
              }
              onBlur={formik.handleBlur}
            >
              <MenuItem value="" disabled>
                --Select--
              </MenuItem>
              <MenuItem value="1">1634</MenuItem>
              <MenuItem value="2">1845</MenuItem>
              <MenuItem value="3">2234</MenuItem>
              <MenuItem value="4">2603</MenuItem>
              <MenuItem value="5">custom</MenuItem>
            </Select>
            {formik.touched.job_model && formik.errors.job_model && (
              <Typography
                variant="body2"
                fontSize={"12px"}
                ml={2}
                color="error"
              >
                {formik.errors.job_model}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Select
              id="contract_type"
              name="contract_type"
              onChange={formik.handleChange}
              value={formik.values.contract_type}
              sx={{ width: "100%" }}
              displayEmpty
              error={
                formik.touched.contract_type &&
                Boolean(formik.errors.contract_type)
              }
              onBlur={formik.handleBlur}
            >
              <MenuItem value="" disabled>
                --Select--
              </MenuItem>
              <MenuItem value="1">construction loan</MenuItem>
              <MenuItem value="2">Cash</MenuItem>
              <MenuItem value="3">Deed over</MenuItem>
            </Select>
            {formik.touched.contract_type && formik.errors.contract_type && (
              <Typography
                variant="body2"
                fontSize={"12px"}
                ml={2}
                color="error"
              >
                {formik.errors.contract_type}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="contract_price"
              name="contract_price"
              label="Contract Price"
              variant="outlined"
              value={formik.values.contract_price}
              onChange={formik.handleChange}
              error={
                formik.touched.contract_price &&
                Boolean(formik.errors.contract_price)
              }
              helperText={
                formik.touched.contract_price && formik.errors.contract_price
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  label="Projected Start Date"
                  id="projected_start_date"
                  name="projected_start_date"
                  value={
                    formik.values.projected_start_date
                      ? dayjs(formik.values.projected_start_date)
                      : null
                  }
                  onChange={(date) =>
                    formik.setFieldValue(
                      "projected_start_date",
                      date ? dayjs(date).format("YYYY-MM-DD") : null
                    )
                  }
                  onBlur={formik.handleBlur}
                  //   renderInput={(params) => <TextField {...params} />}
                  // error={formik.touched.projected_start_date && Boolean(formik.errors.projected_start_date)}
                  // helperText={formik.touched.projected_start_date && formik.errors.projected_start_date}
                  //   renderInput={(params) => (
                  //     <TextField
                  //       {...params}
                  //       fullWidth
                  //       error={
                  //         formik.touched.projected_start_date &&
                  //         Boolean(formik.errors.projected_start_date)
                  //       }
                  //       helperText={
                  //         formik.touched.projected_start_date &&
                  //         formik.errors.projected_start_date
                  //       }
                  //     />
                  //   )}
                />
              </LocalizationProvider>
              {formik.touched.projected_start_date &&
                formik.errors.projected_start_date && (
                  <Typography
                    variant="body2"
                    fontSize={"12px"}
                    ml={2}
                    color="error"
                  >
                    {formik.errors.projected_start_date}
                  </Typography>
                )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  label="Projected Completed Date"
                  id="projected_completed_date"
                  name="projected_completed_date"
                  value={
                    formik.values.projected_completed_date
                      ? dayjs(formik.values.projected_completed_date)
                      : null
                  }
                  onChange={(date) =>
                    formik.setFieldValue(
                      "projected_completed_date",
                      date ? dayjs(date).format("YYYY-MM-DD") : null
                    )
                  }
                  onBlur={formik.handleBlur}
                  //   renderInput={(params) => <TextField {...params} />}
                  // error={formik.touched.projected_completed_date && Boolean(formik.errors.projected_completed_date)}
                  // helperText={formik.touched.projected_completed_date && formik.errors.projected_completed_date}
                  //   renderInput={(params) => (
                  //     <TextField
                  //       {...params}
                  //       fullWidth
                  //       error={
                  //         formik.touched.projected_completed_date &&
                  //         Boolean(formik.errors.projected_completed_date)
                  //       }
                  //       helperText={
                  //         formik.touched.projected_completed_date &&
                  //         formik.errors.projected_completed_date
                  //       }
                  //     />
                  //   )}
                />
              </LocalizationProvider>
              {formik.touched.projected_completed_date &&
                formik.errors.projected_completed_date && (
                  <Typography
                    variant="body2"
                    fontSize={"12px"}
                    ml={2}
                    color="error"
                  >
                    {formik.errors.projected_completed_date}
                  </Typography>
                )}
            </FormControl>
          </Grid>
          {NewJobEntryDetails.map((field, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <TextField
                key={index}
                fullWidth
                id={field.id}
                name={field.id}
                label={field.label}
                variant="outlined"
                value={formik.values[field.id]}
                onChange={formik.handleChange}
                error={
                  formik.touched[field.id] && Boolean(formik.errors[field.id])
                }
                helperText={formik.touched[field.id] && formik.errors[field.id]}
              />
            </Grid>
          ))}
        </Grid>
        <Box my={3} textAlign="center">
          <ButtonComponent
            text={
              loader ? <CircularProgress size={24} color="inherit" /> : "Submit"
            }
            styles={{ bgcolor: "#417BF9" }}
            type="submit"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default NewJobEntry;
