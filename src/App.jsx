// App.js
import React from 'react';
import { SnackbarProvider } from './SnackbarContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
