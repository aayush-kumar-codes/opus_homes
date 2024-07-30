import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import {
  Analytics,
  AutoGraph,
  Badge,
  Book,
  BusinessCenter,
  ContactEmergency,
  Edit,
  ExpandLess,
  ExpandMore,
  FactCheck,
  ListAlt,
  Logout,
  NoteAdd,
  Person,
} from "@mui/icons-material";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { Popover, Stack, Tooltip } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../../axios";
import { MyContext } from "../../context/ContextProvider";
import { dispatch } from "../../redux/store/Store";
import { fetched0Data1 } from "../../redux/reducers/jobPageSlice";
import { useSelector } from "react-redux";
import { JobPageEntry } from "../../redux/reducers/jobPageSliceTwo";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ pages }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const [userData, setUserData] = React.useState([]);
  const [jobListView, setJobListView] = React.useState(true);
  const {
    newJobSubmitted,
    setNewJobSubmitted,
    setJobListStatus,
    setJobIdTable,
    jobIdTable,
    setJobIdList,
    jobIdList,
    deletedJob,
    setDeletedJob
  } = React.useContext(MyContext);
  const job = useSelector((state) => state.jobPageSlice);
  const jobEntry = useSelector((state) => state.jobPageSliceTwo);

  React.useEffect(() => {
    const data = async () => {
      try {
        const response = await axiosInstance.get("admin-form/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (response.status) {
          setUserData(response.data);
          console.log(response.data, "oooo");
        }
      } catch (error) {
        console.log(error);
      }
      setNewJobSubmitted(false);
      setDeletedJob(false)
    };
    data();
  }, [newJobSubmitted,deletedJob]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfile = Boolean(anchorEl);
  const id = openProfile ? "simple-popover" : undefined;

  const handleLogout = () => {
    navigate("../", { replace: "true" });
    Cookies.remove("token");
    Cookies.remove("job_id");
    Cookies.remove("user_role");
  };

  const handleProfile = () => {
    navigate("/dashboard/profile");
    handleClose();
  };

  const handleProfileUpdate = () => {
    navigate("/dashboard/editprofile");
    handleClose();
  };

  const handleJobPage = (id) => {
    Cookies.set("job_id", id);
    const condition1 = job.data.some((e) => e.job_id === id);
    const condition2 = jobEntry.data.some((e) => e.job_record.job_id === id);
    if (job) {
      if (!condition1) {
        dispatch(fetched0Data1());
      }
    }
    if (jobEntry) {
      if (condition2 && jobIdList.includes(Cookies.get("job_id"))) {
        dispatch(JobPageEntry());
        const index = jobIdList.findIndex(
          (item) => item === Cookies.get("job_id")
        );
        console.log(index, "index");
        if (index !== -1) {
          setJobIdList(jobIdList.filter((jobId) => jobId !== jobIdList[index]));
        }
      }
      if (!condition2) {
        dispatch(JobPageEntry());
      }
    }
    setTimeout(() => {
      navigate(`/dashboard/jobpage/${id}`);
      setJobListStatus(true);
    }, 1000);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <ToastContainer /> */}
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundImage: "linear-gradient(to right,#fff,#9EBCD8)",
            // backgroundImage:
            //   "linear-gradient(to right, rgba(255, 255, 255, 0.2),#000)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="#000"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              onClick={() => navigate("/dashboard")}
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              // variant="h6"
              // noWrap
              // component="div"
              // mt={"2px"}
              mr={5}
            >
              <img src="/images/logo1.png" alt="logo" width={150} />
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <List sx={{ display: "flex" }}>
                {[
                  {
                    name: "Project Management ",
                    path: "projectmanagement",
                    icons: <BusinessCenter />,
                  },
                  {
                    name: "Company financials ",
                    path: "companyfinance",
                    icons: <Analytics />,
                  },
                  {
                    name: "Project progression",
                    path: "projectprogression",
                    icons: <FactCheck />,
                  },
                  {
                    name: "Project update",
                    path: "projectupdate",
                    icons: <AutoGraph />,
                  },
                  {
                    name: "CRM system",
                    path: "crm",
                    icons: <Book />,
                  },
                ].map((text, index) => (
                  <NavLink
                    to={text.path}
                    style={{ color: "#000", textDecoration: "none" }}
                    key={index}
                  >
                    {/* <Tooltip
                  title={
                    text.name === "New Job Entry"
                      ? "New Job Entry (Only Admins Have Access To Submit)"
                      : text.name
                  }
                  placement="right-start"
                > */}
                    <ListItem
                      disablePadding
                      sx={{
                        display: "block",
                        borderBottom:
                          location.pathname === "/dashboard/" + text.path &&
                          "2px solid #000",
                        // borderImage:
                        //   "linear-gradient(to right, rgba(255, 255, 255, 0.2),#000)",
                        borderImageSlice: 1,
                        ":hover": {
                          borderImageSlice: 1,
                          borderBottom: "2px solid #000",
                        },
                        // bgcolor:
                        //   location.pathname === "/dashboard/" + text.path &&
                        //   "#F5F5F5",
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2,
                        }}
                      >
                        {/* <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {text.icons}
                      </ListItemIcon> */}

                        <ListItemText
                          sx={{
                            ".css-10hburv-MuiTypography-root": {
                              fontSize: { md: "13px", lg: "16px" },
                            },
                          }}
                          primary={text.name}
                          // sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </ListItem>
                    {/* </Tooltip> */}
                  </NavLink>
                ))}
              </List>
            </Box>
          </Box>
          <Stack display={"flex"} flexDirection={"row"} gap={1}>
            {Cookies.get("user_role") === "1" && (
              <List>
                {[
                  {
                    name: "New Job Entry",
                    path: "newjobentry",
                  },
                ].map((text, index) => (
                  <NavLink
                    to={text.path}
                    style={{ color: "#000", textDecoration: "none" }}
                    key={index}
                  >
                    <ListItem
                      disablePadding
                      sx={{
                        display: "block",
                        borderBottom:
                          location.pathname === "/dashboard/" + text.path &&
                          "2px solid #000",
                        // borderImage:
                        //   "linear-gradient(to right, rgba(255, 255, 255, 0.2),#000)",
                        borderImageSlice: 1,
                        ":hover": {
                          borderImageSlice: 1,
                          borderBottom: "2px solid #000",
                        },
                        // bgcolor:
                        //   location.pathname === "/dashboard/" + text.path &&
                        //   "#F5F5F5",
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemText
                          primary={text.name}
                          sx={{
                            ".css-10hburv-MuiTypography-root": {
                              fontSize: { md: "13px", lg: "16px" },
                            },
                          }}
                          // sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </ListItem>
                    {/* </Tooltip> */}
                  </NavLink>
                ))}
              </List>
            )}
            <Box display={"flex"} alignItems={"center"}>
              <Person
                sx={{
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={handleClick}
              />
            </Box>
            <Popover
              id={id}
              open={openProfile}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "space-between",
                  cursor: "pointer",
                  ":hover": {
                    bgcolor: "#EDEDED",
                  },
                }}
                onClick={handleProfile}
              >
                <Person />
                <Typography variant="body1" sx={{ px: 2 }}>
                  Profile
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "space-between",
                  cursor: "pointer",
                  ":hover": {
                    bgcolor: "#EDEDED",
                  },
                }}
                onClick={handleProfileUpdate}
              >
                <Edit />
                <Typography variant="body1" sx={{ px: 2 }}>
                  Profile Edit
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "space-between",
                  cursor: "pointer",
                  ":hover": {
                    bgcolor: "#EDEDED",
                  },
                }}
                onClick={handleLogout}
              >
                <Logout />
                <Typography variant="body1" sx={{ px: 2 }}>
                  Logout
                </Typography>
              </Box>
            </Popover>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Stack sx={{ justifyContent: "space-between", height: "100vh" }}>
          <List
            sx={{
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              display: { xs: "block", md: "none" },
            }}
          >
            {[
              {
                name: "Project Management ",
                path: "projectmanagement",
                icons: <BusinessCenter />,
              },
              {
                name: "Company financials ",
                path: "companyfinance",
                icons: <Analytics />,
              },
              {
                name: "Project progression",
                path: "projectprogression",
                icons: <FactCheck />,
              },
              {
                name: "Project update",
                path: "projectupdate",
                icons: <AutoGraph />,
              },
              {
                name: "CRM system",
                path: "crm",
                icons: <Book />,
              },
              // {
              //   name: "Job List",
              //   path: "joblist",
              //   icons: <ListAlt />,
              // },
            ].map((text, index) => (
              <NavLink
                to={text.path}
                style={{ color: "inherit", textDecoration: "none" }}
                key={index}
              >
                <Tooltip
                  title={
                    text.name === "New Job Entry"
                      ? "New Job Entry (Only Admins Have Access To Submit)"
                      : text.name
                  }
                  placement="right-start"
                >
                  <ListItem
                    disablePadding
                    sx={{
                      display: "block",
                      borderBottom:
                        location.pathname === "/dashboard/" + text.path &&
                        "3px solid transparent",
                      borderImage:
                        "linear-gradient(to right, rgba(255, 255, 255, 0.2),#000)",
                      borderImageSlice: 1,
                      ":hover": {
                        borderImageSlice: 1,
                        borderBottom: "3px solid transparent",
                      },
                      bgcolor:
                        location.pathname === "/dashboard/" + text.path &&
                        "#F5F5F5",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {text.icons}
                      </ListItemIcon>

                      <ListItemText
                        primary={text.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </NavLink>
            ))}
            <List sx={{ top: "-8px", left: "1.5px" }}>
              {[
                {
                  name: "Job List",
                  icon: <ListAlt />,
                },
              ].map((text, index) => (
                <Box
                  onClick={() => setJobListView(!jobListView)}
                  key={index}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Tooltip
                    title={
                      text.name === "New Job Entry"
                        ? "New Job Entry (Only Admins Have Access To Submit)"
                        : text.name
                    }
                    placement="right-start"
                  >
                    <ListItem
                      disablePadding
                      sx={{
                        display: {
                          xs: text.path === "joblist" ? "none" : "block",
                          md: "block",
                        },
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {text.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={text.name}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                        {open && (
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              ml: open ? 4 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {jobListView ? <ExpandLess /> : <ExpandMore />}
                          </ListItemIcon>
                        )}
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                </Box>
              ))}
              {jobListView && (
                <List sx={{ ml: open ? 1 : 0 }}>
                  {
                    // [
                    //   {
                    //     name: "Job List",
                    //     path: "joblist",
                    //     icon: <ListAlt />,
                    //   },

                    // {
                    //   name: "Profile Edit",
                    //   path: "editprofile",
                    //   icon: <Person2Icon />,
                    // },
                    // {
                    //   name: "Logout",
                    //   icon: <LogoutIcon />,
                    //   onclick: () => {
                    //     Cookies.remove("token");
                    //     Cookies.remove("job_id");
                    //     Cookies.remove("user_role");

                    //     navigate("/", { replace: true });
                    //   },
                    // },
                    // ]
                    userData?.map((text, index) => (
                      <Box
                        onClick={() => handleJobPage(text.job_id)}
                        key={index}
                        // to={()=>handleJobPage(text.job_id)}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <Tooltip
                          title={
                            text.name === "New Job Entry"
                              ? "New Job Entry (Only Admins Have Access To Submit)"
                              : text.job_name
                          }
                          placement="right-start"
                        >
                          <ListItem
                            disablePadding
                            sx={{
                              display: {
                                xs: text.path === "joblist" ? "none" : "block",
                                md: "block",
                              },
                              borderBottom:
                                location.pathname ===
                                  "/dashboard/jobpage/" + text.job_id &&
                                "3px solid transparent",
                              borderImage:
                                "linear-gradient(to right, rgba(255, 255, 255, 0.2),#000)",
                              borderImageSlice: 1,
                              ":hover": {
                                borderImageSlice: 1,
                                borderBottom: "3px solid transparent",
                              },
                              bgcolor:
                                location.pathname ===
                                  "/dashboard/jobpage/" + text.job_id &&
                                "#F5F5F5",
                            }}
                          >
                            <ListItemButton
                              sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: open ? 3 : "auto",
                                  justifyContent: "center",
                                }}
                              >
                                <ContactEmergency />
                              </ListItemIcon>
                              <ListItemText
                                primary={text.job_name}
                                sx={{ opacity: open ? 1 : 0 }}
                              />
                            </ListItemButton>
                          </ListItem>
                        </Tooltip>
                      </Box>
                    ))
                  }
                </List>
              )}
            </List>
          </List>
          {/* <Divider /> */}
          <List sx={{ display: { xs: "none", md: "block" } }}>
            {[
              {
                name: "Job List",
                icon: <ListAlt />,
              },
            ].map((text, index) => (
              <Box
                onClick={() => setJobListView(!jobListView)}
                key={index}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Tooltip
                  title={
                    text.name === "New Job Entry"
                      ? "New Job Entry (Only Admins Have Access To Submit)"
                      : text.name
                  }
                  placement="right-start"
                >
                  <ListItem
                    disablePadding
                    sx={{
                      display: {
                        xs: text.path === "joblist" ? "none" : "block",
                        md: "block",
                      },
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {text.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      {open && (
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            ml: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {jobListView ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                      )}
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </Box>
            ))}
            {jobListView && (
              <List sx={{ ml: open ? 1 : 0 }}>
                {
                  // [
                  //   {
                  //     name: "Job List",
                  //     path: "joblist",
                  //     icon: <ListAlt />,
                  //   },

                  // {
                  //   name: "Profile Edit",
                  //   path: "editprofile",
                  //   icon: <Person2Icon />,
                  // },
                  // {
                  //   name: "Logout",
                  //   icon: <LogoutIcon />,
                  //   onclick: () => {
                  //     Cookies.remove("token");
                  //     Cookies.remove("job_id");
                  //     Cookies.remove("user_role");

                  //     navigate("/", { replace: true });
                  //   },
                  // },
                  // ]
                  userData?.map((text, index) => (
                    <Box
                      onClick={() => handleJobPage(text.job_id)}
                      key={index}
                      // to={()=>handleJobPage(text.job_id)}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <Tooltip
                        title={
                          text.name === "New Job Entry"
                            ? "New Job Entry (Only Admins Have Access To Submit)"
                            : text.job_name
                        }
                        placement="right-start"
                      >
                        <ListItem
                          disablePadding
                          sx={{
                            display: {
                              xs: text.path === "joblist" ? "none" : "block",
                              md: "block",
                            },
                            borderBottom:
                              location.pathname ===
                                "/dashboard/jobpage/" + text.job_id &&
                              "3px solid transparent",
                            borderImage:
                              "linear-gradient(to right, rgba(255, 255, 255, 0.2),#000)",
                            borderImageSlice: 1,
                            ":hover": {
                              borderImageSlice: 1,
                              borderBottom: "3px solid transparent",
                            },
                            bgcolor:
                              location.pathname ===
                                "/dashboard/jobpage/" + text.job_id &&
                              "#F5F5F5",
                          }}
                        >
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? "initial" : "center",
                              px: 2.5,
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                              }}
                            >
                              <ContactEmergency />
                            </ListItemIcon>
                            <ListItemText
                              primary={text.job_name}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Tooltip>
                    </Box>
                  ))
                }
              </List>
            )}
          </List>
        </Stack>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          height: "100vh",
          overflow: "auto",
          bgcolor: "#EBEBED",
        }}
      >
        <DrawerHeader />
        {pages}
      </Box>
    </Box>
  );
}
MiniDrawer.propTypes = {
  pages: PropTypes.node.isRequired, // Assuming pages is a node
};
