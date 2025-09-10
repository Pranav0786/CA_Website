import React, { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";

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
        localStorage.setItem("role", role);  // 🔹 store role
        navigate(role === "CA" ? "/ca" : "/businessman");
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
    <div className="flex flex-col md:flex-row justify-between items-center h-screen p-5 bg-gradient-to-r from-gray-100 to-indigo-100">
      <div className="w-full md:w-2/5 bg-white p-8 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="mb-5 text-2xl font-bold text-center text-gray-700">Login</h2>
          <div className="relative mb-5">
            <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative mb-5">
            <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative mb-5">
            <i className="fas fa-user-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            <select
              name="role"
              onChange={handleChange}
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="CA">CA</option>
              <option value="Businessman">Businessman</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleRegisterClick}
            className="w-full py-3 mt-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
      <div className="w-full md:w-2/5 flex justify-center items-center mt-10 md:mt-0">
        <img
          src={loginImage}
          alt="Login"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Login;
