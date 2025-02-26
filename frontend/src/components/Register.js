import { useState } from "react";
import { registerUser } from "./utils/ApiRoutes";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword } = formData;

    // Validate before API call
    if (!username || !email || !password || !confirmPassword) {
    //   setError("All fields are required");
      toast('All fields are required', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
      return;
    }

    if (password !== confirmPassword) {
      // setError("Passwords do not match");
      toast('All fields are required', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
      return;
    }

    try {
      const {data} = await registerUser({ username, email, password });
       
      if (data) {
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        navigate('/login');
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.data?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="register-input"
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
