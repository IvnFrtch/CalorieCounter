import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

import { auth, db } from "../firebase.js";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const GoalModal = ({ open, onClose, onSave }) => {
  const [inputCalorieGoal, setInputCalorieGoal] = useState('');

  const handleSave = async() => {
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
        <Button variant="contained" color="success" onClick={handleSave} disabled={!inputCalorieGoal}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default GoalModal;
