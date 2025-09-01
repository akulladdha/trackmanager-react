// /src/pages/PRTracker.jsx
import React, { useState, useEffect } from "react";
import { 
  Container, Typography, Tabs, Tab, Box,
  Button, Dialog, DialogContent, TextField,
  DialogActions, DialogTitle
} from "@mui/material";
import PRForm from "../contexts/prpages/PRForm";
import PRChart from "../contexts/prpages/PRChart";
import { collection, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const PRTracker = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "users", currentUser.uid, "prs"));
      const uniqueEvents = [...new Set(snapshot.docs.map(doc => doc.data().event))]
        .sort((a, b) => parseInt(a) - parseInt(b));
      setEvents(uniqueEvents);
      if (uniqueEvents.length && !selectedEvent) setSelectedEvent(uniqueEvents[0]);
    };

    fetchEvents();
  }, [currentUser, refreshKey]);

  const handleAddEvent = async () => {
    const distance = parseInt(newEvent);
    if (distance > 0 && !events.includes(newEvent)) {
      await addDoc(collection(db, "users", currentUser.uid, "prs"), {
        event: newEvent,
        time: 0,
        date: new Date().toISOString().split('T')[0],
        isEventMarker: true  
      });
      
      setRefreshKey(r => r + 1);  
      setOpenDialog(false);
      setNewEvent("");
    }
  };

  const handleResetAll = async () => {
    try {
      const prRef = collection(db, "users", currentUser.uid, "prs");
      const snapshot = await getDocs(prRef);
      
      await Promise.all(snapshot.docs.map(doc => deleteDoc(doc.ref)));
      
      setEvents([]);
      setSelectedEvent(null);
      setRefreshKey(r => r + 1);
      setOpenResetDialog(false);
    } catch (error) {
      console.error("Error resetting PRs:", error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard")}
          sx={{ mb: 2 }}
        >
          Dashboard
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => setOpenResetDialog(true)}
          disabled={!events.length}
          sx={{ ml: 2 ,mb: 2}}
        >
          Reset All PRs
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 500 }}>PR Tracker</Typography>
      </Box>
      
      <Box sx={{ mb: 3, display: 'flex', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={selectedEvent}
          onChange={(_, value) => setSelectedEvent(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ flexGrow: 1 }}
        >
          {events.map(event => (
            <Tab key={event} value={event} label={`${event}m`} />
          ))}
        </Tabs>
        <Button onClick={() => setOpenDialog(true)} sx={{ m: 1 }}>
          + Add Event
        </Button>
      </Box>

      {selectedEvent && (
        <>
          <PRForm onAdd={() => setRefreshKey(r => r + 1)} selectedEvent={selectedEvent} />
          <Box sx={{ mt: 4 }}>
            <PRChart event={selectedEvent} key={`${selectedEvent}-${refreshKey}`} />
          </Box>
        </>
      )}

      <Dialog 
        open={openDialog} 
        onClose={() => {
          setOpenDialog(false);
          setNewEvent("");
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            label="Distance (meters)"
            type="number"
            fullWidth
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            InputProps={{ inputProps: { min: 1 } }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddEvent} variant="contained">Add</Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
      >
        <DialogTitle>Reset All PRs?</DialogTitle>
        <DialogContent>
          This will permanently delete all your personal records. This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResetDialog(false)}>Cancel</Button>
          <Button onClick={handleResetAll} color="error" variant="contained">
            Reset All
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PRTracker;
