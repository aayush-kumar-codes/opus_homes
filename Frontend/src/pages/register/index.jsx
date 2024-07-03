import React from "react";
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
import {
  RegisterDetails,
  registerValidateSchema,
} from "../../utiles/validation";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../../components/button";
import { axiosInstance } from "../../axios";

const Register = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    confirm_password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerValidateSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoader(true);
      try {
        const response = await axiosInstance.post("user/register/", values);
        if (response.status) {
          toast.success("Register Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          formik.resetForm();
          navigate("/");
        } else {
          toast.error(response.message, {
            position: "top-right",
            autoClose: 5000,
          });
          setLoader(false);
        }

        console.log("Success:", response);
      } catch (error) {
        console.error("Error:", error);
        setLoader(false);
        toast.error("Server Issue", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    },
  });

  return (
    <Stack
      sx={{
        height: "100vh",
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
          backgroundColor: "rgba(255, 255, 255, 0.50)",
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
            Register
          </Typography>
          {RegisterDetails.map((e, i) => (
            <Stack sx={{ width: "100%" }} key={i}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {e.label}
              </Typography>
              <TextField
                required
                type={e.type}
                key={i}
                placeholder={`Enter ${e.label}`}
                id={e.id}
                variant="outlined"
                sx={{ width: "100%" }}
                value={formik.values[e.id]}
                onChange={formik.handleChange}
                // error={formik.touched[e.id] && Boolean(formik.errors[e.id])}
                // helperText={formik.touched[e.id] && formik.errors[e.id]}
              />
            </Stack>
          ))}

          <Box sx={{ width: "100%" }}>
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
          </Box>

          <ButtonComponent
            text={
              loader ? (
                <CircularProgress size={"1.5rem"} color="inherit" />
              ) : (
                "Register"
              )
            }
          />

          <Typography variant="body2" align="center">
            {" "}
            Already Have Account?{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              Login Here
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Register;
