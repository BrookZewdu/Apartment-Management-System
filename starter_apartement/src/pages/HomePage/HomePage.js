import {
  Clipboard,
  House,
  List,
  SignOut,
  User,
  Lightbulb,
} from "phosphor-react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { activeTabState, loggedInUserState } from "../../recoil_state";
import Applications from "./TabPages/Application";
import AllApartments from "./TabPages/AllApartments";
import Home from "./TabPages/Home";
import { Profile } from "./TabPages/Profile";
import { useNavigate } from "react-router-dom";
import Payment from "./TabPages/Payment";
import MaintenanceRequest from "./TabPages/MaintenanceRequest";
import AddApartment from "./TabPages/AddApartement";
import RequestRegister from "./TabPages/RequestRegister";

const HomePage = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [signedInUser, setSignedInUser] = useRecoilState(loggedInUserState);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In";
    const u = { ...signedInUser, role: "user" };
    setSignedInUser(u);
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSignOut = () => {
    // remove authToken and loggedInUser from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const TabItem = ({ tabName, Icon }) => {
    const isActive = activeTab === tabName;

    return (
      <button
        className={`flex items-center justify-start w-full h-12 px-4 transition-colors duration-200 rounded-none focus:outline-none ${
          isActive
            ? "text-white bg-primary"
            : "text-gray-500 hover:text-white hover:bg-secondary"
        }`}
        onClick={() => handleTabClick(tabName)}
      >
        <Icon
          size={isActive ? 28 : 24}
          weight={isActive ? "bold" : "regular"}
        />
        <span className="ml-4 text-sm font-medium">{tabName}</span>
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed top-0 left-0 flex flex-col h-screen py-4 bg-white border-r border-gray-200 w-60">
        <div className="px-4">
          <h1 className="text-lg font-bold">
            Welcome{" "}
            {signedInUser.role.toUpperCase()[0] +
              signedInUser.role.toLowerCase().slice(1)}
          </h1>
        </div>
        <nav className="flex-1 mt-8 space-y-2">
          {signedInUser && signedInUser.role === "manager" && (
            <>
              <TabItem
                tabName="All Apartments"
                Icon={Clipboard}
                onClick={handleTabClick}
                isActive={activeTab === "All Apartments"}
              />
              <TabItem
                tabName="Add Apartment"
                Icon={Clipboard}
                onClick={handleTabClick}
                isActive={activeTab === "Add Apartment"}
              />
              <TabItem
                tabName="Register Requests"
                Icon={Clipboard}
                onClick={handleTabClick}
                isActive={activeTab === "Register Requests"}
              />
            </>
          )}
          {signedInUser && signedInUser.role === "tenant" && (
            <>
              <TabItem
                tabName="Maintenance"
                Icon={User}
                onClick={handleTabClick}
                isActive={activeTab === "Maintenance Request"}
              />
              <TabItem
                tabName="Payment"
                Icon={User}
                onClick={handleTabClick}
                isActive={activeTab === "Payment"}
              />
            </>
          )}
          {signedInUser && signedInUser.role === "user" && (
            <>
            <TabItem
              tabName="Home"
              Icon={House}
              onClick={handleTabClick}
              isActive={activeTab === "Home"}
            />
          <TabItem
            tabName="Applications"
            Icon={Clipboard}
            onClick={handleTabClick}
            isActive={activeTab === "Applications"}
          />
          </>
          )}

          <TabItem
            tabName="Profile"
            Icon={User}
            onClick={handleTabClick}
            isActive={activeTab === "Profile"}
          />
        </nav>
        <button
          onClick={handleSignOut}
          className="flex items-center justify-start w-full h-12 px-4 mt-4 text-red-500 rounded-none hover:text-white hover:bg-red-500 focus:outline-none"
        >
          <SignOut size={20} />
          <span className="ml-4 text-sm font-medium">Sign Out</span>
        </button>
      </div>
      <main className="fixed top-0 bottom-0 right-0 overflow-auto left-60">
        {activeTab === "Home" && <Home />}
        {activeTab === "Profile" && <Profile />}
        {activeTab === "All Apartments" && <AllApartments />}
        {activeTab === "Add Apartment" && <AddApartment />}
        {activeTab === "Maintenance" && <MaintenanceRequest />}
        {activeTab === "Applications" && <Applications />}
        {activeTab === "Payment" && <Payment />}
        {activeTab === "Register Requests" && <RequestRegister />}
      </main>
    </div>
  );
};

export default HomePage;
