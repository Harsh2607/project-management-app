import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Dayjs from "dayjs";
import AxiosInstance from "./Axios";
import { Box, Button, Typography, Paper, CircularProgress } from "@mui/material";
import MyDatePickerField from "./forms/MyDatePickerField";
import MySelectField from "./forms/MySelectField";
import MyMultiLineField from "./forms/MyMultiLineField";
import MyTextField from "./forms/MyTextField";
import MyMultiSelectField from "./forms/MyMultiSelectField";

const Edit = () => {
  const status_options = [
    { id: "", name: "None" },
    { id: "Open", name: "Open" },
    { id: "In Progress", name: "In Progress" },
    { id: "Completed", name: "Completed" },
  ];

  const [projectManager, setProjectManager] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { id: myId } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, setValue, reset, control } = useForm({
    defaultValues: {
      name: "",
      project_manager: "",
      employees: [],
      start_date: null,
      end_date: null,
      description: "",
      status: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project managers, employees, and project data in parallel
        const [projectManagersRes, employeesRes, projectDataRes] = await Promise.all([
          AxiosInstance.get("projectmanager/"),
          AxiosInstance.get("employees/"),
          AxiosInstance.get(`project/${myId}`),
        ]);

        setProjectManager(projectManagersRes.data);
        setEmployees(employeesRes.data);

        const projectData = projectDataRes.data;
        setValue("name", projectData.name);
        setValue("project_manager", projectData.project_manager);
        setValue("employees", projectData.employees);
        setValue("status", projectData.status);
        setValue("description", projectData.description);
        setValue("start_date", Dayjs(projectData.start_date));
        setValue("end_date", Dayjs(projectData.end_date));

        setLoadData(false);
      } catch (err) {
        setError(
          `Failed to load data: ${err.response ? err.response.data : err.message}`
        );
        setLoadData(false);
      }
    };

    fetchData();
  }, [myId, setValue]);

  const submission = (data) => {
    setSubmitting(true);
    const updateData = {
      name: data.name,
      project_manager: data.project_manager,
      employees: data.employees,
      status: data.status,
      description: data.description,
      start_date: data.start_date
        ? Dayjs(data.start_date).format("YYYY-MM-DD")
        : null,
      end_date: data.end_date
        ? Dayjs(data.end_date).format("YYYY-MM-DD")
        : null,
    };

    AxiosInstance.put(`project/${myId}/`, updateData)
      .then(() => {
        setSubmitting(false);
        reset(); // Reset form fields
        navigate("/"); // Navigate after successful update
      })
      .catch((error) => {
        setSubmitting(false);
        console.error("Error:", error);
      });
  };

  if (loadData) {
    return (
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
    );
  }

  if (error) {
    return (
      <Typography
        color="error"
        align="center"
        sx={{ fontWeight: "bold", fontSize: "1rem" }}
      >
        {error}
      </Typography>
    );
  }

  return (
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
              Edit Project
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(submission)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <MyTextField
                  label="Project Name"
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
                  options={status_options}
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
                  name="start_date"
                  control={control}
                  width="100%"
                />
                <MyDatePickerField
                  label="End Date"
                  name="end_date"
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
                <MySelectField
                  label="Project Manager"
                  name="project_manager"
                  control={control}
                  width="100%"
                  options={projectManager}
                />
                <MyMultiSelectField
                  label="Employees"
                  name="employees"
                  control={control}
                  width="100%"
                  options={employees}
                />
              </Box>
              <MyMultiLineField
                label="Description"
                name="description"
                control={control}
                placeholder="Enter Project Description"
                width="100%"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 3,
                  gap: 4,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    boxShadow: 2,
                    backgroundColor: "#1976d2",
                    "&:hover": { backgroundColor: "#1565c0", boxShadow: 4 },
                  }}
                >
                  {submitting ? <CircularProgress size={24} /> : "Update"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/")}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    boxShadow: 2,
                    "&:hover": { backgroundColor: "#f5f5f5", boxShadow: 4 },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Edit;
