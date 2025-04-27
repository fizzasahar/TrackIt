// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import ProtectedRoute from './components/ProtectedRoute';
import TaskBoard from './components/TaskBoard';
import Calendar from './components/Calendar';


import './App.css';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="flex">
        {isAuthenticated && <Sidebar />}

        <Routes>
          {/* Redirect to login if the path is root */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><TaskBoard/></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar/></ProtectedRoute>} />

          {/* Logout Route */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
