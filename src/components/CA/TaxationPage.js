import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "./Navbar";
const TaxationPage = () => {
  const [taxDetails, setTaxDetails] = useState({
    income: "",
    deductions: "",
    exemptions: "",
  });

  const [taxResult, setTaxResult] = useState(null);
  const [fileUpload, setFileUpload] = useState({
    file: null,
    description: "",
  });

  const [filingStatus, setFilingStatus] = useState("Draft");
  const [regulatoryUpdates, setRegulatoryUpdates] = useState({
    updateText: "",
    resourceLink: "",
  });

  const [activeTab, setActiveTab] = useState("tax-calculation");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileUpload((prevData) => ({ ...prevData, file }));
  };

  const handleSubmitTaxCalculation = async () => {
    const income = parseFloat(taxDetails.income) || 0;
    const deductions = parseFloat(taxDetails.deductions) || 0;
    const exemptions = parseFloat(taxDetails.exemptions) || 0;

    const taxableIncome = income - deductions - exemptions;
    const taxAmount = taxableIncome > 100000 ? taxableIncome * 0.1 : 0; 
    setTaxResult(taxAmount);

    alert(`Calculated Tax: ₹${taxAmount}`);

    try {
      await addDoc(collection(db, "tax-details"), {
        income,
        deductions,
        exemptions,
        calculatedTax: taxAmount,
        timestamp: new Date(),
      });
      alert("Tax details saved to Firestore.");
    } catch (error) {
      console.error("Error saving tax details:", error);
      alert("Error saving tax details.");
    }
  };

  const handleSubmitFileUpload = async () => {
    if (!fileUpload.file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const fileRef = ref(storage, `tax-documents/${fileUpload.file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, fileUpload.file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload Error:", error);
          alert("Error during file upload.");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref());
          console.log("File available at:", downloadURL);

          await addDoc(collection(db, "tax-documents"), {
            ...fileUpload,
            fileURL: downloadURL,
            timestamp: new Date(),
          });
          alert("File uploaded and data saved successfully!");
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const handleFilingStatusChange = (e) => {
    setFilingStatus(e.target.value);
  };

  const handleRegulatoryUpdatesChange = (e) => {
    const { name, value } = e.target;
    setRegulatoryUpdates((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitRegulatoryUpdate = async () => {
    try {
      await addDoc(collection(db, "regulatory-updates"), {
        updateText: regulatoryUpdates.updateText,
        resourceLink: regulatoryUpdates.resourceLink,
        timestamp: new Date(),
      });
      alert("Regulatory update saved to Firestore.");
    } catch (error) {
      console.error("Error saving regulatory update:", error);
      alert("Error saving regulatory update.");
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  };
  
  const headerStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "16px",
  };
  
  const tabButtonStyle = (isActive) => ({
    padding: "10px 20px",
    margin: "0 10px",
    backgroundColor: isActive ? "#ff7f50" : "#ccc",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  });
  
  const tabContentStyle = {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "800px",
  };
  
  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    margin: "8px 0",
    width: "100%",
    maxWidth: "300px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };
  
  const labelStyle = {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
    display: "block",
  };
  
  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#ff7f50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  
  

  return (
    <div style={containerStyle}>
      <Navbar/>
      <h1 style={headerStyle}>Taxation Dashboard</h1>

      {/* Tabs Navigation */}
      <div style={{ marginBottom: "32px" }}>
        <button
          style={tabButtonStyle(activeTab === "tax-calculation")}
          onClick={() => handleTabChange("tax-calculation")}
        >
          Tax Calculation Tools
        </button>
        <button
          style={tabButtonStyle(activeTab === "file-upload")}
          onClick={() => handleTabChange("file-upload")}
        >
          Tax Filing Support
        </button>
        <button
          style={tabButtonStyle(activeTab === "regulatory-updates")}
          onClick={() => handleTabChange("regulatory-updates")}
        >
          Regulatory Updates
        </button>
      </div>

      {/* Tax Calculation Tools Tab */}
      {activeTab === "tax-calculation" && (
        <section style={tabContentStyle}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Tax Calculation Tools</h2>
          <div>
            <label style={labelStyle}>Income:</label>
            <input
              type="number"
              value={taxDetails.income}
              onChange={(e) => setTaxDetails({ ...taxDetails, income: e.target.value })}
              style={inputStyle}
            />
            <label style={labelStyle}>Deductions:</label>
            <input
              type="number"
              value={taxDetails.deductions}
              onChange={(e) => setTaxDetails({ ...taxDetails, deductions: e.target.value })}
              style={inputStyle}
            />
            <label style={labelStyle}>Exemptions:</label>
            <input
              type="number"
              value={taxDetails.exemptions}
              onChange={(e) => setTaxDetails({ ...taxDetails, exemptions: e.target.value })}
              style={inputStyle}
            />
            <button onClick={handleSubmitTaxCalculation} style={buttonStyle}>Calculate Tax</button>
          </div>

          {taxResult !== null && (
            <div style={{ marginTop: "20px" }}>
              <h3>Calculated Tax: ₹{taxResult}</h3>
              <h4>Tax Slab Breakdown:</h4>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Slab</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rate</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>Above ₹1,00,000</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>10%</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{taxResult}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Tax Filing Support Tab */}
      {activeTab === "file-upload" && (
        <section style={tabContentStyle}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Tax Filing Support</h2>
          <div>
            <label style={labelStyle}>Upload Tax Document:</label>
            <input type="file" onChange={handleFileUpload} style={inputStyle} />
            <label style={labelStyle}>Document Description:</label>
            <input
              type="text"
              placeholder="E.g., Form 16"
              onChange={(e) => setFileUpload({ ...fileUpload, description: e.target.value })}
              style={inputStyle}
            />
            <button onClick={handleSubmitFileUpload} style={buttonStyle}>Upload</button>
          </div>

          <div style={{ marginTop: "24px" }}>
            <label style={labelStyle}>Filing Status:</label>
            <select
              value={filingStatus}
              onChange={handleFilingStatusChange}
              style={inputStyle}
            >
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
            </select>
          </div>
        </section>
      )}

      {/* Regulatory Updates Tab */}
      {activeTab === "regulatory-updates" && (
        <section style={tabContentStyle}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Regulatory Updates</h2>
          <label style={labelStyle}>Latest Tax Laws:</label>
          <textarea
            name="updateText"
            value={regulatoryUpdates.updateText}
            onChange={handleRegulatoryUpdatesChange}
            rows="4"
            style={{ ...inputStyle, height: "120px" }}
          />
          <label style={labelStyle}>Resource Link:</label>
          <input
            type="url"
            name="resourceLink"
            value={regulatoryUpdates.resourceLink}
            onChange={handleRegulatoryUpdatesChange}
            style={inputStyle}
          />
          <button onClick={handleSubmitRegulatoryUpdate} style={buttonStyle}>Save Update</button>
        </section>
      )}
    </div>
  );
};

export default TaxationPage;
