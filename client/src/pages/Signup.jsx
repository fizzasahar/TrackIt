import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Validation Schema (Same as Backend Joi)
const validationSchema = Yup.object({
    name: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "name can only contain letters and numbers (No spaces or special characters)")
        .min(3, "name must be at least 3 characters long")
        .max(20, "name cannot exceed 20 characters")
        .required("name is required"),

    email: Yup.string()
        .email("Enter a valid email address (e.g., example@domain.com)")
        .matches(/^[^\s@]+@[^\s@]+\.(com|net)$/, "Only .com and .net domains are allowed")
        .required("Email is required"),


    password: Yup.string()
        .min(3, "Password must be at least 3 characters long")
        .max(30, "Password must not exceed 30 characters")
        .matches(/^[^\s]*$/, "Only letters (A-Z, a-z) and numbers (0-9) are allowed. No spaces.")
        .matches(/^[a-zA-Z0-9]*$/, "Only letters (A-Z, a-z) and numbers (0-9) are allowed.")
        .required("Password is required"),
});

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center">
            <h2 className="text-4xl font-semibold text-black mb-6">Create Your Account 🚀</h2>
            <p className="text-gray-500 text-center mb-6">Welcome! Enter your details to register.</p>

            {/* ✅ Formik Handling */}
            <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    setLoading(true);
                    console.log("values:", values);
                    try {
                        const response = await fetch(`${apiUrl}/api/auth/user`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(values),
                        });

                        const data = await response.json();
                        setLoading(false);
                        console.log("Response:", response, "data", data);
                        if (response.ok) {
                            toast.success(data.message);
                            navigate('/dashboard');
                        } else {
                            toast.error(data.message || "An error occurred while signing up");
                        }
                    } catch (error) {
                        setLoading(false);
                        console.log("Error:", error);
                        toast.error(error.message || "An error occurred while signing up");
                    }
                }}
            >
                <Form className="w-full max-w-md space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Name</label>
                        <Field
                            name="name"
                            type="text"
                            className="w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                            placeholder="Enter your name"
                        />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <Field
                            name="email"
                            type="email"
                            className="w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                            placeholder="Enter your email"
                        />
                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className='relative'>
                            <Field
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none'
                                onClick={() => { setShowPassword(!showPassword) }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all"
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </Form>
            </Formik>
            <p className="mt-4 text-gray-600">
                Already have an account?{" "}

                <Link to="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
                    Login
                </Link>
            </p>
        </div>

    );
};

export default Signup;