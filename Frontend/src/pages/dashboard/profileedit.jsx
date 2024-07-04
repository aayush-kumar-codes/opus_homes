import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../../components/button";
import { axiosInstance } from "../../axios";
import { UpdateDetails, updateValidateSchema } from "../../utiles/validation";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [fetchedDataLoader, setFetchedDataLoader] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = async () => {
      setFetchedDataLoader(true);
      try {
        const response = await axiosInstance.get("/user/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status) {
          setUserData(response.data);
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
      });
    }
  }, [userData]);

  const initialValues = {
    first_name: "",
    last_name: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: updateValidateSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const response = await axiosInstance.patch("/user/profile/", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status) {
          toast.success("Profile Details Updated Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          formik.resetForm();
        } else {
          toast.error(response.message, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error("Server Issue", {
          position: "top-right",
          autoClose: 5000,
        });
      }
      setLoader(false);
    },
  });

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <Paper
        component={"form"}
        sx={{ width: { xs: "80%", sm: "50%" } }}
        style={{
          borderRadius: "20px",
          backgroundImage: "linear-gradient(to right, lightgrey,#E9E9E9)",
          //   backgroundColor: "rgba(255, 255, 255, 0.50)",
          backdropFilter: "blur(15px)",
          border: "2px solid rgba(255, 255, 255, 0.1)",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Stack spacing={2} sx={{ alignItems: "center", p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontSize: "calc(20px + 2vmin)", fontWeight: 600 }}
          >
            Update Profile Details
          </Typography>
          {fetchedDataLoader ? (
            <Box textAlign={"center"}>
              {" "}
              <CircularProgress size={"1.5rem"} color="inherit" />
            </Box>
          ) : (
            <>
              {" "}
              {UpdateDetails.map((e, i) => (
                <Stack sx={{ width: "100%" }} key={i}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {e.label}
                  </Typography>
                  <TextField
                    // required
                    type={e.type}
                    key={i}
                    placeholder={`Enter ${e.label}`}
                    id={e.id}
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={formik.values[e.id]}
                    onChange={formik.handleChange}
                    error={formik.touched[e.id] && Boolean(formik.errors[e.id])}
                    helperText={formik.touched[e.id] && formik.errors[e.id]}
                  />
                </Stack>
              ))}
            </>
          )}

          {/* <Box sx={{ width: "100%" }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Role
            </Typography>
            <Select
              required
              id="role"
              name="role"
              onChange={formik.handleChange}
              value={formik.values.role}
              sx={{ width: "100%" }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                --Select--
              </MenuItem>
              <MenuItem value="1">Admin</MenuItem>
              <MenuItem value="2">Superintendent</MenuItem>
              <MenuItem value="3">Sales Associate</MenuItem>
            </Select>
          </Box> */}

          <ButtonComponent
            text={
              loader ? (
                <CircularProgress size={"1.5rem"} color="inherit" />
              ) : (
                "Update"
              )
            }
            // disable={!formik.dirty}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ProfileEdit;
