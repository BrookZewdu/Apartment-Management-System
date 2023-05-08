import React from "react";
import Navbar from './components/Navbar';
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Featured />
      <Footer />
    </div>
  );
}
