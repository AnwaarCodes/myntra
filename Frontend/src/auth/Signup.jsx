import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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

 <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-8">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl dark:bg-gray-800 dark:border dark:border-gray-700 transition-all">
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
        Create an Account
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            placeholder="John Doe"
            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="you@example.com"
            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="••••••••"
            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-xl text-sm px-5 py-3 transition dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Create Account
        </button>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <span
            className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  </div>
</section>





)
}