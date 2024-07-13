import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CustomTable from "../../components/table";

const JobList = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [fetchedDataLoader, setFetchedDataLoader] = useState(false);
  // useEffect(() => {
  //   const data = async () => {
  //     setFetchedDataLoader(true);
  //     try {
  //       const response = await axiosInstance.get("/dashboard/records_crm/", {
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       });
  //       if (response.status) {
  //         setUserData(response.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setFetchedDataLoader(false);
  //   };
  //   data();
  // }, []);

  // const handleOnClick = (details) => {
  //   Cookies.set("id", details.id);
  //   navigate(`/dashboard/jobpagetable`);
  // };

  return (
    <Box
      sx={{
        borderRadius: "20px",
        backgroundImage: "linear-gradient(to right, lightgrey,#E9E9E9)",
        backdropFilter: "blur(15px)",
        p: 1,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontSize: "calc(20px + 2vmin)", fontWeight: 600 }}
      >
        Job List
      </Typography>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        my={2}
      >
        <CustomTable />
      </Box>
    </Box>
  );
};

export default JobList;
