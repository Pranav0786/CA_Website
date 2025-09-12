import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "CA" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, role } = formData;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const collectionName = role === "CA" ? "charteredAccountant" : "businessman";
      const userDoc = await getDoc(doc(db, collectionName, user.uid));

      if (userDoc.exists()) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", role);
        navigate(role === "CA" ? "/layout" : "/businessman");
      } else {
        alert("No user found with the selected role.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-r from-[#0f1f2f] via-[#091921] to-[#0f1f2f]">
      {/* Glass Card */}
      <div className="w-full max-w-md bg-black/30 backdrop-blur-2xl p-10 shadow-[0_0_40px_rgba(168,85,247,0.4)] rounded-2xl border border-purple-400/40 animate-fadeIn transform transition hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-6 tracking-wide">
            Welcome Back
          </h2>

          {/* Email */}
          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 text-lg"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-purple-400/40 rounded-lg bg-black/40 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 text-lg"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-purple-400/40 rounded-lg bg-black/40 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          {/* Role */}
          <div className="relative">
            <i className="fas fa-user-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 text-lg"></i>
            <select
              name="role"
              onChange={handleChange}
              className="w-full pl-12 py-3 border border-purple-400/40 rounded-lg bg-black/40 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            >
              <option value="CA" className="text-black">CA</option>
              <option value="Businessman" className="text-black">Businessman</option>
            </select>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]"
          >
            Login
          </button>

          {/* Register Button */}
          <button
            type="button"
            onClick={handleRegisterClick}
            className="py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition duration-300 shadow-md backdrop-blur-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
