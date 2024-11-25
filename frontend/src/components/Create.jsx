import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MySelectField from "./forms/MySelectField";
import MyMultiLineField from "./forms/MyMultiLineField";
import MyTextField from "./forms/MyTextField";
import MyMultiSelectField from "./forms/MyMultiSelectField";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Create = () => {
  const [projectManagers, setProjectManagers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  const statusOptions = [
    { id: "", name: "None" },
    { id: "Open", name: "Open" },
    { id: "In Progress", name: "In Progress" },
    { id: "Completed", name: "Completed" },
  ];

  const fetchProjectManagers = useCallback(async () => {
    try {
      const response = await AxiosInstance.get("projectmanager/");
      setProjectManagers(response.data);
    } catch (error) {
      setError(`Failed to load project managers. ERROR: ${error.message}`);
    }
  }, []);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await AxiosInstance.get("employees/");
      setEmployees(response.data);
    } catch (error) {
      setError(`Failed to load employees. ERROR: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchProjectManagers(), fetchEmployees()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchProjectManagers, fetchEmployees]);

  const schema = yup.object({
    name: yup.string().required("Name field is required"),
    status: yup.string().required("Status field is required"),
    projectManager: yup.string().required("Project Manager field is required"),
    employees: yup
      .array()
      .of(yup.string().required("Employee ID is required"))
      .min(1, "At least one employee must be selected"),
    description: yup.string().required("Description field is required"),
    startDate: yup.date().required("Start Date field is required"),
    endDate: yup
      .date()
      .required("End Date field is required")
      .min(yup.ref("startDate"), "End Date must be after Start Date"),
  });

  const navigate = useNavigate();
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: "",
      status: "",
      projectManager: "",
      employees: [],
      startDate: null,
      endDate: null,
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const postData = {
        name: data.name,
        projectManager: data.projectManager,
        status: data.status,
        employees: data.employees,
        description: data.description,
        startDate: data.startDate
          ? Dayjs(data.startDate).format("YYYY-MM-DD")
          : null,
        endDate: data.endDate ? Dayjs(data.endDate).format("YYYY-MM-DD") : null,
      };
      await AxiosInstance.post("project/", postData);
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setFormError("An error occurred while creating the project. Please try again.");
    }
  };

  return isLoading ? (
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: "800px",
            padding: 4,
            borderRadius: 3,
            backgroundColor: "#ffffff",
          }}
        >
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
              Create New Project
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <MyTextField
                  label="Name"
                  name="name"
                  control={control}
                  placeholder="Enter Project Name"
                  width="100%"
                />
                <MySelectField
                  label="Status"
                  name="status"
                  control={control}
                  width="100%"
                  options={statusOptions}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <MySelectField
                  label="Project Manager"
                  name="projectManager"
                  control={control}
                  width="100%"
                  options={projectManagers}
                />
                <MyMultiSelectField
                  label="Employees"
                  name="employees"
                  control={control}
                  width="100%"
                  options={employees}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <MyDatePickerField
                  label="Start Date"
                  name="startDate"
                  control={control}
                  width="100%"
                />
                <MyDatePickerField
                  label="End Date"
                  name="endDate"
                  control={control}
                  width="100%"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <MyMultiLineField
                  label="Description"
                  name="description"
                  control={control}
                  placeholder="Enter Project Description"
                  width="100%"
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    px: 4,
                    py: 1,
                    borderRadius: 5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    boxShadow: 3,
                    backgroundColor: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                      boxShadow: 4,
                    },
                  }}
                >
                  Create
                </Button>
                {(formError || error) && (
                  <Typography
                    color="error"
                    sx={{ fontWeight: "bold", fontSize: "1rem", mt: 2 }}
                  >
                    {formError || error}
                  </Typography>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Create;

