import React, { useEffect } from "react";
import Navbar from './components/Navbar';
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Footer from './components/Footer';
import { Navigate, useNavigate } from "react-router-dom";


export default function LandingPage() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   document.title = "Sign In";
  //   const token = localStorage.getItem("authToken");
  //   if (token !== null) {
  //     navigate("/home");
  //   }
  // }, []);
  return (
    <div>
      <Navbar />
      <Hero />
      <Featured />
      <Footer />
    </div>
  );
}
