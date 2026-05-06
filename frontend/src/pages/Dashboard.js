import React from "react";

function Dashboard({ approvedList }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        NyayaSarthi Dashboard
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3 text-left">Case</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Dept</th>
              <th className="p-3 text-left">Deadline</th>
              <th className="p-3 text-left">Risk</th>
            </tr>
          </thead>

          <tbody>
            {approvedList.map((item, index) => (
              <tr key={index} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{item.case}</td>
                <td className="p-3">{item.action}</td>
                <td className="p-3">{item.department}</td>
                <td className="p-3">{item.deadline || "—"}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.risk === "High"
                        ? "bg-red-100 text-red-600"
                        : item.risk === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {item.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
