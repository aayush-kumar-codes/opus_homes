import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../../components/button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { axiosInstance } from "../../axios";
import { CrmFormDetails, CRMValidateSchema } from "../../utiles/validation";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { DeleteForever } from "@mui/icons-material";

const ProjectMangementDetails = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [fetchedDataLoader, setFetchedDataLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    home_interested_in: "",
    Size_of_home: "",
    date: "",
    time_frame: "",
    financing_option: "",
    hero: "",
  };

  useEffect(() => {
    const data = async () => {
      setFetchedDataLoader(true);
      try {
        const response = await axiosInstance.get(`/dashboard/records_crm/`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (response.status) {
          console.log(response.data);
          const data = response?.data?.filter((details) => {
            return details.id === parseInt(Cookies.get("id"));
          });
          console.log(data, "jkghcf");
          setUserData(...data);
        }
      } catch (error) {
        console.log(error);
      }
      setFetchedDataLoader(false);
    };
    data();
  }, []);

  useEffect(() => {
    if (userData?.first_name && userData?.last_name) {
      formik.setValues({
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email,
        phone: userData?.phone,
        home_interested_in: userData?.home_interested_in,
        Size_of_home: userData?.Size_of_home,
        date: userData?.date,
        time_frame: userData?.time_frame,
        financing_option: userData?.financing_option,
        hero: userData?.hero,
      });
    }
    console.log(userData, "nkvcg");
  }, [userData]);

  const handleDelete = async () => {
    setDeleteLoader(true);
    try {
      const response = await axiosInstance.delete(
        `dashboard/records_crm/${Cookies.get("id")}/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
        });
        setTimeout(() => {
          navigate("/dashboard/projectmanagement");
        }, 2000);
        // navigate("/dashboard/projectmanagement");
      } else {
        toast.error(response.data.message || "Error submitting form", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server Issue", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    setDeleteLoader(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CRMValidateSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const response = await axiosInstance.patch(
          `dashboard/records_crm/${Cookies.get("id")}/`,
          values,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (response.status) {
          console.log(response.data.message, "khgjhc");
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
          });
          // formik.resetForm();
          // navigate("/dashboard/projectmanagement");
        } else {
          toast.error(response.data.message || "Error submitting form", {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Server Issue", {
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <ToastContainer />
      <Stack
        sx={{
          width: "100%",
          maxWidth: "800px",
          p: 3,
          borderRadius: 2,
          backgroundImage: "linear-gradient(to right, lightgrey,#E9E9E9)",
          backdropFilter: "blur(15px)",
        }}
        spacing={3}
      >
        <Box textAlign="end">
          <DeleteForever
            onClick={handleDelete}
            fontSize="large"
            sx={{
              color: "red",
              cursor: "pointer",
              ":hover": { color: "black" },
            }}
          />
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, textAlign: "center" }}
          >
            Update CRM Form
          </Typography>
        </Box>

        {fetchedDataLoader ? (
          <Box textAlign={"center"}>
            {" "}
            <CircularProgress size={"1.5rem"} color="inherit" />
          </Box>
        ) : (
          <Paper component="form" onSubmit={formik.handleSubmit}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2, md: 4 }}
            >
              <Stack width={{ xs: "100%", md: "50%" }} spacing={2}>
                {CrmFormDetails.map((field, index) => (
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
                      formik.touched[field.id] &&
                      Boolean(formik.errors[field.id])
                    }
                    helperText={
                      formik.touched[field.id] && formik.errors[field.id]
                    }
                  />
                ))}
              </Stack>
              <Stack width={{ xs: "100%", md: "50%" }} spacing={2}>
                <FormControl>
                  <InputLabel id="home_interested_in">Home Type</InputLabel>
                  <Select
                    fullWidth
                    id="home_interested_in"
                    name="home_interested_in"
                    value={formik.values.home_interested_in}
                    onChange={formik.handleChange}
                    variant="outlined"
                    label="Home Type"
                    error={
                      formik.touched.home_interested_in &&
                      Boolean(formik.errors.home_interested_in)
                    }
                    onBlur={formik.handleBlur}
                    // helperText={
                    //   formik.touched.home_interested_in &&
                    //   formik.errors.home_interested_in
                    // }
                  >
                    <MenuItem value="" disabled>
                      --Select--
                    </MenuItem>
                    <MenuItem value="1">Flat</MenuItem>
                    <MenuItem value="2">Duplex</MenuItem>
                    <MenuItem value="3">House</MenuItem>
                  </Select>
                  {formik.touched.home_interested_in &&
                    formik.errors.home_interested_in && (
                      <Typography
                        variant="body2"
                        fontSize={"12px"}
                        ml={2}
                        color="error"
                      >
                        {formik.errors.home_interested_in}
                      </Typography>
                    )}
                </FormControl>
                <FormControl>
                  <InputLabel id="Size_of_home">Home Size</InputLabel>
                  <Select
                    fullWidth
                    id="Size_of_home"
                    name="Size_of_home"
                    value={formik.values.Size_of_home}
                    onChange={formik.handleChange}
                    variant="outlined"
                    label="Home Size"
                    error={
                      formik.touched.Size_of_home &&
                      Boolean(formik.errors.Size_of_home)
                    }
                    onBlur={formik.handleBlur}
                    // helperText={
                    //   formik.touched.Size_of_home && formik.errors.Size_of_home
                    // }
                  >
                    <MenuItem value="" disabled>
                      --Select--
                    </MenuItem>
                    <MenuItem value="1">1000 sq.ft</MenuItem>
                    <MenuItem value="2">1200 sq.ft</MenuItem>
                    <MenuItem value="3">1500 sq.ft</MenuItem>
                    <MenuItem value="4">2000 sq.ft</MenuItem>
                  </Select>
                  {formik.touched.Size_of_home &&
                    formik.errors.Size_of_home && (
                      <Typography
                        variant="body2"
                        fontSize={"12px"}
                        ml={2}
                        color="error"
                      >
                        {formik.errors.Size_of_home}
                      </Typography>
                    )}
                </FormControl>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      required
                      id="date"
                      name="date"
                      value={
                        formik.values.date ? dayjs(formik.values.date) : null
                      }
                      onChange={(date) =>
                        formik.setFieldValue(
                          "date",
                          date ? dayjs(date).format("YYYY-MM-DD") : null
                        )
                      }
                      onBlur={formik.handleBlur}
                      // error={formik.touched.date && Boolean(formik.errors.date)}
                      // helperText={formik.touched.date && formik.errors.date}
                      // renderInput={(params) => (
                      //   <TextField
                      //     {...params}
                      //     fullWidth
                      //     error={
                      //       formik.touched.date && Boolean(formik.errors.date)
                      //     }
                      //     helperText={formik.touched.date && formik.errors.date}
                      //   />
                      // )}
                    />
                  </LocalizationProvider>
                  {formik.touched.date && formik.errors.date && (
                    <Typography
                      variant="body2"
                      fontSize={"12px"}
                      ml={2}
                      color="error"
                    >
                      {formik.errors.date}
                    </Typography>
                  )}
                </FormControl>

                <FormControl>
                  <InputLabel id="financing_option">Financing</InputLabel>
                  <Select
                    fullWidth
                    id="financing_option"
                    name="financing_option"
                    value={formik.values.financing_option}
                    onChange={formik.handleChange}
                    variant="outlined"
                    label="Financing"
                    error={
                      formik.touched.financing_option &&
                      Boolean(formik.errors.financing_option)
                    }
                    onBlur={formik.handleBlur}
                    // helperText={
                    //   formik.touched.financing_option &&
                    //   formik.errors.financing_option
                    // }
                  >
                    <MenuItem value="" disabled>
                      --Select--
                    </MenuItem>
                    <MenuItem value="1">Credit Card</MenuItem>
                    <MenuItem value="2">Netbanking</MenuItem>
                    <MenuItem value="3">Online</MenuItem>
                  </Select>
                  {formik.touched.financing_option &&
                    formik.errors.financing_option && (
                      <Typography
                        variant="body2"
                        fontSize={"12px"}
                        ml={2}
                        color="error"
                      >
                        {formik.errors.financing_option}
                      </Typography>
                    )}
                </FormControl>
                <FormControl>
                  <InputLabel id="hero">Hero Choices</InputLabel>
                  <Select
                    fullWidth
                    id="hero"
                    name="hero"
                    value={formik.values.hero}
                    onChange={formik.handleChange}
                    variant="outlined"
                    label="Hero Choices"
                    error={formik.touched.hero && Boolean(formik.errors.hero)}
                    onBlur={formik.handleBlur}
                    // helperText={formik.touched.hero && formik.errors.hero}
                  >
                    <MenuItem value="" disabled>
                      --Select--
                    </MenuItem>
                    <MenuItem value="NONE">None</MenuItem>
                    <MenuItem value="VETERAN">Veteran</MenuItem>
                    <MenuItem value="TEACHER">Teacher</MenuItem>
                    <MenuItem value="FIRST_RESPONDER">First Responder</MenuItem>
                    <MenuItem value="MEDICAL_PROFESSIONAL">
                      Medical Professional
                    </MenuItem>
                  </Select>
                  {formik.touched.hero && formik.errors.hero && (
                    <Typography
                      variant="body2"
                      fontSize={"12px"}
                      ml={2}
                      color="error"
                    >
                      {formik.errors.hero}
                    </Typography>
                  )}
                </FormControl>
              </Stack>
            </Stack>
            <Stack
              gap={1}
              my={3}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: { xs: "center", md: "none" },
              }}
            >
              <Box>
                <ButtonComponent
                  text={
                    loader ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Update"
                    )
                  }
                  styles={{ bgcolor: "#417BF9" }}
                  type="submit"
                />
              </Box>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

export default ProjectMangementDetails;
