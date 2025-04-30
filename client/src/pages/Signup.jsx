import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import * as Yup from "yup";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Validation Schema
const validationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "Only letters and numbers (no spaces/special characters)")
        .min(3, "At least 3 characters required")
        .max(20, "Maximum 20 characters allowed")
        .required("Name is required"),

    email: Yup.string()
        .email("Enter a valid email")
        .matches(/^[^\s@]+@[^\s@]+\.(com|net)$/, "Only .com and .net domains allowed")
        .required("Email is required"),

    password: Yup.string()
        .min(3, "At least 3 characters required")
        .max(30, "Maximum 30 characters allowed")
        .matches(/^[a-zA-Z0-9]*$/, "Only letters and numbers allowed")
        .required("Password is required"),
});

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen">
            {/* Left Side */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-b from-pink-600 via-orange-400 to-purple-600 text-white p-8"
            >
                <h2 className="text-5xl font-bold mb-4">Welcome Aboard!</h2>
                <p className="text-lg">Let's create magic together ✨</p>
            </motion.div>
            {/* Right Side */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white"
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Create Account 🚀</h2>
                <Formik
                    initialValues={{ name: "", email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        setLoading(true);
                        try {
                            const response = await fetch(`${apiUrl}/api/auth/user`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(values),
                            });
                            const data = await response.json();
                            setLoading(false);

                            if (response.ok) {
                                toast.success(data.message);
                                navigate("/dashboard");
                            } else {
                                toast.error(data.message || "Error signing up");
                            }
                        } catch (error) {
                            setLoading(false);
                            toast.error(error.message || "Something went wrong");
                        }
                    }}
                >
                    <Form className="w-full max-w-md space-y-6">
                        <div>
                            <Field
                                name="name"
                                type="text"
                                placeholder="Name"
                                className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                        </div>
                        <div className="relative">
                            <Field
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full p-4 bg-gradient-to-r from-pink-600 via-orange-400 to-purple-600 hover:bg-pink-600 text-white font-bold rounded-lg transition"
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </Form>
                </Formik>
                <p className="mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-pink-500 font-semibold hover:text-pink-600">
                        Login
                    </Link>
                </p>
            </motion.div>

        </div>
    );
};

export default Signup;
