// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { GoogleLogin } from "@react-oauth/google";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try{
      
//       const res = await axios.post("http://localhost:5000/api/auth/login", form);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       localStorage.setItem("token", res.data.token)
//       navigate("/app");
//     } catch(error){
//       alert(error.response?.data?.msg || "Login error");
//     }
//   };

//   <GoogleLogin
//     onSuccess={async (credentialResponse) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/google", {
//         token: credentialResponse.credential,
//       });

//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       localStorage.setItem("token", res.data.token);
//       navigate("/app");
//     } catch (error) {
//       alert(error.response?.data?.message || "Google Login Failed");
//     }
//   }}
//   onError={() => {
//     alert("Google Sign-In Failed");
//   }}
// />

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <form onSubmit={handleSubmit} className="bg-black p-8 rounded-xl shadow-md w-80 space-y-4">
//         <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           className="w-full p-2 border rounded"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           required
//           className="w-full p-2 border rounded"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
//           Login
//         </button>
//         <div className="text-center mt-4">
//           <GoogleLogin  />
//         </div>
//         <p className="text-center text-sm">
//           Don't have an account?
//           <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/signup")}>
//             Signup
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      navigate("/app");
    } catch (error) {
      alert(error.response?.data?.msg || "Login error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: credentialResponse.credential,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      navigate("/app");
    } catch (error) {
      console.error("Google login error:", error);
      alert(error.response?.data?.message || "Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Sign-In Failed");
    alert("Google Sign-In Failed");
  };

  return (
      <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              required
              className={`form-input ${loading ? 'disabled' : ''}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              required
              className={`form-input ${loading ? 'disabled' : ''}`}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className={`login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="btn-content">
                <span className="spinner"></span>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
          
          <div className="divider">
            <span className="divider-text">Or continue with</span>
          </div>
          
          <div className="google-login-section">
            {loading ? (
              <div className="google-loading">
                <span className="spinner"></span>
                <span>Authenticating...</span>
              </div>
            ) : (
              <div className="google-login-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>
            )}
          </div>
          
          <p className="signup-link">
            Don't have an account?{" "}
            <span 
              className="link-text"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}