import React from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Box,
  Avatar,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import {
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  DirectionsRun as RunIcon,
} from "@mui/icons-material";
import { useAuth } from "../contexts/authContext/index";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";
import WeatherWidget from "./WeatherWidget";
import ChatIcon from "./ChatIcon";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : "G";
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 5 }}>
      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(120deg, #2196f3 0%, #00C896 100%)',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                width: 56, 
                height: 56, 
                bgcolor: 'rgba(255,255,255,0.2)',
                mr: 2 
              }}
            >
              {getInitials(currentUser?.email)}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                Welcome back!
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                {currentUser?.email}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton 
              color="inherit" 
              onClick={() => navigate("/settings")} 
              sx={{ mr: 1 }}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mb: 4 }}>
      <WeatherWidget />

      </Box>

      {/* Dashboard Content */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            height: '120%', 
            display: 'flex', 
            width: '123%',
            flexDirection: 'column', 
            borderRadius: 2, 
            boxShadow: '0 5px 10px rgba(0, 200, 150, 0.1)'
          }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimerIcon color="primary" />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 1000 }}>
                  PR Tracker
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Track and visualize your personal records across different events.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                onClick={() => navigate("/PRTracker")} 
                startIcon={<TrendingUpIcon />}
              >
                View Records
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '120%', 
            width: '118%',
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 2, 
            boxShadow: '0 5px 10px rgba(0, 200, 150, 0.1)',
            marginLeft: '100px',
          }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <RunIcon color="primary" />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 1000, }}>
                  Training Log
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Log your daily training sessions and track your progress.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="medium" 
                onClick={() => navigate("/TrainingLog")} 
                startIcon={<TrendingUpIcon />}
              >
                View Log
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-start', 
          alignItems: 'flex-start',
          gap: 4,
          width: '100%', 
          mt: 5, 
          ml: 39 
        }}>
          <Chatbot />
          
        </Box>
      </Grid>
      <ChatIcon />      
    </Container>
  );
}
