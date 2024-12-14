import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faFileInvoice, faCalendar, faDollarSign, faStickyNote, faUsers, faEnvelope, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Navbar";
const AccountingPage = () => {
  const [activeTab, setActiveTab] = useState("data-entry");
  const [uploadData, setUploadData] = useState({
    type: "Invoice",
    date: "",
    amount: "",
    notes: "",
    file: null,
  });

  const [reportData, setReportData] = useState({
    type: "Balance Sheet",
    startDate: "",
    endDate: "",
    filters: "",
  });

  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadData((prevData) => ({ ...prevData, file }));
  };

  const handleSubmitUpload = async () => {
    if (!uploadData.file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const fileRef = ref(storage, `uploads/${uploadData.file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, uploadData.file);

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

          await addDoc(collection(db, "uploads"), {
            ...uploadData,
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

  const handleReportGeneration = async () => {
    try {
      const reportsQuery = query(
        collection(db, "transactions"),
        where("date", ">=", reportData.startDate),
        where("date", "<=", reportData.endDate)
      );
      const reportsSnapshot = await getDocs(reportsQuery);
      console.log("Report Data:", reportsSnapshot.docs.map((doc) => doc.data()));
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  const handleClientSubmit = async () => {
    try {
      await addDoc(collection(db, "clients"), clientData);
      alert("Client added successfully!");
    } catch (error) {
      console.error("Error adding client:", error);
      alert("Error adding client.");
    }
  };

  // Styling
  const containerStyle = {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "32px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    fontSize: "36px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "32px",
    color: "#333",
    fontFamily: "Roboto, sans-serif",
  };

  const tabButtonStyle = (isActive) => ({
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "600",
    borderRadius: "8px",
    backgroundColor: isActive ? "#ff7f50" : "#f1f1f1",
    color: isActive ? "#fff" : "#495057",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
    transform: isActive ? "scale(1.05)" : "scale(1)",
    boxShadow: isActive ? "0 4px 6px rgba(0, 0, 0, 0.2)" : "none",
  });

  const tabContentStyle = {
    marginBottom: "32px",
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: "500",
    color: "#495057",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
  };

  const inputStyle = {
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "2px solid #ced4da",
    marginBottom: "20px",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s ease",
  };

  const buttonStyle = {
    backgroundColor: "#ff7f50",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    marginTop: "24px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff7f50",
  };

  return (
    <div style={containerStyle}>
      <Navbar/>
      <h1 style={headerStyle}>Accounting Dashboard</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px", gap: "24px" }}>
        <button
          style={tabButtonStyle(activeTab === "data-entry")}
          onClick={() => setActiveTab("data-entry")}
        >
          Data Entry
        </button>
        <button
          style={tabButtonStyle(activeTab === "financial-reports")}
          onClick={() => setActiveTab("financial-reports")}
        >
          Financial Reports
        </button>
        <button
          style={tabButtonStyle(activeTab === "client-management")}
          onClick={() => setActiveTab("client-management")}
        >
          Client Management
        </button>
      </div>

      {/* Data Entry Tab */}
      {activeTab === "data-entry" && (
        <section style={tabContentStyle}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Data Entry & Upload</h2>
          <div>
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: "8px" }} />
              Upload File:
            </label>
            <input type="file" onChange={handleFileUpload} style={inputStyle} />
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faFileInvoice} style={{ marginRight: "8px" }} />
              Type:
            </label>
            <select
              onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
              style={inputStyle}
            >
              <option value="Invoice">Invoice</option>
              <option value="Receipt">Receipt</option>
              <option value="Bill">Bill</option>
            </select>
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "8px" }} />
              Date:
            </label>
            <input
              type="date"
              onChange={(e) => setUploadData({ ...uploadData, date: e.target.value })}
              style={inputStyle}
            />
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: "8px" }} />
              Amount:
            </label>
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => setUploadData({ ...uploadData, amount: e.target.value })}
              style={inputStyle}
            />
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faStickyNote} style={{ marginRight: "8px" }} />
              Notes:
            </label>
            <textarea
              placeholder="Notes"
              onChange={(e) => setUploadData({ ...uploadData, notes: e.target.value })}
              style={{ ...inputStyle, height: "100px" }}
            />
            <button onClick={handleSubmitUpload} style={buttonStyle}>
              Upload
            </button>
          </div>
        </section>
      )}

      {activeTab === "financial-reports" && (
        <section style={tabContentStyle}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Generate Reports</h2>
          <div>
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faFileInvoice} style={{ marginRight: "8px" }} />
              Report Type:
            </label>
            <select
              onChange={(e) => setReportData({ ...reportData, type: e.target.value })}
              style={inputStyle}
            >
              <option value="Balance Sheet">Balance Sheet</option>
              <option value="Profit & Loss">Profit & Loss</option>
            </select>
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "8px" }} />
              Start Date:
            </label>
            <input
              type="date"
              onChange={(e) => setReportData({ ...reportData, startDate: e.target.value })}
              style={inputStyle}
            />
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "8px" }} />
              End Date:
            </label>
            <input
              type="date"
              onChange={(e) => setReportData({ ...reportData, endDate: e.target.value })}
              style={inputStyle}
            />
            <button onClick={handleReportGeneration} style={buttonStyle}>
              Generate Report
            </button>
          </div>
        </section>
      )}

      {activeTab === "client-management" && (
        <section style={tabContentStyle}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px" }}>Manage Clients</h2>
          <div>
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: "8px" }} />
              Client Name:
            </label>
            <input
              type="text"
              placeholder="Client Name"
              onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
              style={inputStyle}
            />
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} />
              Email:
            </label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
              style={inputStyle}
            />
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faPhoneAlt} style={{ marginRight: "8px" }} />
              Phone:
            </label>
            <input
              type="tel"
              placeholder="Phone"
              onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
              style={inputStyle}
            />
            <label style={labelStyle}>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "8px" }} />
              Address:
            </label>
            <textarea
              placeholder="Address"
              onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
              style={{ ...inputStyle, height: "100px" }}
            />
            <button onClick={handleClientSubmit} style={buttonStyle}>
              Add Client
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default AccountingPage;

