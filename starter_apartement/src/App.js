import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./pages/SignInPage/SignInPage";
import { SignUp } from "./pages/SignUpPage/SignUpPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import Navbar from "./pages/LandingPage/components/Navbar"
import Footer from "./pages/LandingPage/components/Footer";
import HomePage from "./pages/HomePage/HomePage";
import { RecoilRoot } from "recoil";
import ForgetPasswordPage from "./pages/ForgotPassWord/forgotPassWord";
import ResetPasswordPage from "./pages/ResetPassword/resetPassWord";

function isAuthenticated() {
  console.log("is logged in: ", localStorage.getItem("authToken") !== null);
  // return localStorage.getItem("authToken") !== null;
  return true;
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          
          <Route path="/forget-password" element={<ForgetPasswordPage/>} />
          <Route path="/reset-password/:resetToken" element={<ResetPasswordPage/>} />
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/home"
            element={
              isAuthenticated() ? <HomePage /> : <Navigate to="/sign-in" />
            }
          />

          <Route
            path="*"
            element={
              isAuthenticated() ? <HomePage /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
