import React, { useState } from "react";
import { db, storage } from "../../../firebase";
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

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Accounting Dashboard</h1>

      <div className="flex justify-center gap-6 mb-8">
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-lg ${activeTab === "data-entry" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("data-entry")}
        >
          Data Entry
        </button>
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-lg ${activeTab === "financial-reports" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("financial-reports")}
        >
          Financial Reports
        </button>
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-lg ${activeTab === "client-management" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("client-management")}
        >
          Client Management
        </button>
      </div>

      {/* Data Entry Tab */}
      {activeTab === "data-entry" && (
        <section className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Data Entry & Upload</h2>
          <div>
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faFileUpload} className="mr-3" />
              Upload File:
            </label>
            <input type="file" onChange={handleFileUpload} className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4" />
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faFileInvoice} className="mr-3" />
              Type:
            </label>
            <select
              onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
            >
              <option value="Invoice">Invoice</option>
              <option value="Receipt">Receipt</option>
              <option value="Bill">Bill</option>
            </select>
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faCalendar} className="mr-3" />
              Date:
            </label>
            <input
              type="date"
              onChange={(e) => setUploadData({ ...uploadData, date: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
            />
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faDollarSign} className="mr-3" />
              Amount:
            </label>
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => setUploadData({ ...uploadData, amount: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
            />
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faStickyNote} className="mr-3" />
              Notes:
            </label>
            <textarea
              placeholder="Notes"
              onChange={(e) => setUploadData({ ...uploadData, notes: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-6 h-32"
            />
            <button
              onClick={handleSubmitUpload}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Upload
            </button>
          </div>
        </section>
      )}

      {/* Financial Reports Tab */}
      {activeTab === "financial-reports" && (
        <section className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Generate Reports</h2>
          <div>
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faFileInvoice} className="mr-3" />
              Report Type:
            </label>
            <select
              onChange={(e) => setReportData({ ...reportData, type: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
            >
              <option value="Balance Sheet">Balance Sheet</option>
              <option value="Profit & Loss">Profit & Loss</option>
            </select>
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faCalendar} className="mr-3" />
              Start Date:
            </label>
            <input
              type="date"
              onChange={(e) => setReportData({ ...reportData, startDate: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
            />
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faCalendar} className="mr-3" />
              End Date:
            </label>
            <input
              type="date"
              onChange={(e) => setReportData({ ...reportData, endDate: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-6"
            />
            <button
              onClick={handleReportGeneration}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Generate Report
            </button>
          </div>
        </section>
      )}

      {/* Client Management Tab */}
      {activeTab === "client-management" && (
        <section className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-6">Manage Clients</h2>
          <div>
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              Client Name:
            </label>
            <input
              type="text"
              placeholder="Client Name"
              onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
            />
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
              Email:
            </label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
            />
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-3" />
              Phone:
            </label>
            <input
              type="tel"
              placeholder="Phone"
              onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4"
            />
            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3" />
              Address:
            </label>
            <textarea
              placeholder="Address"
              onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-6 h-32"
            />
            <button
              onClick={handleClientSubmit}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Add Client
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default AccountingPage;
