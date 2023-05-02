import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cardsState, loggedInUserState } from "../../../recoil_state";

const Home = () => {
  return (
    <div class="p-4 space-y-4">
      <h2 class="text-3xl font-bold text-neutral">Wellcome Home</h2>
    </div>
  );
};

export default Home;
