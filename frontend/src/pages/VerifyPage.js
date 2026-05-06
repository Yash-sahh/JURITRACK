import React from "react";

function VerifyPage({ data, onApprove }) {
  if (!data) return null;

  return (
    <div className="verify-box">
      <p><b>Case:</b> {data.case}</p>
      <p><b>Action:</b> {data.action}</p>
      <p><b>Department:</b> {data.department}</p>
      <p><b>Deadline:</b> {data.deadline}</p>
      <p><b>Risk:</b> {data.risk}</p>

      <button onClick={() => onApprove(data)}>Approve</button>
    </div>
  );
}

export default VerifyPage;
