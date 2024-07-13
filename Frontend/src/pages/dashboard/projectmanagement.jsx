import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ProjectManagement = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [fetchedDataLoader, setFetchedDataLoader] = useState(false);
  useEffect(() => {
    const data = async () => {
      setFetchedDataLoader(true);
      try {
        const response = await axiosInstance.get("/dashboard/records_crm/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (response.status) {
          console.log(response.data);
          setUserData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setFetchedDataLoader(false);
    };
    data();
  }, []);

  const handleOnClick = (details) => {
    Cookies.set("id", details.id);
    navigate(`/dashboard/projectmanagementdetails`);
  };

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
        Project Managenment
      </Typography>
      {fetchedDataLoader ? (
        <Box textAlign={"center"}>
          {" "}
          <CircularProgress size={"1.5rem"} color="inherit" />
        </Box>
      ) : (
        <>
          {userData.length > 0 ? (
            <Grid
              container
              spacing={2}
              sx={{ alignItems: "stretch", p: 4, justifyContent: "start" }}
            >
              {userData.map((details, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Stack
                    onClick={(e) => handleOnClick(details)}
                    boxShadow="rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px"
                    sx={{
                      p: 2,
                      backdropFilter: "blur(15px)",
                      borderRadius: "8px",
                      gap: 1,
                      cursor: "pointer",
                      ":hover": {
                        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
                      },
                    }}
                  >
                    <Box
                      display={"flex"}
                      flexDirection={{ xs: "column", md: "row" }}
                      justifyContent={"space-between"}
                    >
                      <Stack>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                        >
                          First Name:{" "}
                          <span style={{ fontWeight: 400, fontSize: "18px" }}>
                            {details.first_name}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                        >
                          Last Name:{" "}
                          <span style={{ fontWeight: 400, fontSize: "18px" }}>
                            {details.last_name}
                          </span>
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                        >
                          Email:{" "}
                          <span style={{ fontWeight: 400, fontSize: "18px" }}>
                            {details.email}
                          </span>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, fontSize: "18px" }}
                        >
                          Phone:{" "}
                          <span style={{ fontWeight: 400, fontSize: "18px" }}>
                            {details.phone}
                          </span>
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box my={2} textAlign={"center"}>
              No Data Found
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProjectManagement;
