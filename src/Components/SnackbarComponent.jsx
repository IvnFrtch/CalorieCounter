import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarComponent = ({
  open,
  onClose,
  message,
  severity = 'info',
  duration = 6000,
}) => {
  // Custom colors for different severities
  const severityColors = {
    success: {
      background: 'linear-gradient(to right, #90EE90, #32CD32)',
      color: 'white',
    },
    error: {
      background: 'linear-gradient(to right, #FF6347, #FF4500)',
      color: 'white',
    },
    warning: {
      background: 'linear-gradient(to right, #FFD700, #FFA500)',
      color: 'white',
    },
    info: {
      background: 'linear-gradient(to right, #ADD8E6, #87CEEB)',
      color: 'white',
    },
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          ...severityColors[severity], // Apply custom gradient based on severity
          fontWeight: 'bold',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
