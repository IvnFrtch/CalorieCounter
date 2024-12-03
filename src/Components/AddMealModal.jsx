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
          bgcolor: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          p: 4,
          textAlign: 'center',
          border: '5px solid #FF6347', // Add playful border
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#FF6347',
            fontFamily: "'Comic Sans MS', cursive",
          }}
        >
          Add a New Meal
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page reload
            handleAddMeal();
          }}
        >
          <TextField
            label="Description"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
          />
          <TextField
            label="Weight (grams)"
            type="number"
            fullWidth
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              width: '100%',
              background: 'linear-gradient(to right, #90EE90, #32CD32)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '10px',
              '&:hover': {
                background: 'linear-gradient(to right, #32CD32, #228B22)',
              },
            }}
          >
            Add Meal
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddMealModal;

