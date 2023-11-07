// RequestedPartForm.js
import React, { useState } from 'react';

function RequestedPartForm({ onSubmit, onClose }) {
  const [requestedPartForm, setRequestedPartForm] = useState({
    part: "",
    quantity: "",
    location: "",
    // ... other form fields
  });

  const [parts, setParts] = useState([]); // State for parts data
  const [locations, setLocations] = useState([]); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
        ticketId: 3, // Replace with the actual ticketId
        partId: requestedPartForm.part, // Use the selected part's ID
        partLocationId: requestedPartForm.location, // Use the selected location's ID
        partSerialNumber: "string", // Replace with the appropriate serial number
        quantityRequested: parseInt(requestedPartForm.quantity, 10), // Parse quantity to an integer
        partStatus: "string", // Replace with the appropriate status
        partCondition: "string", // Replace with the appropriate condition
        partPhoto: "string", // Replace with the path to the part's photo
        isApproved: true, // Replace with true or false based on your requirements
        createdBy: 0, // Replace with the actual user's ID
      };

    // Call the onSubmit function with the request data
    onSubmit(requestBody);

    // Close the form
    onClose();
  };

  return (
    <div className="requested-part-form">
      <h3>Add Requested Part</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="part">Part:</label>
          <input
            type="text"
            id="part"
            value={requestedPartForm.part}
            onChange={(e) => setRequestedPartForm({ ...requestedPartForm, part: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={requestedPartForm.quantity}
            onChange={(e) => setRequestedPartForm({ ...requestedPartForm, quantity: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={requestedPartForm.location}
            onChange={(e) => setRequestedPartForm({ ...requestedPartForm, location: e.target.value })}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}

export default RequestedPartForm;
