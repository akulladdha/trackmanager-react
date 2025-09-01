import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PRTracker from "./pages/PRTracker";
import TrainingLog from "./pages/TrainingLog";
import Chatbot from "./pages/Chatbot";
import { AuthProvider } from "./contexts/authContext/index";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { useState } from 'react';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/PRTracker" element={<PRTracker />} />
            <Route path="/TrainingLog" element={<TrainingLog />} />
            <Route path="/Chatbot" element={<Chatbot />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;




