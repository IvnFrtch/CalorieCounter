// SnackbarContext.js
import React, { createContext, useContext, useState } from 'react';
import SnackbarComponent from './Components/SnackbarComponent';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const openSnackbar = (message, severity = 'info') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
            {children}
            <SnackbarComponent
                open={snackbarOpen}
                onClose={closeSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
        </SnackbarContext.Provider>
    );
};
