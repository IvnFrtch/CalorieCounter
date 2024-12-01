import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSnackbar } from '../SnackbarContext';
import frontpage from "../assets/frontpage.jpg";
import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { openSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          openSnackbar('Invalid Credentials', 'error');
          return;
        }
  
        const userDoc = querySnapshot.docs[0];
        const userEmail = userDoc.data().email;
  
        await signInWithEmailAndPassword(auth, userEmail, password);

        
        openSnackbar(`Welcome!`, 'success');
        navigate("/dashboard"); // Redirect after login
      } catch (error) {
        openSnackbar('Failed to Login', 'error');
      }
    };

    return (
      <div className="login_container">
        <div className="login_img_container">
          <img className="login_img" 
          src={frontpage} 
          alt="background"/>
        </div>

        <div className="login_form">
          <div className="login_form_content">
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
              backgroundColor: '#91B70C',
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
      </div>
    );
}

export default Login;
