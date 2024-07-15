import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { LoginDetails, loginValidateSchema } from "../../utiles/validation";
import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidateSchema,
    onSubmit: async (values) => {
      console.log(values);
      setLoader(true);
      try {
        const response = await axiosInstance.post("user/login/", values);
        if (response.status) {
          toast.success("Login Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          console.log(response.data);
          Cookies.set("token", response.data.token);
          Cookies.set("user_role", response.data.user_role);
          formik.resetForm();
          navigate("/dashboard");
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
        if (error?.response?.status === (404 || 400)) {
          toast.error(error.response.data.detail, {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error(error.response.data, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      }
    },
  });
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <Stack
      sx={{
        // backgroundImage:
        //   "linear-gradient(to right bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))",
        justifyContent: "center",
        alignItems: "center",
        //boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
        height: "100vh",
        // width: "100%",
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
            Login
          </Typography>
          {LoginDetails.map((e, i) => (
            <Stack sx={{ width: "100%" }} key={i}>
              <Typography variant="body2" mb={1} sx={{ fontWeight: 600 }}>
                {e.label}
              </Typography>
              <TextField
                // required
                type={i === 0 ? "text" : showPassword ? "text" : "password"}
                id={e.id}
                placeholder={`Enter ${e.label}`}
                variant="outlined"
                sx={{ width: "100%" }}
                value={formik.values[e.id]}
                onChange={formik.handleChange}
                error={formik.touched[e.id] && Boolean(formik.errors[e.id])}
                helperText={formik.touched[e.id] && formik.errors[e.id]}
                InputProps={{
                  endAdornment: i !== 0 && (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          ))}
          {/* <Link to="/reset-password" style={{ textDecoration: "none" }}>
            <Typography variant="body2" align="center">
              {" "}
              Forgot Password
            </Typography>
          </Link> */}

          <ButtonComponent
            text={
              loader ? (
                <CircularProgress size={"1.5rem"} color="inherit" />
              ) : (
                "Login"
              )
            }
            styles={{ bgcolor: "#417BF9" }}
          />

          <Typography variant="body2" align="center">
            {" "}
            Don&apos;t have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register Here
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Login;
