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

  return (
    <div className="flex flex-col items-center p-5">
      <Navbar />
      <h1 className="text-3xl font-bold mb-8">Taxation Dashboard</h1>

      {/* Tabs Navigation */}
      <div className="mb-8">
        <button
          className={`px-6 py-2 mx-2 text-white rounded-lg ${activeTab === "tax-calculation" ? "bg-orange-500" : "bg-gray-300"}`}
          onClick={() => handleTabChange("tax-calculation")}
        >
          Tax Calculation Tools
        </button>
        <button
          className={`px-6 py-2 mx-2 text-white rounded-lg ${activeTab === "file-upload" ? "bg-orange-500" : "bg-gray-300"}`}
          onClick={() => handleTabChange("file-upload")}
        >
          Tax Filing Support
        </button>
        <button
          className={`px-6 py-2 mx-2 text-white rounded-lg ${activeTab === "regulatory-updates" ? "bg-orange-500" : "bg-gray-300"}`}
          onClick={() => handleTabChange("regulatory-updates")}
        >
          Regulatory Updates
        </button>
      </div>

      {/* Tax Calculation Tools Tab */}
      {activeTab === "tax-calculation" && (
        <section className="bg-gray-100 p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Tax Calculation Tools</h2>
          <div>
            <label className="block text-lg font-semibold mb-2">Income:</label>
            <input
              type="number"
              value={taxDetails.income}
              onChange={(e) => setTaxDetails({ ...taxDetails, income: e.target.value })}
              className="p-3 mb-4 border border-gray-300 rounded-lg w-full"
            />
            <label className="block text-lg font-semibold mb-2">Deductions:</label>
            <input
              type="number"
              value={taxDetails.deductions}
              onChange={(e) => setTaxDetails({ ...taxDetails, deductions: e.target.value })}
              className="p-3 mb-4 border border-gray-300 rounded-lg w-full"
            />
            <label className="block text-lg font-semibold mb-2">Exemptions:</label>
            <input
              type="number"
              value={taxDetails.exemptions}
              onChange={(e) => setTaxDetails({ ...taxDetails, exemptions: e.target.value })}
              className="p-3 mb-4 border border-gray-300 rounded-lg w-full"
            />
            <button onClick={handleSubmitTaxCalculation} className="bg-orange-500 text-white px-6 py-2 rounded-lg">
              Calculate Tax
            </button>
          </div>

          {taxResult !== null && (
            <div className="mt-6">
              <h3>Calculated Tax: ₹{taxResult}</h3>
              <h4 className="mt-4">Tax Slab Breakdown:</h4>
              <table className="w-full table-auto mt-4 border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Slab</th>
                    <th className="border border-gray-300 p-2">Rate</th>
                    <th className="border border-gray-300 p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Above ₹1,00,000</td>
                    <td className="border border-gray-300 p-2">10%</td>
                    <td className="border border-gray-300 p-2">{taxResult}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Tax Filing Support Tab */}
      {activeTab === "file-upload" && (
        <section className="bg-gray-100 p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Tax Filing Support</h2>
          <div>
            <label className="block text-lg font-semibold mb-2">Upload Tax Document:</label>
            <input type="file" onChange={handleFileUpload} className="p-3 mb-4 border border-gray-300 rounded-lg w-full" />
            <label className="block text-lg font-semibold mb-2">Document Description:</label>
            <input
              type="text"
              placeholder="E.g., Form 16"
              onChange={(e) => setFileUpload({ ...fileUpload, description: e.target.value })}
              className="p-3 mb-4 border border-gray-300 rounded-lg w-full"
            />
            <button onClick={handleSubmitFileUpload} className="bg-orange-500 text-white px-6 py-2 rounded-lg">
              Upload
            </button>
          </div>

          <div className="mt-6">
            <label className="block text-lg font-semibold mb-2">Filing Status:</label>
            <select
              value={filingStatus}
              onChange={handleFilingStatusChange}
              className="p-3 border border-gray-300 rounded-lg w-full"
            >
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
            </select>
          </div>
        </section>
      )}

      {/* Regulatory Updates Tab */}
      {activeTab === "regulatory-updates" && (
        <section className="bg-gray-100 p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Regulatory Updates</h2>
          <label className="block text-lg font-semibold mb-2">Latest Tax Laws:</label>
          <textarea
            name="updateText"
            value={regulatoryUpdates.updateText}
            onChange={handleRegulatoryUpdatesChange}
            rows="4"
            className="p-3 mb-4 border border-gray-300 rounded-lg w-full"
          />
          <label className="block text-lg font-semibold mb-2">Resource Link:</label>
          <input
            type="url"
            name="resourceLink"
            value={regulatoryUpdates.resourceLink}
            onChange={handleRegulatoryUpdatesChange}
            className="p-3 mb-4 border border-gray-300 rounded-lg w-full"
          />
          <button onClick={handleSubmitRegulatoryUpdate} className="bg-orange-500 text-white px-6 py-2 rounded-lg">
            Save Update
          </button>
        </section>
      )}
    </div>
  );
};

export default TaxationPage;
