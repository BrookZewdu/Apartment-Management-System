import React, { useEffect, useState } from "react";
import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";
import TabItem from "../components/TabItem";
import { useRecoilState } from "recoil";
import Navbar from "../../LandingPage/components/Navbar";
import Footer from "../../LandingPage/components/Footer";

const Applications = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const SubNavItem = ({ tabName, Icon, count }) => {
    const isActive = activeTab === tabName;

    return (
      <button
        className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-none transition-colors duration-200 ${
          isActive
            ? "text-white bg-blue-600"
            : "text-gray-500 hover:text-white hover:bg-secondary"
        }`}
        onClick={() => handleTabClick(tabName)}
      >
        <Icon
          size={isActive ? 28 : 24}
          weight={isActive ? "bold" : "regular"}
          className="mr-2"
        />
        <span>{tabName}</span>
        {count > 0 && <span className="ml-2">{`(${count})`}</span>}
      </button>
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-full">
        <div className="px-4 pt-8">
          <h2 className="text-xl font-bold">My Applications </h2>
        </div>
        <nav className="flex mt-8 border-b border-gray-300">
          <SubNavItem tabName="Pending" Icon={Clock} count={""} />
          <SubNavItem tabName="Accepted" Icon={CheckCircle} count={""} />
          <SubNavItem tabName="Rejected" Icon={XCircle} count={""} />
        </nav>
        {isLoading ? (
          <div
            role="status"
            class="flex justify-center items-center space-x-2 mt-4"
          >
            <br></br>
            <svg
              aria-hidden="true"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="flex-1 px-4 py-8 overflow-auto">
            {activeTab === "Pending" && (
              <div class="grid grid-cols-1 gap-4">
                <div class="p-4 space-y-4">
                  <h2 class="text-3xl font-bold text-neutral">
                    Pending display
                  </h2>
                </div>
              </div>
            )}
            {activeTab === "Accepted" && (
              <div class="grid grid-cols-1 gap-4">
                <div class="grid grid-cols-1 gap-4">
                  <div class="p-4 space-y-4">
                    <h2 class="text-3xl font-bold text-neutral">
                      Accepted display
                    </h2>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "Rejected" && (
              <div class="grid grid-cols-1 gap-4">
                <div class="grid grid-cols-1 gap-4">
                  <div class="p-4 space-y-4">
                    <h2 class="text-3xl font-bold text-neutral">
                      Rejected display
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Applications;
