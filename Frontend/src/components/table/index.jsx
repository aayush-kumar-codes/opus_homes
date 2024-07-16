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
import Delete from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";

const adminHeaders = ["Job ID", "Job Name", "Action"];
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

  const handleDelete = (id) => {
    const data = async () => {
      try {
        const response = await axiosInstance.delete(`admin-form/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (response.status) {
          const data = userData.filter((e) => e.job_id !== id);
          setUserData(data);
          console.log(response.data.message, "de");
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    };
    data();
  };

  const getHeaders = () => {
    switch (Cookies.get("user_role")) {
      case "1":
        return adminHeaders;
      default:
        return headers;
    }
  };

  return (
    <>
      <ToastContainer />
      {fetchedDataLoader ? (
        <Box textAlign={"center"}>
          {" "}
          <CircularProgress size={"1.5rem"} color="inherit" />
        </Box>
      ) : userData?.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: { xs: "100%", md: "50%" } }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {getHeaders().map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      bgcolor: "#9EBCD8",
                    }}
                  >
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
                    textAlign: "center",
                  }}
                >
                  <TableCell
                    onClick={() => handleClick(item.job_id)}
                    sx={{ textAlign: "center" }}
                  >
                    {item.job_id}
                  </TableCell>
                  <TableCell
                    onClick={() => handleClick(item.job_id)}
                    sx={{ textAlign: "center" }}
                  >
                    {item.job_name}
                  </TableCell>
                  {Cookies.get("user_role") === "1" && (
                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Delete
                        onClick={() => handleDelete(item.job_id)}
                        sx={{ color: "red", ":hover": { color: "#000" } }}
                      />
                    </TableCell>
                  )}
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
