import axios from 'axios';
import React, { useState } from 'react'

function CloseWorkOrder({ setShowCloseForm, itemId}) {

    const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentUser = localStorage.getItem("userInfo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the request body with the specified format
    const requestBody = {
      ticketId: parseInt(itemId, 10),
      requestDateTime: new Date().toISOString(),
      requestedBy: parseInt(JSON.parse(currentUser)?.id, 10), // You may need to set the correct user ID
      comment: comment,
    };

    try {
      setSubmitting(true);
      const response = await axios.post(
        "https://saharadeskrestapi.azurewebsites.net/api/TicketClosure/Request",
        requestBody
      );

      if (response.status === 200) {
        // Request successful
        console.log("Work Order closed successfully!");
        // Close the form
        setShowCloseForm(false);
      } else {
        console.error("Failed to close the Work Order.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

    
  return (
    <div className="close-work-order-form">
      <h3>Close Work Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CloseWorkOrder
