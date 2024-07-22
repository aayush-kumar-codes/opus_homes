import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../axios";
import Cookies from "js-cookie";
import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import ButtonComponent from "../../components/button";
import CustTable from "../../components/table/jobpagetable";
import { MyContext } from "../../context/ContextProvider";
import { dispatch } from "../../redux/store/Store";
import {
  fetched0Data1,
  resetSliceReducer1,
} from "../../redux/reducers/jobPageSlice";
import { useSelector } from "react-redux";
import {
  JobPageEntry,
  resetSliceReducer2,
} from "../../redux/reducers/jobPageSliceTwo";

const JobPage = () => {
  const [userData, setUserData] = useState([]);
  const [fetchedDataLoader, setFetchedDataLoader] = useState(false);
  const [editedUsers, setEditedUsers] = useState({});
  const [jobPageResponse, setJobPageResponse] = useState({});
  const [fetchedData, setFetchedData] = useState();
  const [contractAmountPaid, setContractAmountPaid] = useState("");
  const [contractAmountPaidStatus, setContractAmountPaidStatus] = useState("");
  const [contractAmountPaidResponse, setContractAmountPaidResponse] = useState(
    {}
  );
  const [loading, setLoading] = useState(false);
  const { jobListStatus, setJobListStatus, jobIdList,
    setJobIdList, } = useContext(MyContext);
  const job = useSelector((state) => state.jobPageSlice);
  const jobEntry = useSelector((state) => state.jobPageSliceTwo);

  const subItems = [
    "Premilinaries",
    "Phase 1",
    "Phase 2",
    "Phase 3",
    "Phase 4",
  ];
  const itemsToInsertAfter = [
    "Utility Hook-Ups",
    "Foundation",
    "Dry-IN",
    "Drywall",
    "Flooring Labor",
  ];

  const addRowsAfterItems = (data) => {
    let newData = [];
    console.log(data, "00000");
    data.forEach((item, index) => {
      newData.push(item);
      if (itemsToInsertAfter.includes(item.items)) {
        const additionalRows = [
          {
            id: "",
            items: subItems[0],
            status: "",
            cost: "",
            paid: "",
            payment_type: "",
            Sub_Contractor: "",
          },
        ];
        newData = newData.concat(additionalRows);
        itemsToInsertAfter.splice(0, 1);
        subItems.splice(0, 1);
      }
    });
    return newData;
  };

  useEffect(() => {
    if ((job.isSuccess && jobEntry.isSuccess) || jobListStatus) {
      setFetchedDataLoader(true);
      setContractAmountPaidStatus(false)
      console.log(job.data, jobEntry.data, "oooyyyujytuyg");
      if (job.data.length !== 0) {
        const filterData = job.data.filter(
          (e) => `${e.job_id}` === Cookies.get("job_id")
        );
        console.log(filterData, "k;ojlihug");
        if (filterData.length !== 0) {
          setUserData(...filterData);
        }
      }
      if (jobEntry.data.length !== 0) {
        console.log(jobEntry.data, "pppp");
        const filterData = jobEntry.data.filter(
          (e) => `${e.job_record.job_id}` === Cookies.get("job_id")
        );
        console.log(filterData, "----iyutyuigyguh----");
        if (filterData.length !== 0) {
          const newData = addRowsAfterItems(
            filterData?.[filterData.length - 1]?.response
          );
          setFetchedData(newData);
          setJobPageResponse(filterData?.[filterData.length - 1]?.job_record);
        }
      }
      console.log(jobEntry.data, job.data);
      setJobListStatus(false);
      dispatch(resetSliceReducer1());
      dispatch(resetSliceReducer2());
    }
  }, [job.isSuccess && jobEntry.isSuccess, jobListStatus]);

  useEffect(() => {
    if (
      userData?.job_name &&
      fetchedData?.length !== 0 &&
      jobPageResponse?.job_id
    ) {
      setFetchedDataLoader(false);
    }
  }, [userData, fetchedData, jobPageResponse]);

  useEffect(() => {
    if (Cookies.get("job_id") !== "") {
      console.log("firstmklmklkl");
      if (!jobListStatus) {
        dispatch(fetched0Data1());
        dispatch(JobPageEntry());
      }
    }
  }, []);

  useEffect(() => {
    console.log(userData, "uuuuuu");
  }, [userData]);

  const financeTypeName = (data) => {
    switch (data) {
      case 1:
        return "construction loan";
      case 2:
        return "Cash";
      default:
        return "Deed over";
    }
  };

  const handleAddTodo = () => {
    toast.success("Added Todo Successfully");
  };

  const handleChangeOrder = () => {
    toast.success("Order Changed Successfully");
  };

  const handleContractAmoundPaid = async (value) => {
    setJobIdList([...jobIdList, Cookies.get("job_id")])
    const data = {
      contract_amount_paid: value,
    };
    try {
      const response = await axiosInstance.post(
        `admin-form/entries/${Cookies.get("job_id")}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (response.status) {
        setContractAmountPaidResponse(response.data);
        setContractAmountPaid("");
        setContractAmountPaidStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontSize: "calc(20px + 2vmin)", fontWeight: 600, mb: 1 }}
      >
        Job Page
      </Typography>
      {fetchedDataLoader ? (
        <Box textAlign={"center"}>
          {" "}
          <CircularProgress size={"1.5rem"} color="inherit" />
        </Box>
      ) : (
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <ToastContainer />
          <Stack
            width={"80%"}
            sx={{
              borderRadius: "20px",
              backgroundImage: "linear-gradient(to right, lightgrey,#E9E9E9)",
              backdropFilter: "blur(15px)",
              display: "flex",
              flexDirection: "row",
              gap: 1,
              p: 1,
            }}
          >
            <Box width={"100%"}>
              {fetchedDataLoader ? (
                <Box textAlign={"center"}>
                  {" "}
                  <CircularProgress size={"1.5rem"} color="inherit" />
                </Box>
              ) : userData?.job_name ? (
                <Grid
                  container
                  spacing={2}
                  sx={{ alignItems: "stretch", p: 4, justifyContent: "start" }}
                >
                  <Grid item xs={12}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Job Start Date :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {userData.projected_start_date}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Job Name :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {userData.job_name}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Job Address :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {userData.job_address}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        % of Completion :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        100%
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Job Owner :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {userData.owner_first_name +
                          " " +
                          userData.owner_last_name}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "19px" }}
                      >
                        Finance Type :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "18px", mt: "2px", ml: 1 }}
                      >
                        {financeTypeName(userData.contract_type)}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ) : (
                <Box my={2} textAlign={"center"}>
                  No Data Found
                </Box>
              )}
              {!fetchedDataLoader && jobPageResponse?.job && (
                <Grid
                  container
                  spacing={2}
                  sx={{ alignItems: "stretch", p: 4, justifyContent: "start" }}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Contract Price ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {userData?.contract_price}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Completed ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.completed_items}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Total Uncompleted ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.uncompleted_items}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Contract Amount Paid ($):
                      </Typography>
                      <TextField
                        type="text"
                        placeholder="Enter Your Contract Amount Paid"
                        value={contractAmountPaid}
                        onChange={(e) => {
                          if (e.target.value >= 0) {
                            setContractAmountPaid(e.target.value);
                          } else {
                            toast.error("Invalid value");
                          }
                        }}
                        sx={{
                          ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              height: "1px",
                              backgroundColor: "#fff",
                            },
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleContractAmoundPaid(contractAmountPaid);
                            console.log(contractAmountPaid, "amount");
                          }
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Completed Paid ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.completed_items_paid}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Total Cost ($) :
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.total_cost}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Contract Amount Owed ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {contractAmountPaidStatus
                          ? contractAmountPaidResponse?.payment_owed
                          : jobPageResponse?.payment_owed}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      spacing={1}
                      p={2}
                      sx={{
                        bgcolor: "#156082",
                        borderRadius: "10px",
                        border: "2px solid #0c1a3b",
                      }}
                    >
                      {" "}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "19px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        Completed Unpaid ($):
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "18px",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {jobPageResponse?.completed_items_unpaid}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              )}
              <Box sx={{ overflow: "auto" }} mb={4}>
                {/* {loader ? (
              <Box textAlign={"center"}>
                <CircularProgress size={"1rem"} />
              </Box>
            ) : ( */}
                <Box>
                  {!fetchedDataLoader && userData?.job_name && fetchedData && (
                    <CustTable
                      fetchedData={fetchedData}
                      editedUsers={editedUsers}
                      setEditedUsers={setEditedUsers}
                      setJobPageResponse={setJobPageResponse}
                      setFetchedData={setFetchedData}
                    />
                  )}
                </Box>
                {/* )} */}
              </Box>
            </Box>
          </Stack>
          <Stack width={"20%"} gap={1}>
            <Box width={"100%"} border="2px solid #000">
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                To Do's
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  p: 2,
                }}
                height={"500px"}
              >
                <ButtonComponent text={"Add"} onClick={handleAddTodo} />
              </Box>
            </Box>
            <Box width={"100%"} border="2px solid #000">
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, textAlign: "center" }}
              >
                Change Orders
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  p: 2,
                }}
                height={"500px"}
              >
                <ButtonComponent text={"Add"} onClick={handleChangeOrder} />
              </Box>
            </Box>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default JobPage;
