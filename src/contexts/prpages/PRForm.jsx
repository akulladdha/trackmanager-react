// /src/components/PRForm.jsx
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useAuth } from "../authContext/index";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const PRForm = ({ onAdd, selectedEvent }) => {
  const { currentUser } = useAuth();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!/^[0-9]{1,2}:[0-5][0-9]$/.test(time)) {
      setError("Use MM:SS format (e.g., 04:30)");
      return;
    }

    try {
      const [min, sec] = time.split(":").map(Number);
      if (min > 59) {
        setError("Minutes cannot exceed 59");
        return;
      }

      await addDoc(collection(db, "users", currentUser.uid, "prs"), {
        time: min * 60 + sec,
        date,
        event: selectedEvent
      });
      
      setTime("");
      setDate("");
      setError("");
      onAdd();
    } catch (err) {
      setError("Failed to save PR");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
      <TextField
        label="Time (MM:SS)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="04:30"
        error={!!error}
        helperText={error}
        required
        sx={{ flexGrow: 1 }}
      />
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        InputLabelProps={{ shrink: true }}
        sx={{ flexGrow: 1 }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        disabled={!time || !date}
      >
        Add PR
      </Button>
    </Box>
  );
};

export default PRForm;
