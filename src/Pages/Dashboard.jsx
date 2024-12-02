import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { auth, db } from "../firebase.js";
import { doc, getDoc, setDoc } from 'firebase/firestore';

import GoalModal from '../Components/GoalModal';
import AddMealModal from '../Components/AddMealModal';
import Header from '../Components/Header';

const Dashboard = () => {
  const [calorieGoal, setCalorieGoal] = useState(null);
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
  const [meals, setMeals] = useState([]);

  // Fetch user's calorie field from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get current user's UID
        const userDocRef = doc(db, 'users', userId); // Reference to the user document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log(userData);
          if (userData.calorieGoal == undefined){
            setIsGoalModalOpen(true);
          } else {
            console.log("Calorie Goal: " + userData.calorieGoal)
            setCalorieGoal(userData.calorieGoal);
          }
        } else {
          console.log('No user data found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

   // Handle calorie goal update after saving in the GoalModal
   const handleSaveGoal = (newGoal) => {
    setCalorieGoal(newGoal); // Update the calorie goal in the state
  };
  // Calorie exceeds goal
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

  const handleAddMeal = (meal) => {
    setMeals([...meals, meal]);
    setCaloriesConsumed(caloriesConsumed + meal.calories);
  };

  // Open GoalModal for updating
  const handleEditGoal = () => {
    setIsGoalModalOpen(true);
  };

  return (
    <>
    <Header/>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      {/* Display current date */}
      <Typography variant="h5" gutterBottom>{currentDate}</Typography>

      {/* Goal Modal */}
      <GoalModal open={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} onSave={handleSaveGoal} />

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
          <Button variant="contained" color="success" onClick={() => setIsAddMealModalOpen(true)} sx={{ mt: 4, mr: 4 }}>
            Add Meal
          </Button>
          <Button variant="contained" color="primary" onClick={() => setIsGoalModalOpen(true)} sx={{ mt: 4 }}>
            Update Goal
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
    </>
    
  );
};

export default Dashboard;