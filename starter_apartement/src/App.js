import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./pages/SignInPage/SignInPage";
import { SignUp } from "./pages/SignUpPage/SignUpPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import { RecoilRoot } from "recoil";
import ApplyPage from "./pages/ApplyPage/ApplyPage";
import ApplicationDetailPage from "./pages/HomePage/components/ApplicationDetailModal";

const isAuthenticated = () => {
  console.log("is logged in: ", localStorage.getItem("authToken") !== null);
  return localStorage.getItem("authToken") !== null;
  // return true;
};

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/home"
            element={
              isAuthenticated() ? <HomePage /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/apply/:id"
            element={
              isAuthenticated() ? <ApplyPage /> : <Navigate to="/sign-in" />
            }
          />

          <Route
            path="*"
            element={
              isAuthenticated() ? <HomePage /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
