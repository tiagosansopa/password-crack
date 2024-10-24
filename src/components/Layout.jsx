import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link } from "react-router-dom";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Lighter background for elements like paper/cards
    },
    text: {
      primary: "#ffffff", // White text
    },
    primary: {
      main: "#90caf9", // Light blue as primary color
    },
    secondary: {
      main: "#f48fb1", // Light pink as secondary color
    },
  },
});

const AppLayout = ({ children, isLoggedIn }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem button component={Link} to="/instructions">
          <ListItemText primary="Instructions" />
          <ListItemIcon>
            <InfoIcon /> {/* Icon for Instructions */}
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/profiles">
          <ListItemText primary="Profiles" />
          <ListItemIcon>
            <PersonIcon /> {/* Icon for Profiles */}
          </ListItemIcon>
        </ListItem>
        <ListItem button component={Link} to="/my-stats">
          <ListItemText primary="My Stats" />
          <ListItemIcon>
            <BarChartIcon /> {/* Icon for My Stats */}
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* This applies the dark theme globally */}
      <Box
        sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        {/* Conditionally render AppBar and Drawer if the user is logged in */}
        {isLoggedIn && (
          <>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  MDA Proyecto 2024
                </Typography>
              </Toolbar>
            </AppBar>

            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              PaperProps={{
                sx: { width: 240 },
              }}
            >
              {drawer}
            </Drawer>
          </>
        )}

        {/* Main content with centered layout for larger screens */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px", // Small top margin (adjust as needed)
            width: "100vw", // Full viewport width
          }}
        >
          <Container
            maxWidth="sm" // Controls maximum width, mobile-first centered
            sx={{
              textAlign: "center",
            }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;
