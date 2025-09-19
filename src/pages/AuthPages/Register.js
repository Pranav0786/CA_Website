import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "CA",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, name, mobile, role } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const collectionName = role === "CA" ? "charteredAccountant" : "businessman";
      await setDoc(doc(db, collectionName, user.uid), {
        name,
        email,
        mobile,
        role,
      });

      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-8 
      bg-gradient-to-r from-[#0f1f2f] via-[#091921] to-[#0f1f2f]">
      
      {/* Glassy Register Box */}
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl p-8 shadow-2xl 
        rounded-2xl border border-purple-500/60">
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-center text-white drop-shadow-md mb-8">
            Register
          </h2>

          <div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-purple-500/40 rounded-lg bg-white/10 
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            />
          </div>

          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-purple-500/40 rounded-lg bg-white/10 
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
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
              className="w-full pl-12 py-3 border border-purple-500/40 rounded-lg bg-white/10 
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            />
          </div>

          <div className="relative">
            <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-purple-500/40 rounded-lg bg-white/10 
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            />
          </div>

          <div className="relative">
            <i className="fas fa-briefcase absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg"></i>
            <select
              name="role"
              onChange={handleChange}
              className="w-full pl-12 py-3 border border-purple-500/40 rounded-lg bg-white/10 
              text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            >
              <option value="CA" className="text-black">CA</option>
              <option value="Businessman" className="text-black">Businessman</option>
            </select>
          </div>

          <button
            type="submit"
            className="py-3 bg-purple-600/80 text-white font-semibold rounded-lg 
            hover:bg-purple-700 transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
