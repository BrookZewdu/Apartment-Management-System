import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cardsState, loggedInUserState } from "../../../recoil_state";
import Navbar from "../../LandingPage/components/Navbar";
import Footer from "../../LandingPage/components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 space-y-4 min-h-screen">
        <h2 className="text-3xl font-bold text-neutral">Wellcome Home</h2>
      </div>
      <Footer />
    </>
  );
};

export default Home;
