import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios";

const ProfileDetails = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const data = async () => {
      try {
        const response = await axiosInstance.get("/user/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status) {
          setUserData(response.data);
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, []);

  const roleData = () => {
    if (userData?.role) {
      if (userData?.role === 1) {
        return "Admin";
      } else if (userData?.role === 2) {
        return "Superintendent";
      } else {
        return "Sales Associate";
      }
    }
  };

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ width: { xs: "80%", sm: "50%" } }}
        style={{
          borderRadius: "20px",
          backgroundImage: "linear-gradient(to right, lightgrey,#E9E9E9)",
          backdropFilter: "blur(15px)",
        }}
      >
        <Stack spacing={2} sx={{ p: 4 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontSize: "calc(20px + 2vmin)", fontWeight: 600 }}
          >
            My Profile
          </Typography>
          <Stack gap={1} sx={{ display: "flex", justifyContent: "space-between", flexDirection:{xs:"column",lg:"row"} }}>
            <Stack gap={1}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "20px" }}
              >
                First Name: {userData?.first_name}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "20px" }}
              >
                Last Name: {userData?.last_name}
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "20px" }}
              >
                Email : {userData?.email}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, fontSize: "20px" }}
              >
                Role : {roleData()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProfileDetails;
