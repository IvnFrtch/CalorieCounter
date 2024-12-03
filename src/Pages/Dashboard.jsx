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
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.calorieGoal === undefined) {
            setIsGoalModalOpen(true);
          } else {
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

  const handleSaveGoal = (newGoal) => {
    setCalorieGoal(newGoal);
  };

  useEffect(() => {
    if (calorieGoal && caloriesConsumed > calorieGoal) {
      alert('You have exceeded your calorie goal!');
    }
  }, [caloriesConsumed, calorieGoal]);

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

  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: 'linear-gradient(to right, #FF6347, #90EE90)',
          minHeight: '100vh',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom color="white">{currentDate}</Typography>

        <GoalModal open={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} onSave={handleSaveGoal} />
        <AddMealModal open={isAddMealModalOpen} onClose={() => setIsAddMealModalOpen(false)} onAddMeal={handleAddMeal} />

        {calorieGoal && (
          <Box
            sx={{
              textAlign: 'center',
              mt: 4,
              p: 3,
              backgroundColor: 'white',
              borderRadius: '15px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              width: '80%',
            }}
          >
            <Typography variant="h4" gutterBottom color="primary">
              Calorie Tracker Dashboard
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
              <Box>
                <Typography variant="h6" color="secondary">Calorie Goal</Typography>
                <Typography variant="h5" color="error">{calorieGoal} kcal</Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="secondary">Calories Consumed</Typography>
                <Typography variant="h5" color="green">{caloriesConsumed} kcal</Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="secondary">Calories Left</Typography>
                <Typography variant="h5" color="error">
                  {Math.max(calorieGoal - caloriesConsumed, 0)} kcal
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FF6347',
                color: 'white',
                mt: 4,
                '&:hover': { backgroundColor: '#FF4500' },
              }}
              onClick={() => setIsAddMealModalOpen(true)}
            >
              Add Meal
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#90EE90',
                color: 'white',
                mt: 4,
                ml: 2,
                '&:hover': { backgroundColor: '#32CD32' },
              }}
              onClick={() => setIsGoalModalOpen(true)}
            >
              Update Goal
            </Button>

            <TableContainer
              component={Paper}
              sx={{ mt: 4, backgroundColor: '#FFFAF0', borderRadius: '10px' }}
            >
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
      </Box>
    </>
  );
};

export default Dashboard;
