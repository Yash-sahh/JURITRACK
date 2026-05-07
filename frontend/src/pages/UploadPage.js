import React, { useState, useRef } from "react";
import axios from "axios";
import VerifyPage from "./VerifyPage";
import Dashboard from "./Dashboard";
import Navbar from "../components/Navbar";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [approvedCases, setApprovedCases] = useState([]);
  const [extractedText, setExtractedText] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0] || null;
    setFile(selected);
    setUploadError("");
    setResult(null);
    setExtractedText("");
    setUploadStatus(selected ? `Selected file: ${selected.name}` : "");
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const scrollToDashboard = () => {
    document.getElementById("action-dashboard")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || "https://nyayasarthi-production-21cb.up.railway.app";
      const res = await axios.post(`${API_BASE_URL}/upload`, formData);
      setResult(res.data.structured_data);
      setExtractedText(res.data.extracted_text);

      const backendError = res.data.structured_data?.error;
      if (backendError) {
        setUploadError(`Backend error: ${backendError}`);
        setUploadStatus("");
      } else {
        setUploadStatus("Upload successful. The verification queue is now ready for review.");
        setUploadError("");
      }
    } catch (error) {
      console.error(error);
      setUploadError("Error processing file. Please try again.");
      setUploadStatus("");
    }
  };

  const handleApprove = (data) => {
    const actions = Array.isArray(data.actions)
      ? data.actions
      : data.action
      ? [data]
      : [];

    const normalized = actions.map((action) => ({
      case: data.case || "Untitled Case",
      action: action.action || "No action specified",
      department: action.department || "Unknown department",
      deadline: action.deadline || "TBD",
      risk: action.risk || "Low",
    }));

    setApprovedCases([...approvedCases, ...normalized]);
    setResult(null);
    setExtractedText("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-margin py-xl space-y-xl">
        <section id="case-processor" className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center py-8">
          <div className="lg:col-span-7 space-y-lg">
            <div className="inline-flex items-center gap-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-semibold text-xs border border-secondary/20">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Juris Precision Standard v2.4
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Transforming Court Judgments into <span className="text-secondary">Verified Government Action.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Bridge the critical gap between judicial orders and executive execution. NyayaSarthi uses explainable AI to parse complex legal documents, identifying mandatory actions for accountable departments.
              </p>
            </div>
            <div className="flex flex-wrap gap-md pt-4">
              <button
                type="button"
                onClick={openFilePicker}
                className="bg-secondary text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:shadow-secondary/30 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add_to_photos</span>
                Process New Judgment
              </button>
              <button
                type="button"
                onClick={scrollToDashboard}
                className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">analytics</span>
                View Audit Trail
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                alt="Legal technology background"
                className="w-full h-[400px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT-ez8fLBrVGIT5n49RkzeEQeLnyQw4UsHxAeNIkq_ZkDWY_-zuzON4SA5fr4EOnBbACHln1lCLcrzpJsPY1xNIG6EYx52WBIo_qZzCV4QwptJ_I7iLyiofw5ya2nIn9t7PjFsh3KzdwXDRV1KENyl-PQywfuEGDjq0ACM5-VhVmx_nQcvGFiw3DKyCHpL1gIr6Va6LY_ZE0-2YKCcEnxXADXPp47okrP79HpVhKGYGrjZGlpBCj90E9gDI9kN-fUlOZRJpbt28Z0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-lg left-lg right-lg">
                <div className="flex items-center gap-2 text-secondary-container mb-2">
                  <span className="w-8 h-[2px] bg-secondary"></span>
                  <span className="text-xs font-bold uppercase tracking-widest">Vision</span>
                </div>
                <p className="text-2xl font-bold text-white leading-snug">
                  Empowering governance with intelligent judicial compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="lg:col-span-4 p-lg border-r border-slate-100 flex flex-col gap-lg bg-slate-50/30">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">file_upload</span>
                Case Intake
              </h3>
              <p className="text-xs text-slate-500 font-medium">Ingest and digitize legal documents</p>
            </div>

            <div className="flex-grow flex flex-col gap-lg">
              <div
                onClick={openFilePicker}
                className="border-2 border-dashed border-slate-200 rounded-2xl p-xl flex flex-col items-center justify-center gap-3 bg-white hover:border-secondary/50 hover:bg-secondary/5 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-secondary">description</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-700">Drop PDF Judgment</p>
                  <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Max 25MB • Secure OCR</p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {uploadStatus && (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 p-3 text-sm">
                  {uploadStatus}
                </div>
              )}
              {uploadError && (
                <div className="rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 p-3 text-sm">
                  {uploadError}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Extracted Text</span>
                  <span className="bg-secondary/10 text-secondary text-[10px] font-black px-2 py-0.5 rounded tracking-tighter">OCR ACTIVE</span>
                </div>
                <div className="h-64 overflow-y-auto font-mono text-[13px] text-slate-600 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed shadow-inner">
                  {extractedText ? (
                    <p className="leading-relaxed whitespace-pre-wrap">{extractedText}</p>
                  ) : (
                    <p className="mb-4 text-slate-400">Upload a document to preview extracted text here.</p>
                  )}
                </div>
              </div>
            </div>

            <button
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
              onClick={handleUpload}
            >
              <span className="material-symbols-outlined text-sm">auto_fix</span>
              Run AI Analysis
            </button>
          </div>

          <div id="verification-queue" className="lg:col-span-8 p-lg flex flex-col gap-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">verified_user</span>
                  AI Verification Queue
                </h3>
                <p className="text-xs text-slate-500 font-medium">Review and approve extracted legal mandates</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors border border-slate-100">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors border border-slate-100">
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                </button>
              </div>
            </div>

            {result ? (
              <VerifyPage data={result} onApprove={handleApprove} />
            ) : (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-secondary transition-all shadow-sm hover:shadow-md">
                <p className="text-slate-500">No judgment queued for verification. Upload and process a PDF to populate the queue.</p>
              </div>
            )}

            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-400 font-black">Approved actions</p>
                  <h4 className="text-2xl font-bold text-slate-900">{approvedCases.length}</h4>
                </div>
                <span className="text-sm font-semibold text-secondary">{approvedCases.length > 0 ? `Latest approved action recorded` : `Awaiting approval`}</span>
              </div>
              <div className="space-y-4">
                {approvedCases.length ? (
                  approvedCases.slice(-3).map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-100 p-4 bg-slate-50">
                      <p className="font-semibold text-slate-900">{item.case}</p>
                      <p className="text-sm text-slate-600 mt-1">{item.action}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">Approved actions will appear here after verification.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div id="archive-section" className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <Dashboard approvedList={approvedCases} />
        </div>

        <section className="mt-xl pb-xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Intelligent Legal Infrastructure</h2>
            <p className="text-slate-500 mt-3 font-medium">Purpose-built features for government accountability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover-card space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[32px]">neurology</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Explainable AI</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Direct linkage to specific judgment paragraphs for total transparency and institutional trust.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover-card space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[32px]">person_check</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Human Verification</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Professional workflow ensures human arbiters remain the final authority on directives.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover-card space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[32px]">gavel</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Appeal Assistant</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Automatic identification of grounds for appeal based on historical precedents and statutes.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover-card space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[32px]">timer</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Deadline Tracking</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Sophisticated countdowns and escalation protocols for court-mandated windows.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover-card space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[32px]">account_tree</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Department Mapping</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Semantic routing connects directives to the relevant executive agency or department head.</p>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover-card space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[32px]">shield_lock</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Audit Trail</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Cryptographic logs recording AI suggestions and human edits for full compliance auditing.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UploadPage;
