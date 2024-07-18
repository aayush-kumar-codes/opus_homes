import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
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
import CustTable from "../../components/table/jobpagetable";
import { MyContext } from "../../context/ContextProvider";

const JobPage = () => {
  const [userData, setUserData] = useState({});
  const [fetchedDataLoader, setFetchedDataLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editedUsers, setEditedUsers] = useState({});
  const [jobPageResponse, setJobPageResponse] = useState({});
  const [fetchedData, setFetchedData] = useState();
  const [contractAmountPaid, setContractAmountPaid] = useState("");
  const [contractAmountPaidStatus, setContractAmountPaidStatus] = useState("");
  const [contractAmountPaidResponse, setContractAmountPaidResponse] = useState({});
  const { jobListStatus, setJobListStatus } = useContext(MyContext);

  const subItems = [
    "Premilinaries",
    "Phase 1",
    "Phase 2",
    "Phase 3",
    "Phase 4",
  ];
  const itemsToInsertAfter = [
    "Utility Hook-Ups",
    "Foundation",
    "Dry-IN",
    "Drywall",
    "Flooring Labor",
  ];

  const addRowsAfterItems = (data) => {
    let newData = [];
    data.forEach((item, index) => {
      newData.push(item);
      if (itemsToInsertAfter.includes(item.items)) {
        const additionalRows = [
          {
            id: "",
            items: subItems[0],
            status: "",
            cost: "",
            paid: "",
            payment_type: "",
            Sub_Contractor: "",
          },
        ];
        newData = newData.concat(additionalRows);
        itemsToInsertAfter.splice(0, 1);
        subItems.splice(0, 1);
      }
    });
    return newData;
  };

  useEffect(() => {
    const data = async () => {
      setFetchedDataLoader(true);
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
          setUserData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setFetchedDataLoader(false);
      }, 2000);
      setJobListStatus(false);
    };
    data();
  }, [jobListStatus]);

  useEffect(() => {
    const entries = async () => {
      setLoader(true);
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
          console.log(response.data, "entries");
          const newData = addRowsAfterItems(response.data.response);
          setFetchedData(newData);
          setJobPageResponse(response.data.job_record);
        }
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
      setJobListStatus(false);
      setContractAmountPaidStatus(false);
    };
    setFetchedData();
    entries();
  }, [jobListStatus]);

  useEffect(() => {
    if (userData?.job_name && userData?.job_address) {
      formik.setValues({
        job_name: userData?.job_name,
        job_id: userData?.job_id,
        job_address: userData?.job_address,
        job_model: userData?.job_model,
        contract_type: userData?.contract_type,
        contract_price: userData?.contract_price,
        projected_start_date: userData?.projected_start_date,
        projected_completed_date: userData?.projected_completed_date,
        permit_municipalities: userData?.permit_municipalities,
        owner_first_name: userData?.owner_first_name,
        owner_last_name: userData?.owner_last_name,
        owner_current_address: userData?.owner_current_address,
        owner_phone_number: userData?.owner_phone_number,
        owner_email: userData?.owner_email,
        owner_id: userData?.owner_id,
        living_sqft: userData?.living_sqft,
        total_sqft: userData?.total_sqft,
      });
    }
  }, [userData]);

  const initialValues = {
    job_name: "",
    job_address: "",
    job_id: "",
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
    owner_id: "",
    living_sqft: "",
    total_sqft: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: newJobEntryValidateSchema,
    // onSubmit: async (values) => {
    //   setLoader(true);
    //   console.log(values, "valll");
    //   try {
    //     const response = await axiosInstance.post("user/admin_form/", values, {
    //       headers: {
    //         Authorization: `Bearer ${Cookies.get("token")}`,
    //       },
    //     });
    //     if (response.status) {
    //       console.log(response.data.message);
    //       toast.success("New Job Entry Registered Successfully", {
    //         position: "top-right",
    //         autoClose: 5000,
    //       });
    //       formik.resetForm();
    //     } else {
    //       toast.error(response.data.message || "Error submitting form", {
    //         position: "top-right",
    //         autoClose: 5000,
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //     toast.error(error.response.data.detail || "Server Issue", {
    //       position: "top-right",
    //       autoClose: 5000,
    //     });
    //   }
    //   setLoader(false);
    // },
  });

  const financeTypeName = (data) => {
    switch (data) {
      case 1:
        return "construction loan";
      case 2:
        return "Cash";
      default:
        return "Deed over";
    }
  };
  
  const handleAddTodo=()=>{
    toast.success("Added Todo Successfully")
  }

  const handleChangeOrder=()=>{
    toast.success("Order Changed Successfully")
  }

  const handleContractAmoundPaid = async (value) => {
    const data = {
      contract_amount_paid:value
    };
    try {
      const response = await axiosInstance.post(
        `admin-form/entries/${Cookies.get("job_id")}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status) {
        setContractAmountPaidResponse(response.data)
        setContractAmountPaid("")
        setContractAmountPaidStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontSize: "calc(20px + 2vmin)", fontWeight: 600, mb: 1 }}
      >
        Job Page
      </Typography>
      {fetchedDataLoader ? (
        <Box textAlign={"center"}>
          {" "}
          <CircularProgress size={"1.5rem"} color="inherit" />
        </Box>
      ) : (
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <ToastContainer />
          <Stack
            width={"80%"}
            sx={{
              borderRadius: "20px",
              backgroundImage: "linear-gradient(to right, lightgrey,#E9E9E9)",
              backdropFilter: "blur(15px)",
              display: "flex",
              flexDirection: "row",
              gap: 1,
              p: 1,
            }}
          >
            <Box width={"100%"}>
    
              {/* <Typography
                variant="h4"
                align="center"
                sx={{ fontSize: "calc(20px + 2vmin)", fontWeight: 600 }}
              >
                Job Page
              </Typography> */}
              <>
                {/* {fetchedDataLoader ? (
      <Box textAlign={"center"}>
        {" "}
        <CircularProgress size={"1.5rem"} color="inherit" />
      </Box>
    ) : userData ? (
      <Paper component="form" onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "stretch", p: 4, justifyContent: "start" }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled
              fullWidth
              id="job_name"
              name="job_name"
              label="Job Name"
              variant="outlined"
              value={formik.values.job_name}
              onChange={formik.handleChange}
              error={
                formik.touched.job_name && Boolean(formik.errors.job_name)
              }
              helperText={formik.touched.job_name && formik.errors.job_name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled
              fullWidth
              id="job_owner"
              name="job_owner"
              label="Job Owner"
              variant="outlined"
              value={
                formik.values.owner_first_name +
                " " +
                formik.values.owner_last_name
              }
              onChange={formik.handleChange}
              error={
                formik.touched.job_owner && Boolean(formik.errors.job_owner)
              }
              helperText={formik.touched.job_owner && formik.errors.job_owner}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled
              fullWidth
              id="job_address"
              name="job_address"
              label="Job Address"
              variant="outlined"
              value={formik.values.job_address}
              onChange={formik.handleChange}
              error={
                formik.touched.job_address &&
                Boolean(formik.errors.job_address)
              }
              helperText={
                formik.touched.job_address && formik.errors.job_address
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled
              fullWidth
              id="job_id"
              name="job_id"
              label="Job Id"
              variant="outlined"
              value={formik.values.job_id}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel disabled id="job_model">
                Job Model
              </InputLabel>
              <Select
                disabled
                id="job_model"
                name="job_model"
                onChange={formik.handleChange}
                value={formik.values.job_model}
                variant="outlined"
                label="Job Model"
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
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel disabled id="contract_type">
                Finance Type
              </InputLabel>
              <Select
                fullWidth
                disabled
                id="contract_type"
                name="contract_type"
                onChange={formik.handleChange}
                variant="outlined"
                label="Contract Type"
                value={formik.values.contract_type}
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
              {formik.touched.contract_type &&
                formik.errors.contract_type && (
                  <Typography
                    variant="body2"
                    fontSize={"12px"}
                    ml={2}
                    color="error"
                  >
                    {formik.errors.contract_type}
                  </Typography>
                )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              disabled
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
                  disabled
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
                  disabled
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
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              disabled
              fullWidth
              id="owner_id"
              name="owner_id"
              label="Owner Id"
              variant="outlined"
              value={formik.values.owner_id}
            />
          </Grid>
          {NewJobEntryDetails.map((field, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <TextField
                key={index}
                disabled
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
                helperText={
                  formik.touched[field.id] && formik.errors[field.id]
                }
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
    ) : (
      <Box my={2} textAlign={"center"}>
        No Data Found
      </Box>
    )} */}
              </>

              {fetchedDataLoader ? (
                <Box textAlign={"center"}>
                  {" "}
                  <CircularProgress size={"1.5rem"} color="inherit" />
                </Box>
              ) : userData?.job_name ? (
                <Grid
                  container
                  spacing={2}
                  sx={{ alignItems: "stretch", p: 4, justifyContent: "start" }}
                >
                  <Grid item xs={12}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Job Start Date :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {userData?.projected_start_date}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Job Name :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {userData?.job_name}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Job Address :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {userData?.job_address}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        % of Completion :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        100%
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Job Owner :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {userData?.owner_first_name +
                          " " +
                          userData?.owner_last_name}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Finance Type :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {financeTypeName(userData?.contract_type)}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ) : (
                <Box my={2} textAlign={"center"}>
                  No Data Found
                </Box>
              )}
              {!fetchedDataLoader && jobPageResponse?.job && (
                <Grid
                  container
                  spacing={2}
                  sx={{ alignItems: "stretch", p: 4, justifyContent: "start" }}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Contract Price ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {userData?.contract_price}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Completed ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.completed_items}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Total Uncompleted ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.uncompleted_items}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Contract Amount Paid ($):
                      </Typography>
                      <TextField
                        type="text"
                        placeholder="Enter Your Contract Amount Paid"
                        value={contractAmountPaid}
                        onChange={(e) => {
                          if (e.target.value >= 0) {
                            setContractAmountPaid(e.target.value);
                          } else {
                            toast.error("Invalid value")
                          }
                        }}
                        sx={{
                          ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              height: "1px",
                              backgroundColor: "#fff",
                            },
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleContractAmoundPaid(contractAmountPaid)
                            console.log(contractAmountPaid, "amount");
                          }
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Completed Paid ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.completed_items_paid}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Total Cost ($) :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.total_cost}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Contract Amount Owed ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {contractAmountPaidStatus?contractAmountPaidResponse?.payment_owed:jobPageResponse?.payment_owed}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Completed Unpaid ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.completed_items_unpaid}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              )}
              <Box sx={{ overflow: "auto" }} mb={4}>
                {/* {loader ? (
              <Box textAlign={"center"}>
                <CircularProgress size={"1rem"} />
              </Box>
            ) : ( */}
                <Box>
                  {!fetchedDataLoader && userData?.job_name && fetchedData && (
                    <CustTable
                      fetchedData={fetchedData}
                      editedUsers={editedUsers}
                      setEditedUsers={setEditedUsers}
                      setJobPageResponse={setJobPageResponse}
                      setFetchedData={setFetchedData}
                    />
                  )}
                </Box>
                {/* )} */}
              </Box>
            </Box>
          </Stack>
          <Stack width={"20%"} gap={1}>
            <Box width={"100%"} border="2px solid #000">
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                To Do's
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  p: 2,
                }}
                height={"500px"}
              >
                <ButtonComponent text={"Add"} onClick={handleAddTodo}/>
              </Box>
            </Box>
            <Box width={"100%"} border="2px solid #000">
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                Change Orders
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  p: 2,
                }}
                height={"500px"}
              >
                <ButtonComponent text={"Add"} onClick={handleChangeOrder}/>
              </Box>
            </Box>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default JobPage;
