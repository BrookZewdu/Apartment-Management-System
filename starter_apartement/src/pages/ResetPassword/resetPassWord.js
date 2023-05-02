import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const {resetToken}= useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate()
 

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

const handleSubmit = (event) => {
  event.preventDefault();
  if (password !== confirmPassword) {
    window.alert("Passwords do not match");
    window.location.reload();
    return;
  }
  axios.put(`/users/resetpassword/${resetToken}`, { password })
    .then((response) => {
      
      window.alert("Password reset successful");
      navigate('/sign-in');
      
      
    })
    .catch((error) => {
      console.log(error);
      window.alert("An error occurred. Please try again later.");
    });
};



  return (
    <div className="max-w-md mx-auto p-8 border border-gray-300 rounded bg-white mt-5 mb-20">
      <h2 className="text-3xl font-bold text-neutral mb-8">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            New Password
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="password"
            name="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-400 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:bg-primary-dark" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
