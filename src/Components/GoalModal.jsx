import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

import { auth, db } from "../firebase.js";
import { doc, updateDoc } from 'firebase/firestore';

const GoalModal = ({ open, onClose, onSave }) => {
  const [inputCalorieGoal, setInputCalorieGoal] = useState('');

  const handleSave = async () => {
    try {
      const userId = auth.currentUser.uid; // Get current user's UID
      const userDocRef = doc(db, 'users', userId); // Reference to the user document

      await updateDoc(userDocRef, { calorieGoal: Number(inputCalorieGoal) });
      console.log('Calorie goal saved successfully!');
      
      // Pass the new calorie goal back to the parent component
      onSave(Number(inputCalorieGoal));
    } catch (error) {
      console.error('Error saving calorie goal:', error);
    }
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
          background: 'linear-gradient(to bottom right, #FF6347, #90EE90)',
          color: 'white',
          borderRadius: '15px',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'white' }}
        >
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
          sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
          }}
          InputLabelProps={{
            sx: {
              color: '#FF6347',
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#FF6347',
            '&:hover': { backgroundColor: '#FF4500' },
            color: 'white',
            fontWeight: 'bold',
          }}
          onClick={handleSave}
          disabled={!inputCalorieGoal}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default GoalModal;
