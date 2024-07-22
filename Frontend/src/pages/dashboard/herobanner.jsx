import { ArrowForward, ArrowRight } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const points = [
  "Opus Homes is a residential development company.",
  "We specialize inbuilding speculation and new custom homes.",
  "We thrive to providing energy efficient and stable home for our clients.",
];

const application=["Project Management","Company financials","Project progression","Project update","CRM system"]

const HeroBanner = () => {
  return (
    <Stack
      sx={{
        padding: "20px",
        gap: 2,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: 600 }}>
        About Opus Homes
      </Typography>
      <Stack gap={2} sx={{ display: "flex", flexDirection: {xs:"column",md:"row"} }}>
        <Box sx={{display:{xs:"none",md:"block"}}}>
          <img src="images/herobannerlogo.png" />
        </Box>
        <Stack gap={1}>
          <List>
            {points.map((e, i) => (
              <li style={{ listStyleType: "disc",marginLeft:"17px",fontSize:"18px",marginBottom:"5px" }} key={i}>
                {e}
              </li>
            ))}
          </List>
          <Typography variant="h6" sx={{fontSize:"18px"}}>
            OHSM is a web application, designed to help with the daily operation
            and management of Opus Homes.
          </Typography>
          <Typography variant="h6" sx={{fontSize:"18px"}}>
          The application will comprise of :
          </Typography>
          <List>
            {application.map((e, i) => (
              <ListItem style={{ listStyleType: "disc",marginLeft:"37px",fontSize:"18px",marginBottom:"5px" }} key={i}>
               <ArrowRight/> {e}
              </ListItem>
            ))}
          </List>
          
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HeroBanner;
