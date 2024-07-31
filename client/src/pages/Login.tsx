import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (email.trim() !== "" && password.trim() !== "") {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Welcome to <span>Workflo!</span></h1>
        <div className="inputBx">
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <div className="inputBx">
            <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit" className="btn btn-quaternary">Login</button>
        <div className="footer"> 
          <p>Don't have an account ?</p>
          <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
