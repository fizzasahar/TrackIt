import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice.mjs"; // tumhara logout action
import { toast } from 'react-toastify';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());      // Redux store se user logout
        localStorage.clear();    // Local storage clean
        toast.success("Logged out successfully!", {
            position: "top-right",
            autoClose: 3000, // 3 seconds
          });
          
        navigate("/login");      // Redirect to login page
    }, [dispatch, navigate]);

    return null; // is page pe kuch dikhana nahi hai
};

export default Logout;