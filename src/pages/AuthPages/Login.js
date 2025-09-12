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
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl p-8 shadow-2xl rounded-2xl border border-purple-500/60 animate-fadeIn">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-center text-white drop-shadow-md mb-8">
            Welcome Back
          </h2>

          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-purple-500/40 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
            />
          </div>

          <div className="relative">
            <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-purple-500/40 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
            />
          </div>

          <div className="relative">
            <i className="fas fa-user-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
            <select
              name="role"
              onChange={handleChange}
              className="w-full pl-12 py-3 border border-purple-500/40 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
            >
              <option value="CA" className="text-black">CA</option>
              <option value="Businessman" className="text-black">Businessman</option>
            </select>
          </div>

          <button
            type="submit"
            className="py-3 bg-purple-600/80 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleRegisterClick}
            className="py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
