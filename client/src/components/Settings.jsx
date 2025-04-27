import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential, signOut } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Switch } from "@headlessui/react";

const Settings = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  // Initial States
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, push: true });

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    }
  }, [user]);

  // 📌 Firestore se user data fetch karna
  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setName(userData.name || "");
        setDarkMode(userData.darkMode || false);
        setTwoFactor(userData.twoFactor || false);
        setNotifications(userData.notifications || { email: true, push: true });
      } else {
        // User ka document create karna agar nahi hai
        await setDoc(userRef, {
          name: user.displayName || "User",
          email: user.email,
          darkMode: false,
          twoFactor: false,
          notifications: { email: true, push: true },
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // 📌 Profile Update Function
  const handleUpdateProfile = async () => {
    try {
      if (!user) return alert("User not found!");

      // Firestore Update
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name });

      // Firebase Auth Profile Update
      await updateProfile(user, { displayName: name });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

  // 📌 Password Change Function
  const handleChangePassword = async () => {
    try {
      if (!password) return alert("Enter a new password!");

      const currentPassword = prompt("Enter current password:");
      if (!currentPassword) return;

      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, password);

      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert(error.message);
    }
  };

  // 📌 Logout Function
  const handleLogout = async () => {
    await signOut(auth);
  };


  // 📌 Two-Factor Authentication Toggle
  const toggleTwoFactor = async () => {
    setTwoFactor(!twoFactor);
    if (user) {
      await updateDoc(doc(db, "users", user.uid), { twoFactor: !twoFactor });
    }
  };


  return (
    <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col ">
      <h2 className="text-3xl font-semibold mb-6">Settings</h2>

      {/* Profile Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">User Profile</h3>
        <input className="w-full mt-2 p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full mt-2 p-2 border rounded bg-gray-200" value={email} disabled />
        <button className="mt-4 cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg shadow-orange-600/50 hover:bg-orange-600 transition duration-300 ease-in-out" onClick={handleUpdateProfile}>
          Save Changes
        </button>
      </div>

      {/* Password Change */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Change Password</h3>
        <input className="w-full mt-2 p-2 border rounded" type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="mt-4 cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:shadow-lg shadow-gray-600/50 hover:bg-gray-600 transition duration-300 ease-in-out" onClick={handleChangePassword}>
          Update Password
        </button>
      </div>



      {/* Account Security */}
      <div className="mb-6">
        <h3 className="text-lg font-medium">Account Security</h3>
        <div className="flex items-center mt-2">
          <span className="mr-3">Two-Factor Authentication</span>
          <Switch
            checked={twoFactor}
            onChange={toggleTwoFactor}
            className={`${twoFactor ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="inline-block h-4 w-4 transform bg-white rounded-full transition" />
          </Switch>
        </div>
        <button className="mt-4 cursor-pointer bg-red-800 text-white px-4 py-2 rounded-lg hover:shadow-lg shadow-red-600/50 hover:bg-red-600 transition duration-300 ease-in-out" onClick={handleLogout}>
          Logout
        </button>
      </div>


    </div>
  );
};

export default Settings;
