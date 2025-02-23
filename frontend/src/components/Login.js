import { useState } from "react";
import axios from "axios";
import { loginUser, registerUser } from "./utils/ApiRoutes";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });
  const [error, setError] = useState("");
  const navigate = useNavigate()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { email, password } = formData;
    const response = await loginUser({  email, password });
    if(response){
        setFormData({
            email: "",
            password: ""
        })
        navigate('/')
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
      
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
    
        <button type="submit" className="register-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
