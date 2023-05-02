import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      axios.post("/users/forgotpassword", { email })
        .then((response) => {
          console.log(response);
          alert("Password reset instructions have been sent to your email.");
        })
        .catch((error) => {
          console.log(error);
          alert("Your email is not registered. Please sign up first.");
        });
    } else {
      alert("Please enter your email address.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-neutral mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-lg appearance-none focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Reset Password
          </button>
        </div>
      </form>
      <p className="text-gray-600 text-sm mt-4 text-center">
        Please enter your email address and we will send you instructions on how to reset your password.
      </p>
      <div className="text-center">
        <a href="/sign-in" className="font-semibold underline">
          Sign In
        </a>
      </div>
    </div>
  );
}

export default ForgotPassword;
