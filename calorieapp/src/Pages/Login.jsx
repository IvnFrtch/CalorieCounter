import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      
  
      try {
        // Look up the email by username in Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          setErrorMessage("Username not found");
          return;
        }
  
        const userDoc = querySnapshot.docs[0];
        const userEmail = userDoc.data().email;
  
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, userEmail, password);
        alert("Login successful!");
        navigate("/dashboard"); // Redirect after login
      } catch (error) {
        setErrorMessage("Failed to log in: " + error.message);
      }
    };
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Login</h2>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            required
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}


export default Login