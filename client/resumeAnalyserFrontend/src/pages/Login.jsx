import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await loginUser({ email, password });
        localStorage.setItem('token', data.token);
        navigate('/');
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                {/* Card Container */}
                <div className='bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4'>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h2>
                        <p className='text-gray-600'>Sign in to your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Email Input */}
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-gray-700 block'>Email Address</label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm" 
                                    placeholder="Enter your email" 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-gray-700 block'>Password</label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm" 
                                    placeholder="Enter your password" 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl'
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <div className='mt-6 text-center'>
                        <p className='text-sm text-gray-600'>
                            Don't have an account? 
                           <Link to="/register" className='text-blue-600 hover:text-blue-700 font-medium ml-1 hover:underline transition-colors duration-200'>Sign up</Link>
                        </p>
                    </div>
                </div>

                {/* Additional Visual Elements */}
                
            </div>
        </div>
    )
}

export default Login