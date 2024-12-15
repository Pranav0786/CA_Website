import React, { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png"; 
import "./Login.css";

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
    <div className="login-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-field">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <i className="fas fa-user-tag"></i>
            <select name="role" onChange={handleChange}>
              <option value="CA">CA</option>
              <option value="Businessman">Businessman</option>
            </select>
          </div>
          <button type="submit">Login</button>
        <button type="button" onClick={handleRegisterClick} className="register-button">
          Register
        </button>
        </form>
        
      </div>
      <div className="image-container">
        <img
          src={loginImage} 
          alt="Login"
          className="ca-image"
        />
      </div>
    </div>
  );
};

export default Login;
