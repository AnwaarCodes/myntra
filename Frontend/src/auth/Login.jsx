import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token)
      navigate("/app");
    } catch(error){
      alert(error.response?.data?.msg || "Login error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded-xl shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Login
        </button>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/signup")}>
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
