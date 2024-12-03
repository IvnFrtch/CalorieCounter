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
  const calorie = 0;

  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  console.log("Authenticated user:", auth.currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        openSnackbar('Username already taken.', 'error');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username,
        name,
        email,
        uid: user.uid,
      });
      openSnackbar('Registration successful!', 'success');
      navigate('/');
      
    } catch (error) {
      console.error("Error during registration:", error.code, error.message);
      openSnackbar(`Registration Failed: ${error.message}`, 'error');
    }
  };

  return (
    <div style={styles.outerContainer}>
      {}
      <div style={styles.leftSection}>
        <img
          src="/src/assets/registerpage.png"
          alt="Illustration"
          style={styles.illustration}
        />
      </div>
      <div style={styles.rightSection}> {/* Updated here */}
          <div style={styles.container}>
            <h2 style={styles.header}>Register</h2>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                  required
                />
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
              </div>
              <button type="submit" style={styles.button}>
                Register
              </button>
            </form>
            <p style={styles.footerText}>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: "flex",
    minHeight: "100vh",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
    backgroundColor: "#91B70C", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    clipPath: "polygon(0 0, 75% 0, 65% 100%, 0% 100%)",
  },
  illustration: {
    maxWidth: "100%",
    height: "auto",
  },
  rightSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: "20px",
  },
  container: {
    maxWidth: "400px",
    width: "100%",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  header: {
    color: "#1976D2",
    marginBottom: "20px",
  },
  errorMessage: {
    color: "red",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  button: {
    width: "50%",
    padding: "10px",
    backgroundColor: "#91B70C",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  footerText: {
    marginTop: "10px",
    color: "#555",
  },
};

export default Register;