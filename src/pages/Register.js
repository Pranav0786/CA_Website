import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import officeImage from "../assets/register.png";

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
    <div className="flex flex-col md:flex-row justify-between items-center h-screen p-5 bg-gradient-to-r from-gray-100 to-indigo-100">
      <div className="w-full md:w-2/5 bg-white p-8 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Register</h2>
          <div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
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
          <div className="relative">
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
          <div className="relative">
            <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
              required
              className="w-full pl-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <i className="fas fa-briefcase absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"></i>
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
            className="py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
      <div className="w-full md:w-2/5 flex justify-center items-center mt-10 md:mt-0">
        <img
          src={officeImage}
          alt="Office"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Register;
