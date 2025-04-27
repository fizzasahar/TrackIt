import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);

        try {
            const response = await fetch(`${apiUrl}/api/auth/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("signup failed. Server responded with " + response.status);
              }
              
            const data = await response.json();
            setLoading(false);
            if (response.ok) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("userId", data._id)
                dispatch(loginSuccess({
                    token: data.token,
                    userId: data.userId
                }))
                toast.success(data.message);

                navigate('/dashboard');
            } else {
                toast.error(data.message || 'Invalid email or password');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            toast.error(error.message || 'An error occurred while logging in');
        }
    };

    return (
        <div className='flex-1 p-6 md:p-10 lg:p-12 bg-gray-100 min-h-screen flex flex-col items-center'>

            <h2 className="text-4xl font-semibold text-black mb-6">Welcome Back 👋</h2>
            <p className='text-gray-500 text-center mb-6'>Enter your details to sign in.</p>
            <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        onChange={handleChange}
                        name='email'
                        type='email'
                        className='w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all'
                        placeholder='Your Email'
                        required
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Password</label>
                    <div className='relative'>
                        <input
                            onChange={handleChange}
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            className="w-full p-4 rounded-lg bg-white shadow-md text-black border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                            placeholder='Your Password'
                            required
                        />
                        <button
                            type='button'
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>



                <button
                    className="w-full p-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-all"
                    type='submit'
                    disabled={loading}
                >
                    {loading ? 'Logging In...' : 'Log In'}
                </button>
            </form>



            <p className="mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-semibold">
                      Signup
                    </Link>
                  </p>
        </div>

    );
};

export default Login;