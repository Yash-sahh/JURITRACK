import React from "react";

function Dashboard({ cases }) {
  return (
    <div>
      <h2>NyayaSarthi Dashboard</h2>

      <table>
        <thead>
          <tr>
            <th>Case</th>
            <th>Action</th>
            <th>Dept</th>
            <th>Deadline</th>
            <th>Risk</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((item, index) => (
            <tr key={index}>
              <td>{item.case}</td>
              <td>{item.action}</td>
              <td>{item.department}</td>
              <td>{item.deadline}</td>
              <td className={item.risk.toLowerCase()}>
                {item.risk}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;