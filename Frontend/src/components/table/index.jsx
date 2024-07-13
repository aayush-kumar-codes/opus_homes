import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";

const headers = ["Job ID", "Job Name"];

const CustomTable = () => {
  const navigate = useNavigate();
  const [fetchedDataLoader, setFetchedDataLoader] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const data = async () => {
      setFetchedDataLoader(true);
      try {
        const response = await axiosInstance.get("admin-form/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
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

  const handleClick = (id) => {
    Cookies.set("job_id", id);
    navigate(`/dashboard/jobpage/${id}`);
  };
  return (
    <>
      {fetchedDataLoader ? (
        <Box textAlign={"center"}>
          {" "}
          <CircularProgress size={"1.5rem"} color="inherit" />
        </Box>
      ) : userData?.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxWidth: "50%" }}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} sx={{ fontWeight: "bold",textAlign:"center",bgcolor:"#9EBCD8" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: index % 2 === 0 ? "#f0f0f0" : "inherit",
                    textAlign:"center"
                  }}
                  onClick={() => handleClick(item.job_id)}
                >
                  <TableCell sx={{textAlign:"center"}}>{item.job_id}</TableCell>
                  <TableCell sx={{textAlign:"center"}}>{item.job_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box my={2} textAlign={"center"}>
          No Data Found
        </Box>
      )}
    </>
  );
};

export default CustomTable;
