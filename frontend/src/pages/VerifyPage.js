import React from "react";

function VerifyPage({ data, onApprove }) {
  if (!data) return <div>No Data</div>;

  return (
    <div>
      <h2>Verify Extracted Data</h2>

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