import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TrainingLog = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [trainingEntries, setTrainingEntries] = useState([]);
  const [form, setForm] = useState({
    title: "",
    distance: "",
    description: "",
    intensity: "medium",
  });

  const fetchLogsForDate = useCallback(async (date) => {
    const ref = collection(db, 'users', currentUser.uid, 'trainings');
    const snapshot = await getDocs(query(ref, where("date", "==", date.toDateString())));
    const logs = snapshot.docs.map(doc => doc.data());
    setTrainingEntries(logs);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) fetchLogsForDate(selectedDate);
  }, [selectedDate, currentUser, fetchLogsForDate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const ref = collection(db, 'users', currentUser.uid, 'trainings');
      await addDoc(ref, {
        ...form,
        date: selectedDate.toDateString(),
        createdAt: new Date(),
      });
      setForm({ title: "", distance: "", description: "", intensity: "medium" });
      fetchLogsForDate(selectedDate);
    } catch (err) {
      console.error(err);
      alert("Failed to save training.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard")}
          sx={{ mb: 2 }}
        >
          Dashboard
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>Training Log</Typography>
      </Box>
      <Grid container spacing={3}>
        {/* Calendar */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2}
            sx={{ 
              p: 2,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              height: '100%'
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                orientation="portrait"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                sx={{
                  '& .MuiPickersCalendarHeader-root': {
                    mb: 2,
                    px: 2,
                  },
                }}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>

        {/* Training Entries for Selected Date */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2}
            sx={{ 
              p: 3,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              height: '100%',
              minHeight: '500px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, mb: 3 }}>
              Training on {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>

            {trainingEntries.length === 0 ? (
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}
                >
                  No training logged for this day
                </Typography>
              </Box>
            ) : (
              <Box sx={{ 
                flex: 1,
                overflowY: 'auto',
                pr: 1
              }}>
                {trainingEntries.map((entry, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {entry.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      {entry.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Distance: {entry.distance} | Intensity: {entry.intensity}
                    </Typography>
                    {i < trainingEntries.length - 1 && <Divider sx={{ my: 1.5 }} />}
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Add New Entry Form */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2}
            sx={{ 
              p: 3,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              height: '100%',
              minHeight: '500px'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, mb: 3 }}>
              Add New Training
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                name="title"
                label="Title"
                value={form.title}
                onChange={handleChange}
                variant="outlined"
                size="medium"
              />
              <TextField
                fullWidth
                name="distance"
                label="Distance"
                value={form.distance}
                onChange={handleChange}
                variant="outlined"
                size="medium"
                placeholder="e.g., 5km, 3 miles"
              />
              <FormControl fullWidth>
                <InputLabel>Intensity</InputLabel>
                <Select
                  name="intensity"
                  value={form.intensity}
                  onChange={handleChange}
                  label="Intensity"
                  size="medium"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={4}
                value={form.description}
                onChange={handleChange}
                variant="outlined"
                placeholder="How was your training?"
              />
              <Button 
                variant="contained" 
                onClick={handleSubmit} 
                disabled={!form.title || !form.distance}
                sx={{ 
                  mt: 1,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Save Training
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TrainingLog;
