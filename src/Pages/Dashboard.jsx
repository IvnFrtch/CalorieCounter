import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import GoalModal from '../Components/GoalModal';
import AddMealModal from '../Components/AddMealModal';

const Dashboard = () => {
  const [calorieGoal, setCalorieGoal] = useState(null);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(true);
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [meals, setMeals] = useState([]);

  const handleAddMeal = (meal) => {
    setMeals([...meals, meal]);
    setCaloriesConsumed(caloriesConsumed + meal.calories);
  };

  // Trigger alert when calories exceed the goal
  useEffect(() => {
    if (calorieGoal && caloriesConsumed > calorieGoal) {
      alert('You have exceeded your calorie goal!');
    }
  }, [caloriesConsumed, calorieGoal]);

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      {/* Display current date */}
      <Typography variant="h5" gutterBottom>{currentDate}</Typography>

      {/* Goal Modal */}
      <GoalModal open={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} onSave={(goal) => setCalorieGoal(goal)} />

      {/* Add Meal Modal */}
      <AddMealModal open={isAddMealModalOpen} onClose={() => setIsAddMealModalOpen(false)} onAddMeal={handleAddMeal} />

      {calorieGoal && (
        <Box sx={{ textAlign: 'center', mt: 4, width: '80%' }}>
          <Typography variant="h4" gutterBottom>
            Calorie Tracker Dashboard
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
            <Box>
              <Typography variant="h6">Calorie Goal</Typography>
              <Typography variant="h5" color="primary">{calorieGoal} kcal</Typography>
            </Box>
            <Box>
              <Typography variant="h6">Calories Consumed</Typography>
              <Typography variant="h5" color="secondary">{caloriesConsumed} kcal</Typography>
            </Box>
            <Box>
              <Typography variant="h6">Calories Left</Typography>
              <Typography variant="h5" color="error">{Math.max(calorieGoal - caloriesConsumed, 0)} kcal</Typography>
            </Box>
          </Box>

          {/* Add Meal Button */}
          <Button variant="contained" onClick={() => setIsAddMealModalOpen(true)} sx={{ mt: 4 }}>
            Add Meal
          </Button>

          {/* Meals Table */}
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Weight (g)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meals.map((meal, index) => (
                  <TableRow key={index}>
                    <TableCell>{meal.description}</TableCell>
                    <TableCell align="right">{meal.weight}</TableCell>
                    <TableCell align="right">{meal.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default Dashboard;