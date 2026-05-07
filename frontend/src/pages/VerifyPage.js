import React from "react";

function VerifyPage({ data, onApprove }) {
  if (!data) return null;

  const actions = Array.isArray(data.actions)
    ? data.actions
    : data.action
    ? [data]
    : [];

  const primaryRisk = actions[0]?.risk || data.risk || "Low";
  const riskClass = primaryRisk === "High"
    ? "bg-amber-100 text-amber-700"
    : primaryRisk === "Medium"
    ? "bg-secondary/10 text-secondary"
    : "bg-emerald-100 text-emerald-700";

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-secondary transition-all group relative shadow-sm hover:shadow-md">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">Verification Item</span>
          <div className="space-y-2">
            <p className="font-black text-2xl text-slate-900">{data.case || "Untitled Case"}</p>
            {data.parties && <p className="text-sm text-slate-600">Parties: <span className="font-semibold text-slate-900">{data.parties}</span></p>}
            {data.date && <p className="text-sm text-slate-600">Judgment date: <span className="font-semibold text-slate-900">{data.date}</span></p>}
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${riskClass} font-semibold`}>Risk: {primaryRisk.toUpperCase()}</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-600 font-semibold">Actions: {actions.length}</span>
          </div>
        </div>

        <button
          className="w-full lg:w-auto bg-secondary text-white py-3 px-5 rounded-xl font-bold text-sm hover:bg-secondary-700 transition-all flex items-center justify-center gap-2 shadow-sm"
          onClick={() => onApprove(data)}
        >
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          Approve {actions.length > 1 ? "All Actions" : "Action"}
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {actions.length > 0 ? (
          actions.map((action, index) => (
            <div key={index} className="rounded-3xl border border-slate-100 p-5 bg-slate-50 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400 font-semibold">Action {index + 1}</p>
                  <p className="mt-3 text-lg font-bold text-slate-900 leading-tight">{action.action || "No action specified"}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] uppercase font-black tracking-[0.2em] text-slate-500">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 border border-slate-200">{action.department || "Unknown department"}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 border border-slate-200">{action.deadline || "Deadline TBD"}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-2 ${action.risk === "High" ? "bg-amber-100 text-amber-700" : action.risk === "Medium" ? "bg-secondary/10 text-secondary" : "bg-emerald-100 text-emerald-700"}`}>{(action.risk || "Low").toUpperCase()}</span>
                </div>
              </div>
              {action.notes && <p className="mt-4 text-sm text-slate-600">Notes: {action.notes}</p>}
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 p-6 bg-white text-slate-500">
            No actionable items were identified. Please verify the uploaded judgment or upload another document.
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyPage;
