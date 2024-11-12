import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const AddMealModal = ({ open, onClose, onAddMeal }) => {
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');

  const handleAddMeal = () => {

    onAddMeal({
      description,
      weight: Number(weight),
      calories: Number(calories),
    });
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
          Add Meal
        </Typography>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevents page reload
          handleAddMeal();
        }}>
        <TextField
          label="Description"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Weight (grams)"
          type="number"
          fullWidth
          variant="outlined"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Calories"
          type="number"
          fullWidth
          variant="outlined"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          margin="normal"
          required
        />
        <Button type="type" variant="contained" color="primary">
          Add Meal
        </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddMealModal;
