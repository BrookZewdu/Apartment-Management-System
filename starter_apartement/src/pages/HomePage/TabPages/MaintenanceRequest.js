import React, { useState } from 'react';
import Navbar from "../../LandingPage/components/Navbar";
import Footer from "../../LandingPage/components/Footer";

const MaintenanceRequest = () => {
const [requestType, setRequestType] = useState('');
const [description, setDescription] = useState('');
const [roomNo, setRoomNo] = useState('');
const [floor, setFloor] = useState('');
const [error, setError] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  if (!requestType || !description || !roomNo || !floor) {
    setError('Please select a request type, provide a description, room number, and floor.');
    return;
}
setError('');
console.log(`Submitted maintenance request: ${requestType}, ${description}, ${roomNo}, ${floor}`);
};

return (
  <>
  <Navbar />
  <div className="bg-cover bg-center p-10">
    <h2 className="text-center mb-10 text-lg font-bold leading-10 text-neutral-900">Submit Maintenance Request</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="requestType" className="text-base font-semibold leading-7 text-neutral-900">Request Type:</label>
      <select id="requestType" value={requestType} onChange={(e) => setRequestType(e.target.value)}
      className="block w-full p-2 text-lg border rounded-md bg-white text-gray-700 mb-4">
        <option value="">Select Type</option>
        <option value="Plumbing">Plumbing</option>
        <option value="Electrical">Electrical</option>
        <option value="Appliance Repair">Appliance Repair</option>
        <option value="Other">Other</option>
      </select>
      <label htmlFor="description" className="text-base font-semibold leading-7 text-neutral-900">Description:
      </label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
className="block w-full p-2 text-lg border rounded-md bg-gray-200 text-gray-700 mb-4"
/>
      <label htmlFor="roomNo" className="text-base font-semibold leading-7 text-neutral-900">Room Number:</label>
      <input id="roomNo" type="text" value={roomNo} onChange={(e) => setRoomNo(e.target.value)}className="block w-full p-2 text-lg border rounded-md bg-gray-200 text-gray-700 mb-4"
/>
      <label htmlFor="floor" className="text-base font-semibold leading-7 text-neutral-900">Floor:</label>
<input id="floor" type="text" value={floor} onChange={(e) => setFloor(e.target.value)}
className="block w-full p-2 text-lg border rounded-md bg-gray-200 text-gray-700 mb-4"
/>
<button type="submit" className="block bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4">Submit Request</button>
{error && <div className="text-red-500">{error}</div>}
</form>
</div>
 <Footer />
  </>

);
};

export default MaintenanceRequest;