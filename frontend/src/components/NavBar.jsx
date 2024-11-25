import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

export default function NavBar(props) {
  const { drawerWidth, content } = props;
  const location = useLocation();
  const path = location.pathname;
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const myDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              selected={path === "/"}
              sx={{
                backgroundColor: path === "/" ? "#90caf9" : "transparent", // Soft blue for selected
                "&:hover": {
                  backgroundColor: path === "/" ? "#ffab91" : "#e3f2fd", // Hover color transition
                },
                transition: "background-color 0.3s ease", // Smooth background color change
              }}
            >
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Home"} sx={{ fontWeight: "bold" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/create"
              selected={path === "/create"}
              sx={{
                backgroundColor: path === "/create" ? "#90caf9" : "transparent",
                "&:hover": {
                  backgroundColor: path === "/create" ? "#ffab91" : "#e3f2fd",
                },
                transition: "background-color 0.3s ease",
              }}
            >
              <ListItemIcon>
                <AddCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Create"} sx={{ fontWeight: "bold" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/about"
              selected={path === "/about"}
              sx={{
                backgroundColor: path === "/about" ? "#90caf9" : "transparent",
                "&:hover": {
                  backgroundColor: path === "/about" ? "#ffab91" : "#e3f2fd",
                },
                transition: "background-color 0.3s ease",
              }}
            >
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"About"} sx={{ fontWeight: "bold" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1976d2", // Primary color
          boxShadow: 3, // Adding a subtle shadow for depth
        }}
      >
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            CRUD Application
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f0f0f0", // Lighter background for drawer
            borderRight: "1px solid #1976d2",
            boxShadow: 3, // Adding shadow to the drawer
          },
          display: { xs: "none", sm: "block" },
        }}
        open={open}
        onClose={toggleDrawer}
      >
        {myDrawer}
      </Drawer>

      <Drawer
        variant="temporary"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#fafafa",
            boxShadow: 3, // Adding shadow for mobile drawer
          },
          display: { xs: "block", sm: "none" },
        }}
        open={open}
        onClose={toggleDrawer}
      >
        {myDrawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
