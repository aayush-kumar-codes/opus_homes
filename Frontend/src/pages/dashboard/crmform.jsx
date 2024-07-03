// import {
//   Box,
//   CircularProgress,
//   MenuItem,
//   Paper,
//   Select,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect } from "react";
// import { CrmFormDetails } from "../../utiles/validation";
// import { useFormik } from "formik";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ButtonComponent from "../../components/button";
// import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { axiosInstance } from "../../axios";

// const CRMForm = () => {
//   const [loader, setLoader] = React.useState(false);

//   const initialValues = {
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     home_interested_in: "",
//     Size_of_home: "",
//     date: "",
//     time_frame: "",
//     financing_option: "",
//     hero: "",
//   };

//   const formik = useFormik({
//     initialValues: initialValues,
//     //   validationSchema: ,
//     onSubmit: async (values) => {
//       console.log(values);
//       setLoader(true);
//       try {
//         const response = await axiosInstance.post("dashboard/crm/", values, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (response.status) {
//           toast.success("CRM Form Registered Successfully", {
//             position: "top-right",
//             autoClose: 5000,
//           });
//           formik.resetForm();
//           //   navigate("/");
//         } else {
//           toast.error(response.message, {
//             position: "top-right",
//             autoClose: 5000,
//           });
//         }
//         console.log("Success:", response);
//       } catch (error) {
//         console.error("Error:", error);
//         toast.error("Server Issue", {
//           position: "top-right",
//           autoClose: 5000,
//         });
//       }
//       setLoader(false);
//     },
//   });
//   return (
//     <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
//       <Typography variant="h4" sx={{ fontWeight: 600 }}>
//         CRM Form
//       </Typography>
//       <ToastContainer />
//       <Paper
//         component={"form"}
//         sx={{ width: { xs: "80%", sm: "50%" } }}
//         style={{
//           borderRadius: "20px",
//           backgroundColor: "rgba(255, 255, 255, 0.50)",
//           backdropFilter: "blur(15px)",
//           border: "2px solid rgba(255, 255, 255, 0.1)",
//         }}
//         onSubmit={formik.handleSubmit}
//       >
//         <Stack
//           sx={{
//             flexDirection: {lg:"row",md:"column"},
//             alignItems: "stretch",
//             justifyContent: "space-around",
//             p: 4,
//           }}
//         >
//           {/* <Typography
//           variant="h4"
//           align="center"
//           sx={{ fontSize: "calc(20px + 2vmin)", fontWeight: 600 }}
//         >
//           Register
//         </Typography> */}
//           <Stack gap={1}>
//             {CrmFormDetails.map((e, i) => (
//               <Stack sx={{ width: "100%" }} key={i}>
//                 <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                   {e.label}
//                 </Typography>
//                 <TextField
//                   required
//                   type={e.type}
//                   key={i}
//                   placeholder={`Enter ${e.label}`}
//                   id={e.id}
//                   variant="outlined"
//                   sx={{ width: "100%" }}
//                   value={formik.values[e.id]}
//                   onChange={formik.handleChange}
//                   // error={formik.touched[e.id] && Boolean(formik.errors[e.id])}
//                   // helperText={formik.touched[e.id] && formik.errors[e.id]}
//                 />
//               </Stack>
//             ))}
//           </Stack>
//           <Stack gap={1}>
//             <Box sx={{ width: "100%" }}>
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 Home Type
//               </Typography>
//               <Select
//                 required
//                 id="home_interested_in"
//                 name="home_interested_in"
//                 onChange={formik.handleChange}
//                 value={formik.values.home_interested_in}
//                 sx={{ width: "100%" }}
//                 displayEmpty
//               >
//                 <MenuItem value="" disabled>
//                   --Select--
//                 </MenuItem>
//                 <MenuItem value="1">Flat</MenuItem>
//                 <MenuItem value="2">Duplex</MenuItem>
//                 <MenuItem value="3">House</MenuItem>
//               </Select>
//             </Box>

//             <Box sx={{ width: "100%" }}>
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 Home Size
//               </Typography>
//               <Select
//                 required
//                 id="Size_of_home"
//                 name="Size_of_home"
//                 onChange={formik.handleChange}
//                 value={formik.values.Size_of_home}
//                 sx={{ width: "100%" }}
//                 displayEmpty
//               >
//                 <MenuItem value="" disabled>
//                   --Select--
//                 </MenuItem>
//                 <MenuItem value="1">1000 sq.ft</MenuItem>
//                 <MenuItem value="2">1200 sq.ft</MenuItem>
//                 <MenuItem value="3">1500 sq.ft</MenuItem>
//                 <MenuItem value="4">2000 sq.ft</MenuItem>
//               </Select>
//             </Box>

