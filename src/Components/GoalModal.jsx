import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const GoalModal = ({ open, onClose, onSave }) => {
  const [inputCalorieGoal, setInputCalorieGoal] = useState('');

  const handleSave = () => {
    onSave(Number(inputCalorieGoal));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          What is your calorie goal intake?
        </Typography>
        <TextField
          label="Calorie Goal"
          type="number"
          fullWidth
          variant="outlined"
          value={inputCalorieGoal}
          onChange={(e) => setInputCalorieGoal(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default GoalModal;
