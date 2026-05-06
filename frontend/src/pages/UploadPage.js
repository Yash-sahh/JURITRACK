import React, { useState } from "react";
import axios from "axios";
import VerifyPage from "./VerifyPage";
import Dashboard from "./Dashboard";
import Navbar from "../components/Navbar";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [approvedCases, setApprovedCases] = useState([]);
  const [extractedText, setExtractedText] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData);
      setResult(res.data.structured_data);
      setExtractedText(res.data.extracted_text);
    } catch (error) {
      console.error(error);
      alert("Error processing file");
    }
  };

  const handleApprove = () => {
    setApprovedCases([...approvedCases, result]);
    setResult(null);
    setExtractedText("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* HERO */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">
            Transforming Court Judgments into Verified Government Actions
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            AI-powered system that extracts, analyzes, and converts legal judgments
            into actionable, trackable decisions.
          </p>
        </div>

        {/* UPLOAD */}
        <div className="bg-white p-6 rounded-2xl shadow border border-slate-200 flex flex-col items-center gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-sm"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Process
          </button>
        </div>

        {/* EXTRACTED TEXT */}
        {extractedText && (
          <div className="bg-white p-6 rounded-2xl shadow border border-slate-200">
            <h3 className="text-lg font-semibold mb-3">
              📄 Extracted Text (for Verification)
            </h3>
            <div className="max-h-56 overflow-y-auto bg-slate-50 p-4 rounded-lg text-xs border border-slate-200 whitespace-pre-wrap">
              {extractedText}
            </div>
          </div>
        )}

        {/* FEATURES */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Key Feature Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="feature-card">🧠 Explainable AI</div>
            <div className="feature-card">👤 Human Verification</div>
            <div className="feature-card">⚖️ Appeal Assistant</div>
            <div className="feature-card">⏰ Deadline Tracking</div>
            <div className="feature-card">🏢 Department Mapping</div>
            <div className="feature-card">📊 Audit Trail</div>
          </div>
        </div>

        {/* VERIFY */}
        {result && (
          <div className="bg-white p-6 rounded-2xl shadow border border-slate-200">
            <h2 className="text-xl font-bold mb-4">
              Verify Extracted Data
            </h2>
            <VerifyPage data={result} onApprove={handleApprove} />
          </div>
        )}

        {/* DASHBOARD */}
        <div className="bg-white p-6 rounded-2xl shadow border border-slate-200">
          <Dashboard approvedList={approvedCases} />
        </div>

      </div>
    </div>
  );
}

export default UploadPage;
