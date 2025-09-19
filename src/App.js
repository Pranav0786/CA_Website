import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Register from "./pages/AuthPages/Register";
import Login from "./pages/AuthPages/Login";
import CA from './components/CA/CA';
import Businessman from "./components/Businessman/Businessman";
//import Loader from "./pages/Loader";
import AccountingPage from "./components/CA/AllWorkPages/AccountingPage";
import TaxationPage from "./components/CA/AllWorkPages/TaxationPage";
import AuditPage from "./components/CA/AllWorkPages/AuditPage";
import Layout from "./components/CA/AllWorkPages/Layout";
import ProtectedRoute from "./pages/ProtectedRotes/ProtectedRoute";
import Home from './Home/HomePage';
import BusinessDashboard from "./components/Businessman/DashBoard/DashBoard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Common Routes */}
        {<Route path="/" element={<Home />} />}

        {/* Open Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected CA Routes */}
        <Route path="/ca" element={<ProtectedRoute allowedRole="CA"><CA /></ProtectedRoute>} />
        <Route path="/layout" element={<ProtectedRoute allowedRole="CA"><Layout /></ProtectedRoute>} />
        <Route path="/accounting" element={<ProtectedRoute allowedRole="CA"><AccountingPage /></ProtectedRoute>} />
        <Route path="/taxation" element={<ProtectedRoute allowedRole="CA"><TaxationPage /></ProtectedRoute>} />
        <Route path="/audits" element={<ProtectedRoute allowedRole="CA"><AuditPage /></ProtectedRoute>} />

        {/* Protected Businessman Routes */}
        <Route path="/businessman" element={<ProtectedRoute allowedRole="Businessman"><Businessman /></ProtectedRoute>} />
        <Route path="/businessDash" element={<ProtectedRoute allowedRole="Businessman"><BusinessDashboard /></ProtectedRoute>} />
        
      </Routes>

    </BrowserRouter>
  );
};

export default App;
