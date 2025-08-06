import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup error");
    }
    navigate("/app");
  };

  return (
  <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Join us today and get started</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="Enter your full name"
              className={`form-input ${loading ? 'disabled' : ''}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              className={`form-input ${loading ? 'disabled' : ''}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="Create a strong password"
              className={`form-input ${loading ? 'disabled' : ''}`}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={`signup-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="btn-content">
                <span className="spinner"></span>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <span 
              className="link-text"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
)
}