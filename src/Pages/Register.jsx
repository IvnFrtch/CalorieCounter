// Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js"; // Import your Firebase config
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useSnackbar } from '../SnackbarContext';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    try {
      // Step 1: Check if username already exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        openSnackbar('Username already taken.', 'error');
        return;
      }
      // Register the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save username and other details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        name,
        email,
        uid: user.uid,
      });
      openSnackbar('Registration successful!', 'success');
      navigate('/');
      
    } catch (error) {
      openSnackbar('Registration Failed', 'error');
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Register</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Register
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;
