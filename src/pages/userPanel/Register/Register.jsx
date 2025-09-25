import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Registertion } from '../../../redux/features/auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.auth); // Get status and error from Redux state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Registertion(formData));
  };

  // Handle different states when the registration is in progress, success, or failed
  useEffect(() => {
    // if (status === 'loading') {
    //   toast.info("Registering...");
    // }
    if (status === 'succeeded') {
      toast.success("Registration successful!");
      setFormData({
        username: '',
        email: '',
        password: ''
      });
    }
    if (status === 'failed') {
      toast.error(error || "Registration failed");
    }
  }, [status, error]); // Trigger effect when status or error changes

  return (
    <div className="h-[70vh] w-[100%] flex justify-center items-center">
      {/* Register Form start */}
      <ToastContainer />
      <form
        className="bg-gradient-to-r from-sky-400/60 to-sky-700/70 text-white font-bold flex flex-col items-center justify-center gap-5 h-auto py-11 w-[350px] shadow-md shadow-sky-700 rounded-4xl"
        onSubmit={handleSubmit} // Attach the submit handler
      >
        <h1 className="text-3xl font-extrabold text-shadow-2xs text-shadow-blue-500">
          Register
        </h1>
        <input
          type="text"
          className="py-3 w-[70] ring-2 ring-white rounded-3xl px-2 text-white"
          placeholder="UserName"
          onChange={handleChange}
          name="username"
          value={formData.username}
        />
        <input
          type="email" // Change to type email for proper validation
          className="py-3 w-[70] ring-2 ring-white rounded-3xl px-2 text-white"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={formData.email}
        />
        <input
          type="password" // Mask the password input
          className="py-3 w-[70] ring-2 ring-white rounded-3xl px-2 text-white"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />
        <button
          type="submit" // Ensure the button submits the form
          className="ring-2 ring-white rounded-3xl py-2.5 px-4 hover:bg-white hover:text-blue-500"
          disabled={status === 'loading'} // Disable button while loading
        >
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>
        <p>
          For Login Click Here..{' '}
          <Link to={'/Login'} className="text-sky-300">
            Login Here.
          </Link>
        </p>
      </form>
      {/* Register Form End */}
    </div>
  );
};

export default Register;
