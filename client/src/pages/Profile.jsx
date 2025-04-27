// pages/Profile.js
import React from "react";

const Profile = () => {
  const user = {
    name: "Fizza Sahar",
    gender: "Female",
    email: "fizzasahar44@gmail.com",
    department: "Development",
    joiningDate: "1st Jan 2025",
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Employee Profile</h1>
      <div className="bg-white p-6 shadow rounded-lg space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <p><strong>Joining Date:</strong> {user.joiningDate}</p>
      </div>
    </div>
  );
};

export default Profile;