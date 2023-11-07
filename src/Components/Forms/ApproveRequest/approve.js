import React, { useState } from 'react'

function RequestApproval({ handleApproveRequest }) {
    const [approvalRemarks, setApprovalRemarks] = useState("");

    const handleSubmit = () => {
      handleApproveRequest(approvalRemarks);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Enter Approval Remarks"
          value={approvalRemarks}
          onChange={(e) => setApprovalRemarks(e.target.value)}
        />
        <button onClick={handleSubmit}>Approve Request</button>
      </div>
    );
  }

export default RequestApproval
