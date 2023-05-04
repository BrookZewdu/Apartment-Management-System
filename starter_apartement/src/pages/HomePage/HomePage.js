import {
  Clipboard,
  House,
  List,
  SignOut,
  User,
  Lightbulb,
  Wrench,
  Users,
} from "phosphor-react";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { activeTabState, loggedInUserState } from "../../recoil_state";
import Applications from "./TabPages/Application";
import Home from "./TabPages/Home";
import { Profile } from "./TabPages/Profile";
import { useNavigate } from "react-router-dom";
import TabItem from "./components/TabItem";
import Footer from "../LandingPage/components/Footer";
import Navbar from "../LandingPage/components/Navbar";
import MaintenanceRequest from "./TabPages/MaintenanceRequest";
import AddVisitors from "./TabPages/AddVisitors";

const HomePage = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const setSignedInUser = useSetRecoilState(loggedInUserState);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSignOut = () => {
    // remove authToken and loggedInUser from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUser");
    setSignedInUser(undefined)

    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed top-0 left-0 flex flex-col h-screen py-4 bg-white border-r border-gray-200 w-60">
        <div className="px-4">
          <h1 className="text-lg font-bold">Apartment Project</h1>
        </div>
        <nav className="flex-1 mt-8 space-y-2">
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
          <TabItem
            tabName="MaintenanceRequest"
            Icon={Wrench}
            onClick={handleTabClick}
            isActive={activeTab === "MaintenanceRequest"}
          />
          <TabItem
            tabName="AddVisitors"
            Icon={Users}
            onClick={handleTabClick}
            isActive={activeTab === "AddVisitors"}
          />
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
      <div className="ml-60 w-full overflow-auto">
        {activeTab === "Home" && <Home />}
        {activeTab === "Profile" && <Profile />}
        {activeTab === "Applications" && <Applications />}
        {activeTab === "MaintenanceRequest" && <MaintenanceRequest />}
        {activeTab === "AddVisitors" && <AddVisitors />}
      </div>
    </div>
  );
};

export default HomePage;
