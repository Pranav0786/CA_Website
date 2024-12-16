import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CA from './components/CA/CA';
import Businessman from "./components/Businessman/Businessman";
import Loader from "./pages/Loader";
import AccountingPage from "./components/CA/AccountingPage"; 
import TaxationPage from "./components/CA/TaxationPage";
import AuditPage from "./components/CA/AuditPage";
import HeroSection from "./components/HomePage/HeroSection";
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ca" element={<CA />} />
        <Route path="/businessman" element={<Businessman />} />
        <Route path="/accounting" element={<AccountingPage />} /> 
        <Route path="/taxation" element={<TaxationPage />} />
        <Route path="/audits" element={<AuditPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
