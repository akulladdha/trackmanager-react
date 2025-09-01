import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Chatbot = () => {
  return (
    <Box sx={{  }}>
      <Paper
        elevation={3}
        sx={{
          p: 1,
          borderRadius: 2,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 200, 150, 0.1)'
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            mb: 3
          }}
        >
          <SmartToyIcon sx={{ fontSize: 30, color: 'white' }} />
        </Box>
        
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            mb: 2
          }}
        >
          AI Coach Assistant
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            mb: 3,
            lineHeight: 1.6,
            maxWidth: 400,
            margin: '0 auto'
          }}
        >
          Your personal AI training assistant is ready to help! Click the chat button in the bottom-right corner to start a conversation.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            mt: 3,
            flexWrap: 'nowrap'
          }}
        >
          <Feature 
            title="24/7 Available" 
            description="Get assistance anytime you need it"
          />
          <Feature 
            title="Training Tips" 
            description="Receive personalized workout advice"
          />
          <Feature 
            title="Nutrition Guidance" 
            description="Get personailzed nutrition advice"
          />
        </Box>
      </Paper>
    </Box>
  );
};

const Feature = ({ title, description }) => (
  <Box
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: 'rgba(33, 150, 243, 0.04)',
      minWidth: 150,
      textAlign: 'left'
    }}
  >
    <Typography 
      variant="subtitle1" 
      sx={{ 
        fontWeight: 600,
        color: 'primary.main',
        mb: 1
      }}
    >
      {title}
    </Typography>
    <Typography 
      variant="body2" 
      color="text.secondary"
    >
      {description}
    </Typography>
  </Box>
);

export default Chatbot;
