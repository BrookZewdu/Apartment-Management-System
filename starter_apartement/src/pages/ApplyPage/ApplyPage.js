// import React, { useState } from "react";
// import { useRecoilValue } from "recoil";
// import { useNavigate } from "react-router-dom";
// import { loggedInUserState } from "../../recoil_state";

// const ApplyPage = () => {
//   // const [firstName, setFirstName] = useState("");
//   // const [lastName, setLastName] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [phone, setPhone] = useState("");
//   // const [message, setMessage] = useState("");
//   const user = useRecoilValue(loggedInUserState);
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Send form data to server
//   };

//   const handleCancel = () => {
//     navigate("/home");
//     console.log("Cancelled");
//   };
//   return (
//     <div class="min-h-screen bg-gray-100 flex items-center justify-center py-8 sm:py-4 lg:py-4 px-24 sm:px-12 lg:px-16">
//       <div class="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
//         <h2 class="text-3xl font-bold text-neutral">Apply to Rent</h2>
//         <p class="text-neutral">
//           Please fill out the form below to apply for this rental property.
//         </p>

//         <form class="space-y-4">
//           <div class="flex flex-col space-y-2">
//             <label for="firstName" class="text-lg font-bold">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               required
//               class="rounded-lg shadow-md p-2 border border-neutral"
//             />
//           </div>
//           <div class="flex flex-col space-y-2">
//             <label for="lastName" class="text-lg font-bold">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               required
//               class="rounded-lg shadow-md p-2 border border-neutral"
//             />
//           </div>
//           <div class="flex flex-col space-y-2">
//             <label for="email" class="text-lg font-bold">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               class="rounded-lg shadow-md p-2 border border-neutral"
//             />
//           </div>
//           <div class="flex flex-col space-y-2">
//             <label for="phone" class="text-lg font-bold">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               required
//               class="rounded-lg shadow-md p-2 border border-neutral"
//             />
//           </div>
//           <div class="flex flex-col space-y-2">
//             <label for="message" class="text-lg font-bold">
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               rows="6"
//               required
//               class="rounded-lg shadow-md p-2 border border-neutral"
//             ></textarea>
//           </div>
//           <div class="flex items-center justify-between">
//             <button
//               type="button"
//               onClick={handleCancel}
//               class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
//             >
//               Cancel
//             </button>
//             <div>
//               <p class="text-neutral">
//                 Logged in as <strong>John Doe</strong>
//               </p>
//               <button
//                 type="submit"
//                 class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
//               >
//                 Submit Application
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ApplyPage;
