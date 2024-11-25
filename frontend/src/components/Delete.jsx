import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "./Axios";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const Delete = () => {
  const [loading, setLoading] = useState(true);
  const [projectName, setProjectName] = useState("");
  const { id: myId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    AxiosInstance.get(`project/${myId}`)
      .then((response) => {
        setProjectName(response.data.name);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [myId]);

  const handleDelete = () => {
    AxiosInstance.delete(`project/${myId}/`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#ffffff",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading Project...
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <WarningIcon sx={{ fontSize: 50, color: "warning.main" }} />
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
          >
            Delete Project: {projectName}
          </Typography>
          <Typography sx={{ mt: 3, textAlign: "center" }}>
            Are you sure you want to delete this project?
          </Typography>
          <Typography sx={{ mb: 3, textAlign: "center" }}>
            This action cannot be undone.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{
                width: "45%",
                padding: "9px",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: 2,
              }}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/")}
              sx={{
                width: "45%",
                padding: "9px",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: 2,
              }}
            >
              Cancel
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Delete;
