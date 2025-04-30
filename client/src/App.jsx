// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Logout from './pages/Logout';
import Home from "./pages/Home"






const App = () => {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"   // yahan se beautiful dark-light look aayega
      />


      <Routes>
        {/* Redirect to login if the path is root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      

        <Route path="/dashboard" element={<Home /> } />

        {/* Logout Route */}
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>

  );
};

export default App;
