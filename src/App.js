import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CA from './pages/CA';
import Businessman from "./pages/Businessman";
import Loader from "./pages/Loader"; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/ca" element={<CA />} />
        <Route path="/businessman" element={<Businessman />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
