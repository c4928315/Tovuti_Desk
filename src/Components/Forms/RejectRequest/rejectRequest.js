import React, { useState } from 'react'

function RejectionRequest({ handleRejectionRequest }) {
    const [rejectionRemark, setRejectionRemarks] = useState("");

    const handleSubmit = () => {
        handleRejectionRequest(rejectionRemark);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Enter Rejection Remarks"
          value={rejectionRemark}
          onChange={(e) => setRejectionRemarks(e.target.value)}
        />
        <button onClick={handleSubmit}>Approve Request</button>
      </div>
    );
  }

export default RejectionRequest
