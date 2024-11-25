import React, { useEffect, useMemo, useState, useCallback } from "react";
import AxiosInstance from "./Axios";
import { MaterialReactTable } from "material-react-table";
import Dayjs from "dayjs";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";

const Home = () => {
  const [myData, setMyData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [error, setError] = useState(null);

  const GetData = useCallback(() => {
    setLoadData(true);
    AxiosInstance.get("project/")
      .then((response) => {
        setMyData(response.data);
        setLoadData(false);
      })
      .catch((error) => {
        setError("Failed to load data. Please try again.");
        setLoadData(false);
      });
  }, []);

  useEffect(() => {
    GetData();
  }, [GetData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "status", header: "Status", size: 150 },
      { accessorKey: "description", header: "Description", size: 150 },
      {
        accessorFn: (row) => Dayjs(row.start_date).format("DD-MM-YYYY"),
        header: "Start Date",
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.end_date).format("DD-MM-YYYY"),
        header: "End Date",
        size: 200,
      },
    ],
    []
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
          p: 1,
          borderRadius: 2,
          backgroundColor: "#1976d2",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Projects List
        </Typography>
      </Box>

      {loadData ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Typography
          color="error"
          align="center"
          sx={{ fontWeight: "bold", fontSize: "1rem" }}
        >
          {error}
        </Typography>
      ) : (
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 2,
            backgroundColor: "#fff",
          }}
        >
          <MaterialReactTable
            columns={columns}
            data={myData}
            enableRowActions
            renderRowActions={({ row }) => (
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  color="primary"
                  component={Link}
                  to={`edit/${row.original.id}`}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  component={Link}
                  to={`delete/${row.original.id}`}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#ffebee",
                    },
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            )}
            sx={{
              "& .MuiTableCell-root": {
                padding: "16px", // Add padding for better spacing
              },
              "& .MuiTableHead-root": {
                backgroundColor: "#f5f5f5", // Light background for header
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