//             <Box sx={{ width: "100%" }}>
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 Date
//               </Typography>
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DemoContainer components={["DatePicker", "DatePicker"]}>
//                   <DatePicker
//                     id="date"
//                     name="date"
//                     value={dayjs(formik.values.date)}
//                     onChange={(date) =>
//                       formik.setFieldValue(
//                         "date",
//                         dayjs(date).format("YYYY-MM-DD")
//                       )
//                     }
//                   />
//                 </DemoContainer>
//               </LocalizationProvider>
//             </Box>

//             <Box sx={{ width: "100%" }}>
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 Financing
//               </Typography>
//               <Select
//                 required
//                 id="financing_option"
//                 name="financing_option"
//                 onChange={formik.handleChange}
//                 value={formik.values.financing_option}
//                 sx={{ width: "100%" }}
//                 displayEmpty
//               >
//                 <MenuItem value="" disabled>
//                   --Select--
//                 </MenuItem>
//                 <MenuItem value="1">Credit Card</MenuItem>
//                 <MenuItem value="2">Netbanking</MenuItem>
//                 <MenuItem value="3">Online</MenuItem>
//               </Select>
//             </Box>

//             <Box sx={{ width: "100%" }}>
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 Hero Choices
//               </Typography>
//               <Select
//                 required
//                 id="hero"
//                 name="hero"
//                 onChange={formik.handleChange}
//                 value={formik.values.hero}
//                 sx={{ width: "100%" }}
//                 displayEmpty
//               >
//                 <MenuItem value="" disabled>
//                   --Select--
//                 </MenuItem>
//                 <MenuItem value="NONE">None</MenuItem>
//                 <MenuItem value="VETERAN">Veteran</MenuItem>
//                 <MenuItem value="TEACHER">Teacher</MenuItem>
//                 <MenuItem value="FIRST_RESPONDER">First Responder</MenuItem>
//                 <MenuItem value="MEDICAL_PROFESSIONAL">
//                   Medical Professional
//                 </MenuItem>
//               </Select>
//             </Box>
//           </Stack>
//         </Stack>
//        <Box sx={{textAlign:"center",m:1}}>
//        <ButtonComponent
//           text={
//             loader ? (
//               <CircularProgress size={"1.5rem"} color="inherit" />
//             ) : (
//               "Submit"
//             )
//           }
//         />
//        </Box>
//       </Paper>
//     </Stack>
//   );
// };

// export default CRMForm;
import React, { useState } from "react";
import {
  Box,
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
import { CrmFormDetails } from "../../utiles/validation";

const CRMForm = () => {
  const [loader, setLoader] = useState(false);

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

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const response = await axiosInstance.post("dashboard/crm/", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status) {
          toast.success("CRM Form Registered Successfully", {
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
          backgroundImage:"linear-gradient(to right, lightgrey,#E9E9E9)",
          backdropFilter: "blur(15px)",
        }}
        spacing={3}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, textAlign: "center" }}>
          CRM Form
        </Typography>
        <Paper component="form" onSubmit={formik.handleSubmit}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Stack width={{ xs: "100%", md: "50%" }} spacing={2}>
              {CrmFormDetails.map((field, index) => (
                <TextField
                  key={index}
                  fullWidth
                  id={field.id}
                  name={field.id}
                  label={field.label}
                  variant="outlined"
                  required
                  value={formik.values[field.id]}
                  onChange={formik.handleChange}
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
                >
                  <MenuItem value="" disabled>
                    --Select--
                  </MenuItem>
                  <MenuItem value="1">Flat</MenuItem>
                  <MenuItem value="2">Duplex</MenuItem>
                  <MenuItem value="3">House</MenuItem>
                </Select>
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
                >
                  <MenuItem value="" disabled>
                    --Select--
                  </MenuItem>
                  <MenuItem value="1">1000 sq.ft</MenuItem>
                  <MenuItem value="2">1200 sq.ft</MenuItem>
                  <MenuItem value="3">1500 sq.ft</MenuItem>
                  <MenuItem value="4">2000 sq.ft</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={
                          formik.touched.date && Boolean(formik.errors.date)
                        }
                        helperText={formik.touched.date && formik.errors.date}
                      />
                    )}
                  />
                </LocalizationProvider>
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
                >
                  <MenuItem value="" disabled>
                    --Select--
                  </MenuItem>
                  <MenuItem value="1">Credit Card</MenuItem>
                  <MenuItem value="2">Netbanking</MenuItem>
                  <MenuItem value="3">Online</MenuItem>
                </Select>
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
              </FormControl>
            </Stack>
          </Stack>
          <Box my={3} textAlign="center">
            <ButtonComponent
              text={loader ? <CircularProgress size={24} /> : "Submit"}
              type="submit"
            />
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CRMForm;
