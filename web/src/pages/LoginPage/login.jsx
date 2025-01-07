import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            console.log('Login response:', data);
    
            if (response.ok) {
                setSuccessMessage('Login successful!');
                setErrorMessage('');
    
                if (data.token) {
                    localStorage.setItem('authToken', data.token); // Save the token
                    localStorage.setItem('role', data.role); // Save the user's role
                    localStorage.setItem('name', data.name || ''); // Save the user's name
                } else {
                    console.error('No token returned from server');
                    setErrorMessage('No token returned from server');
                    return;
                }
    
                // Redirect based on role
                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            } else {
                setErrorMessage(data.message || 'Login failed');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('An error occurred during login');
            setSuccessMessage('');
            console.error('Login error:', error);
        }
    };
    
    
    
    
    
    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setSuccessMessage('');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSuccessMessage('Sign-up successful!');
                setErrorMessage('');
    
                // Save token or user info after signup
                if (data.token) {
                    localStorage.setItem('token', data.token); // Save the token
                    localStorage.setItem('name', data.name || ''); // Save user's name (use "name" key)
                }
    
                setTimeout(() => {
                    setIsLogin(true); // Switch to the login form
                    setSuccessMessage('');
                }, 2000); // Wait 2 seconds before switching
            } else {
                setErrorMessage(data.message || 'Sign-up failed');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('An error occurred during sign-up');
            setSuccessMessage('');
            console.error(error);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full transition-all duration-500 ease-in-out">
                {/* Left Image Section */}
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
                    }}
                ></div>

                {/* Right Section */}
                <div className="w-full p-8 lg:w-1/2">
                    {/* Tabs */}
                    <div className="flex justify-center mb-6">
                        <button
                            className={`text-lg font-bold px-4 py-2 transition-all duration-500 ease-in-out ${
                                isLogin
                                    ? 'text-blue-600 border-b-4 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`text-lg font-bold px-4 py-2 transition-all duration-500 ease-in-out ${
                                !isLogin
                                    ? 'text-blue-600 border-b-4 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-500 text-center mb-4">{successMessage}</p>
                    )}

                    {/* Login Form */}
                    {isLogin && (
                        <div className="transition-all duration-500 ease-in-out">
                            <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back!</h2>
                            <p className="text-lg text-gray-600 text-center mt-2">
                                Login to start shopping your favorite items
                            </p>

                            {/* Email Input */}
                            <div className="mt-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                <input
                                    className="bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 rounded-lg py-2 px-4 block w-full"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                    <a href="/" className="text-xs text-blue-500 hover:underline">Forgot Password?</a>
                                </div>
                                <input
                                    className="bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 rounded-lg py-2 px-4 block w-full"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Login Button */}
                            <div className="mt-6">
                                <button
                                    onClick={handleLogin}
                                    className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Sign Up Form */}
                    {!isLogin && (
                        <div className="transition-all duration-500 ease-in-out">
                            <h2 className="text-3xl font-bold text-gray-800 text-center">Create Your Account</h2>
                            <p className="text-lg text-gray-600 text-center mt-2">
                                Sign up to start shopping with amazing deals
                            </p>

                            {/* Name Input */}
                            <div className="mt-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                                <input
                                    className="bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 rounded-lg py-2 px-4 block w-full"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Email Input */}
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                <input
                                    className="bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 rounded-lg py-2 px-4 block w-full"
                                    type="email"
                                    placeholder="example@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input
                                    className="bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 rounded-lg py-2 px-4 block w-full"
                                    type="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {/* Confirm Password Input */}
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                                <input
                                    className="bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300 rounded-lg py-2 px-4 block w-full"
                                    type="password"
                                    placeholder="********"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {/* Sign Up Button */}
                            <div className="mt-6">
                                <button
                                    onClick={handleSignUp}
                                    className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
