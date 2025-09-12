import React, { useState } from "react";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const TaxationPage = () => {
  const [taxDetails, setTaxDetails] = useState({
    income: "",
    deductions: "",
    exemptions: "",
  });

  const [taxResult, setTaxResult] = useState(null);
  const [fileUpload, setFileUpload] = useState({ file: null, description: "" });
  const [filingStatus, setFilingStatus] = useState("Draft");
  const [regulatoryUpdates, setRegulatoryUpdates] = useState({ updateText: "", resourceLink: "" });
  const [activeTab, setActiveTab] = useState("tax-calculation");

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileUpload((prev) => ({ ...prev, file }));
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
      await addDoc(collection(db, "tax-details"), { income, deductions, exemptions, calculatedTax: taxAmount, timestamp: new Date() });
      alert("Tax details saved to Firestore.");
    } catch (error) {
      console.error("Error saving tax details:", error);
      alert("Error saving tax details.");
    }
  };

  const handleSubmitFileUpload = async () => {
    if (!fileUpload.file) return alert("Please select a file to upload.");

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
          await addDoc(collection(db, "tax-documents"), { ...fileUpload, fileURL: downloadURL, timestamp: new Date() });
          alert("File uploaded and data saved successfully!");
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const handleFilingStatusChange = (e) => setFilingStatus(e.target.value);

  const handleRegulatoryUpdatesChange = (e) => {
    const { name, value } = e.target;
    setRegulatoryUpdates((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRegulatoryUpdate = async () => {
    try {
      await addDoc(collection(db, "regulatory-updates"), { updateText: regulatoryUpdates.updateText, resourceLink: regulatoryUpdates.resourceLink, timestamp: new Date() });
      alert("Regulatory update saved to Firestore.");
    } catch (error) {
      console.error("Error saving regulatory update:", error);
      alert("Error saving regulatory update.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 rounded-xl shadow-lg">

      {/* Tabs Navigation */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-lg ${activeTab === "tax-calculation" ? "bg-violet-950 text-white" : "bg-violet-300 text-gray-700"}`}
          onClick={() => handleTabChange("tax-calculation")}
        >
          Tax Calculation Tools
        </button>
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-lg ${activeTab === "file-upload" ? "bg-violet-950 text-white" : "bg-violet-300 text-gray-700"}`}
          onClick={() => handleTabChange("file-upload")}
        >
          Tax Filing Support
        </button>
        <button
          className={`px-6 py-3 text-xl font-semibold rounded-lg ${activeTab === "regulatory-updates" ? "bg-violet-950 text-white" : "bg-violet-300 text-gray-700"}`}
          onClick={() => handleTabChange("regulatory-updates")}
        >
          Regulatory Updates
        </button>
      </div>

      {/* Tax Calculation Tools Tab */}
      {activeTab === "tax-calculation" && (
        <section className="bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-md border border-white/10 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Tax Calculation Tools</h2>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-300">Income:</label>
            <input
              type="number"
              value={taxDetails.income}
              onChange={(e) => setTaxDetails({ ...taxDetails, income: e.target.value })}
              className="p-4 mb-4 border border-white/10 bg-transparent rounded-lg w-full"
            />
            <label className="block text-lg font-medium mb-2 text-gray-300">Deductions:</label>
            <input
              type="number"
              value={taxDetails.deductions}
              onChange={(e) => setTaxDetails({ ...taxDetails, deductions: e.target.value })}
              className="p-4 mb-4 border border-white/10 bg-transparent rounded-lg w-full"
            />
            <label className="block text-lg font-medium mb-2 text-gray-300">Exemptions:</label>
            <input
              type="number"
              value={taxDetails.exemptions}
              onChange={(e) => setTaxDetails({ ...taxDetails, exemptions: e.target.value })}
              className="p-4 mb-4 border border-white/10 bg-transparent rounded-lg w-full"
            />
            <button
              onClick={handleSubmitTaxCalculation}
              className="w-full bg-violet-950 text-white py-3 rounded-lg font-semibold hover:bg-violet-600"
            >
              Calculate Tax
            </button>
          </div>

          {taxResult !== null && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Calculated Tax: ₹{taxResult}</h3>
              <h4 className="mt-4">Tax Slab Breakdown:</h4>
              <table className="w-full table-auto mt-4 border-collapse border border-white/10 text-white">
                <thead>
                  <tr>
                    <th className="border border-white/10 p-2">Slab</th>
                    <th className="border border-white/10 p-2">Rate</th>
                    <th className="border border-white/10 p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 p-2">Above ₹1,00,000</td>
                    <td className="border border-white/10 p-2">10%</td>
                    <td className="border border-white/10 p-2">{taxResult}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Tax Filing Support Tab */}
      {activeTab === "file-upload" && (
        <section className="bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-md border border-white/10 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Tax Filing Support</h2>
          <div>
            {/* Beautiful File Upload */}
            <div
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/30 rounded-xl mb-4 hover:border-white/50 transition-all cursor-pointer"
              onClick={() => document.getElementById("taxFileInput").click()}
            >
              <p className="text-gray-300 mb-2 text-lg">Drag & Drop your file here or click to browse</p>
              {fileUpload.file && (
                <div className="mt-2 px-4 py-2 bg-violet-950 bg-opacity-40 rounded-lg flex items-center gap-2 w-full">
                  <span className="truncate text-white">{fileUpload.file.name}</span>
                </div>
              )}
              <input
                id="taxFileInput"
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <label className="block text-lg font-medium mb-2 text-gray-300">Document Description:</label>
            <input
              type="text"
              placeholder="E.g., Form 16"
              onChange={(e) => setFileUpload({ ...fileUpload, description: e.target.value })}
              className="p-4 mb-4 border border-white/10 bg-transparent rounded-lg w-full"
            />
            <button
              onClick={handleSubmitFileUpload}
              className="w-full bg-gradient-to-r from-violet-600 to-violet-900 text-white py-3 rounded-lg font-semibold hover:from-violet-500 hover:to-violet-800 transition-all"
            >
              Upload
            </button>
          </div>

          <div className="mt-6">
            <label className="block text-lg font-medium mb-2 text-gray-300">Filing Status:</label>
            <select
              value={filingStatus}
              onChange={handleFilingStatusChange}
              className="p-4 border border-white/10 bg-transparent rounded-lg w-full"
            >
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
            </select>
          </div>
        </section>
      )}

      {/* Regulatory Updates Tab */}
      {activeTab === "regulatory-updates" && (
        <section className="bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-md border border-white/10 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Regulatory Updates</h2>
          <label className="block text-lg font-medium mb-2 text-gray-300">Latest Tax Laws:</label>
          <textarea
            name="updateText"
            value={regulatoryUpdates.updateText}
            onChange={handleRegulatoryUpdatesChange}
            rows="4"
            className="p-4 mb-4 border border-white/10 bg-transparent rounded-lg w-full"
          />
          <label className="block text-lg font-medium mb-2 text-gray-300">Resource Link:</label>
          <input
            type="url"
            name="resourceLink"
            value={regulatoryUpdates.resourceLink}
            onChange={handleRegulatoryUpdatesChange}
            className="p-4 mb-4 border border-white/10 bg-transparent rounded-lg w-full"
          />
          <button
            onClick={handleSubmitRegulatoryUpdate}
            className="w-full bg-violet-950 text-white py-3 rounded-lg font-semibold hover:bg-violet-600"
          >
            Save Update
          </button>
        </section>
      )}
    </div>
  );
};

export default TaxationPage;

