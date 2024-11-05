import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import CustomSnackbar from '../Components/SnackbarComponent'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const handleOpenSnackbar = (message, severity = 'info') => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      
  
      try {
        // Look up the email by username in Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          handleOpenSnackbar('Invalid Credentials', 'error');
          return;
        }
  
        const userDoc = querySnapshot.docs[0];
        const userEmail = userDoc.data().email;
  
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, userEmail, password);
        navigate("/dashboard"); // Redirect after login
      } catch (error) {
        handleOpenSnackbar('Failed to Login', 'error');
      }
    };
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      {/* Left side illustration */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ededed',
      }}>
        <div style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#ededed',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Placeholder for illustration */}
          <img src="your-illustration-url.png" alt="illustration" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Right side login form */}
      <div style={{
        flex: 1,
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
      }}>
        <h2 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>Welcome back!</h2>
        <p style={{ textAlign: 'center', color: '#777', marginBottom: '20px' }}>Please enter your details</p>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div style={{ marginBottom: '10px' }}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '10px' }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
              required
            />
          </div>

          {/* Remember me and Forgot password */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              
              <span>Remember for 30 days</span>
            </div>
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#007bff' }}>Forgot password?</Link>
          </div>

          {/* Login button */}
          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginBottom: '15px',
            cursor: 'pointer'
          }}>
            Log In
          </button>

        </form>

        {/* Register Link */}
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Don’t have an account? <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}


export default Login;