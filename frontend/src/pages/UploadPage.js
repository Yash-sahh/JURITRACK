import React, { useState } from "react";
import axios from "axios";
import VerifyPage from "./VerifyPage";
import Dashboard from "./Dashboard";

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
  <div>

    {/* 🔷 NAVBAR */}
    <div className="navbar">
      <h2>NyayaSarthi</h2>
      <p>From Court Judgments to Accountable Action</p>
    </div>

    <div className="container">

      {/* 🔷 HERO */}
      <div className="hero">
        <h1>Transforming Court Judgments into Verified Government Actions</h1>
        <p>
          AI-powered system that extracts, analyzes, and converts legal judgments
          into actionable, trackable decisions.
        </p>
      </div>

      {/* 🔷 UPLOAD */}
      <div className="upload-box">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Process</button>
      </div>
      {extractedText && (
  <div className="verify-box">
    <h3>📄 Extracted Text (for Verification)</h3>
    <div style={{
      maxHeight: "200px",
      overflowY: "scroll",
      background: "#fff",
      padding: "10px",
      borderRadius: "8px",
      fontSize: "12px",
      border: "1px solid #ddd"
    }}>
      {extractedText}
    </div>
  </div>
)}

      {/* 🔷 FEATURES */}
      <div className="features">
        <h2>Key Feature Highlights</h2>

        <div className="feature-grid">
          <div className="feature-card">🧠 Explainable AI</div>
          <div className="feature-card">👤 Human Verification</div>
          <div className="feature-card">⚖️ Appeal Assistant</div>
          <div className="feature-card">⏰ Deadline Tracking</div>
          <div className="feature-card">🏢 Department Mapping</div>
          <div className="feature-card">📊 Audit Trail</div>
        </div>
      </div>

      {/* 🔷 VERIFY */}
      {result && (
        <div>
          <h2>Verify Extracted Data</h2>
          <VerifyPage data={result} onApprove={handleApprove} />
        </div>
      )}

      {/* 🔷 DASHBOARD */}
      <div className="dashboard">
        <Dashboard approvedList={approvedCases} />
      </div>

    </div>
  </div>
);
}

export default UploadPage;