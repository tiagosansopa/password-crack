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
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#333",
            borderRadius: "8px",
          },
        },
      },
    },
  },
});

const AppLayout = ({ children, isLoggedIn }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const drawer = (
    <div style={{ padding: "20px 10px" }}>
      <List>
        <ListItem
          component={Link}
          onClick={handleDrawerToggle}
          to="/my-stats"
          sx={{
            marginY: 1,
            paddingY: 1.5,
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ListItemIcon>
            <BarChartIcon sx={{ color: "#90caf9" }} />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>
        <ListItem
          component={Link}
          onClick={handleDrawerToggle}
          to="/instructions"
          sx={{
            marginY: 1,
            paddingY: 1.5,
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ListItemIcon>
            <InfoIcon sx={{ color: "#90caf9" }} />
          </ListItemIcon>
          <ListItemText primary="Parte 1" />
        </ListItem>

        <ListItem
          component={Link}
          onClick={handleDrawerToggle}
          to="/profiles"
          sx={{
            marginY: 1,
            paddingY: 1.5,
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <ListItemIcon>
            <PersonIcon sx={{ color: "#f48fb1" }} />
          </ListItemIcon>
          <ListItemText primary="Perfiles" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        {isLoggedIn && (
          <>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="back"
                  onClick={handleBackClick}
                >
                  <ArrowBack />
                </IconButton>

                <Typography
                  variant="h6"
                  noWrap
                  sx={{ flexGrow: 1, textAlign: "center" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  MDA Proyecto 2024
                </Typography>

                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <Drawer
              anchor="right"
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              PaperProps={{
                sx: { width: 240, backgroundColor: "#121212" },
              }}
            >
              {drawer}
            </Drawer>
          </>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
            width: "100vw",
          }}
        >
          <Container
            sx={{
              width: { xs: "90%", md: "70%", lg: "90%" }, // Responsive widths in percentage
              textAlign: "center",
              px: { xs: 1, sm: 2, md: 3, lg: 4 },
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
