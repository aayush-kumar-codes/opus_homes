import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios";

const ProfileDetails = () => {
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = React.useState(false);

  useEffect(() => {
    const data = async () => {
      setLoader(true);
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
      setLoader(false);
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
          {loader ? (
            <Box textAlign={"center"}>
              {" "}
              <CircularProgress size={"1.5rem"} color="inherit" />
            </Box>
          ) : (
            <Stack
              sx={{
                display: "flex",
                gap: { xs: 1, lg: 0 },
                justifyContent: { xs: "center", lg: "space-between" },
                flexDirection: { xs: "column", lg: "row" },
              }}
            >
              <Stack sx={{ minWidth: 200 }} spacing={1}>
                {" "}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "19px" }}
                >
                  First Name:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "18px" }}>
                  {userData?.first_name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "19px" }}
                >
                  Last Name:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "18px" }}>
                  {userData?.last_name}
                </Typography>
              </Stack>
              <Stack sx={{ minWidth: 200 }} spacing={1}>
                {" "}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "19px" }}
                >
                  Email:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "18px" }}>
                  {userData?.email}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "19px" }}
                >
                  Role:
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "18px" }}>
                  {roleData()}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProfileDetails;
