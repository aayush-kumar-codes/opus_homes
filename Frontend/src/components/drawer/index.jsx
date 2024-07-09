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
  BusinessCenter,
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

  React.useEffect(() => {
    // console.log(Cookies.get("token"));
    // const decoded = jwtDecode(Cookies.get("token"));
    // console.log(decoded,"decode")
  }, []);

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
  };

  const handleProfile = () => {
    navigate("/dashboard/profile");
    handleClose();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <ToastContainer /> */}
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.2),#000)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
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
            <Typography
              onClick={() => navigate("/dashboard")}
              sx={{
                fontWeight: 600,
                cursor: "pointer",
              }}
              variant="h6"
              noWrap
              component="div"
              mt={"5px"}
            >
              Dashboard
            </Typography>
          </Box>
          <Box>
            <Person
              sx={{
                mt: "5px",
                cursor: "pointer",
              }}
              onClick={handleClick}
            />

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
                  justifyContent: "space-between",
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
                  justifyContent: "space-between",
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
          </Box>
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
          <List sx={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
            {[
              {
                name: "CRM system",
                path: "",
                icons: <ListAlt />,
              },
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
                name: "New Job Entry",
                path: "newjobentry",
                icons: <NoteAdd />,
              },
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
          </List>
          <Divider />
          <List>
            {[
              {
                name: "Profile Edit",
                path: "editprofile",
                icon: <Person2Icon />,
              },
              {
                name: "Logout",
                icon: <LogoutIcon />,
                onclick: () => {
                  Cookies.remove("token");
                  navigate("/", { replace: true });
                },
              },
            ].map((text, index) => (
              <NavLink
                onClick={text.onclick}
                key={index}
                to={text.path}
                style={{ color: "black", textDecoration: "none" }}
              >
                <Tooltip title={text.name} placement="right-start">
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
                        {text.icon}
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
