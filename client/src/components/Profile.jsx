import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Box,
  Avatar
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import profile from "../assets/Profile.png";

export default function Profile({ data }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <>
      <Button size="small" onClick={toggleDrawer(true)}>
        Profile
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 300, p: 3, textAlign: "center", position: "relative" }}
          role="presentation"
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" mb={2}>
            Profile
          </Typography>

          <Avatar
            src={profile}
            alt="Profile"
            sx={{ width: 200, height: 200, margin: "auto", mb: 2 }}
          />

          <Typography variant="h6">
            {data?.username || "This Feature is Coming Soon"}
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}
