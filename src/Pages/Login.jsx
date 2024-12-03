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
    <div
      className="login_container"
      style={{
        display: 'flex',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #FF6347, #32CD32)',
      }}
    >
      {/* Background Image Section */}
      <div
        className="login_img_container"
        style={{
          flex: 1,
          backgroundImage: `url(${frontpage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '15px',
          borderBottomLeftRadius: '15px',
        }}
      ></div>

      {/* Form Section */}
      <div
        className="login_form"
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderTopRightRadius: '15px',
          borderBottomRightRadius: '15px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          className="login_form_content"
          style={{
            width: '80%',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontWeight: 'bold',
              fontFamily: "'Comic Sans MS', cursive",
              color: '#FF6347',
              marginBottom: '10px',
            }}
          >
            Welcome Back!
          </h2>
          <p style={{ color: '#777', marginBottom: '20px' }}>Please enter your details</p>

          <form onSubmit={handleSubmit}>

            {/* Username Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#32CD32', fontWeight: 'bold', marginBottom: '5px' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                required
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#32CD32', fontWeight: 'bold', marginBottom: '5px' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  outline: 'none',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                required
              />
            </div>

            {/* Options and Forgot Password */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div>
                <label style={{ fontSize: '14px', color: '#777' }}>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  Remember for 30 days
                </label>
              </div>
              <Link
                to="/forgot-password"
                style={{ textDecoration: 'none', color: '#FF6347', fontWeight: 'bold' }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(to right, #FF6347, #32CD32)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              Log In
            </button>
          </form>

          {/* Signup Redirect */}
          <p style={{ marginTop: '20px', fontSize: '14px', color: '#777' }}>
            Don’t have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: '#32CD32', fontWeight: 'bold' }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

