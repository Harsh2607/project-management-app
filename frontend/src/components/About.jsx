import React from "react";
import { Box, Typography, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const About = () => {
  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          justifyContent: "center",
        }}
      >
        <InfoIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          About This Application
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 2 }}>
        This application is designed to help users manage their projects
        efficiently. It allows you to create, update, and track the progress of
        various projects, ensuring that you stay organized and on top of
        deadlines.
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Whether you are working individually or in a team, this app provides a
        simple and intuitive interface to track your project's details such as
        start and end dates, description, and current status.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          padding: "12px",
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: 2,
        }}
        href="/"
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default About;
