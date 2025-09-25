// src/pages/Login.js

import { Link, useNavigate } from "react-router-dom";
import { SignIn } from '../../../redux/features/auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SignIn(formData));
  };

  // Show feedback and redirect if login is successful
  useEffect(() => {
    if (status === 'succeeded' && isAuthenticated) {
      toast.success("Login successful!");
      setFormData({ email: '', password: '' });

      // Navigate to a protected page after login
      setTimeout(() => {
        navigate('/'); // Change to your protected route
      }, 1500);
      
    }

    if (status === 'failed') {
      toast.error(error || "Login failed");
    }
  }, [status, error, isAuthenticated, navigate]);

  return (
    <div className="h-[70vh] w-full flex justify-center items-center">
      <ToastContainer />
      {/* Login Form start */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-sky-400/60 to-sky-700/70 text-white font-bold flex flex-col items-center justify-center gap-5 h-auto py-11 w-[350px] shadow-md shadow-sky-700 rounded-4xl"
      >
        <h1 className="text-3xl font-extrabold text-shadow-2xs text-shadow-blue-500">Login</h1>

        <input
          type="email"
          className="py-3 w-[70%] ring-2 ring-white rounded-3xl px-4 text-white bg-transparent placeholder-white"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />

        <input
          type="password"
          className="py-3 w-[70%] ring-2 ring-white rounded-3xl px-4 text-white bg-transparent placeholder-white"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />

        <button
          type="submit"
          className="ring-2 ring-white rounded-3xl py-2.5 px-4 hover:bg-white hover:text-blue-500"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Don't have an account?{' '}
          <Link to={'/Register'} className="text-sky-300">
            Register Here.
          </Link>
        </p>
      </form>
      {/* Login Form End */}
    </div>
  );
};

export default Login;
