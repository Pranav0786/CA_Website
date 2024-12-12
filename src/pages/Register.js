import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Register.css"; 
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
    <div className="register-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-field">
            <i className="icon fa fa-user"></i>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <i className="icon fa fa-envelope"></i>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <i className="icon fa fa-lock"></i>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <i className="icon fa fa-phone"></i>
            <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
          </div>
          <div className="form-field">
            <i className="icon fa fa-briefcase"></i>
            <select name="role" onChange={handleChange}>
              <option value="CA">CA</option>
              <option value="Businessman">Businessman</option>
            </select>
          </div>
          <button type="submit">Register</button>
          
        </form>
        
      </div>
      <div className="image-container">
        <img src={officeImage} alt="3D Office" className="office-image" />
      </div>
    </div>
  );
};

export default Register;
