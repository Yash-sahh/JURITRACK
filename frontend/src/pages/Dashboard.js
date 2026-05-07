import React from "react";

function Dashboard({ approvedList }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-lg py-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">task_alt</span>
            Actioned Dashboard
          </h3>
          <p className="text-xs text-slate-500 font-medium">Monitoring departmental compliance and deadlines</p>
        </div>
        <div className="w-full sm:w-auto relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input
            className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
            placeholder="Search case names..."
            type="text"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="px-lg py-4">Case Entity</th>
              <th className="px-lg py-4">Directive</th>
              <th className="px-lg py-4">Assigned Dept</th>
              <th className="px-lg py-4">Compliance Date</th>
              <th className="px-lg py-4">Risk Profile</th>
              <th className="px-lg py-4 text-center">Execution Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {approvedList.length === 0 ? (
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-lg py-5 text-sm text-slate-500" colSpan="6">
                  No approved actions yet. Approve a judgment to populate the dashboard.
                </td>
              </tr>
            ) : (
              approvedList.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-lg py-5">
                    <p className="text-sm font-bold text-slate-900">{item.case}</p>
                  </td>
                  <td className="px-lg py-5 text-sm text-slate-600">{item.action}</td>
                  <td className="px-lg py-5">
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">{item.department}</span>
                  </td>
                  <td className="px-lg py-5 text-sm font-medium text-slate-500">{item.deadline || "TBD"}</td>
                  <td className="px-lg py-5">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                      item.risk === "High"
                        ? "bg-amber-100 text-amber-700"
                        : item.risk === "Medium"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {item.risk ? item.risk.toUpperCase() : "UNKNOWN"}
                    </span>
                  </td>
                  <td className="px-lg py-5 text-center">
                    <span className="text-[10px] font-black px-3 py-1 rounded-full bg-slate-100 text-slate-600">ONGOING</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
