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
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  activeTabState,
  activeSubTabState,
  loggedInUserState,
} from "../../recoil_state";

// import Applications from "./TabPages/Application.js";
import Applications from "./TabPages/applications_v2.js";
import AllApartmentss from "./TabPages/AllApartments";
import Tenants from "./TabPages/Tenants";
import RentedApartments from "./TabPages/RentedApartments";
import AddApartments from "./TabPages/AddApartement";
import Home from "./TabPages/Home";
import { Profile } from "./TabPages/Profile";
import { useNavigate } from "react-router-dom";
import TabItem from "./components/TabItem";
import Footer from "../LandingPage/components/Footer";
import Navbar from "../LandingPage/components/Navbar";
import MaintenanceRequest from "./TabPages/MaintenanceRequest";
import AddVisitors from "./TabPages/AddVisitors";
import Payments from "./TabPages/payment";


const HomePage = () => {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [activeSubTab, setActiveSubTab] = useState(activeSubTabState);

  const setSignedInUser = useSetRecoilState(loggedInUserState);
  const signedInUser = useRecoilValue(loggedInUserState);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setActiveSubTab("Application 1"); // set default sub-tab when main tab is clicked
  };
  const handleSubTabClick = (subTabName) => {
    setActiveSubTab((prevState) => ({
      ...prevState,
      [subTabName]: true,
    }));
  };


  const handleSignOut = () => {
    // remove authToken and loggedInUser from local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUser");
    setSignedInUser(undefined);

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

          {signedInUser && signedInUser.role !== "manager" && (
            <>
              <TabItem
                tabName="AllApartments"
                Icon={Clipboard}
                onClick={handleTabClick}
                isActive={activeTab === "AllApartments"}
              />
              <TabItem
                tabName="RentedApartments"
                Icon={Clipboard}
                onClick={handleTabClick}
                isActive={activeTab === "RentedApartments"}
              />
              <TabItem
                tabName="Tenants"
                Icon={Clipboard}
                onClick={handleTabClick}
                isActive={activeTab === "Tenants"}
              />
              <TabItem
                tabName="AddApartment"
                Icon={Clipboard}
                onClick={handleTabClick}
                isActive={activeTab === "AddApartment"}
              />
              {/* <TabItem
                tabName="Manager"
                Icon={List}
                onClick={handleTabClick}
                isActive={activeTab === "Manager"}
              >
                <TabItem
                  tabName="Application 1"
                  onClick={() => handleSubTabClick("Application 1")}
                  isActive={activeSubTab === "Application 1"}
                />
                <TabItem
                  tabName="Application 2"
                  onClick={() => handleSubTabClick("Application 2")}
                  isActive={activeSubTab === "Application 2"}
                />
                <TabItem
                  tabName="Application 3"
                  onClick={() => handleSubTabClick("Application 3")}
                  isActive={activeSubTab === "Application 3"}
                />
                <TabItem
                  tabName="AddApartments"
                  Icon={Clipboard}
                  onClick={() => {
                    handleTabClick("Manager");
                    handleSubTabClick("AddApartments");
                  }}
                  isActive={
                    activeTab === "Manager" && activeSubTab === "AddApartments"
                  }
                />
              </TabItem> */}
            </>
          )}

          <TabItem
            tabName="Payment"
            Icon={Wrench}
            onClick={handleTabClick}
            isActive={activeTab === "Payment"}
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
        {activeTab === "Payment" && <Payments />}
        {activeTab === "AllApartments" && <AllApartmentss />}
        {activeTab === "RentedApartments" && <RentedApartments />}
        {activeTab === "Tenants" && <Tenants />}
        {activeTab === "AddApartment" && <AddApartments />}
        {/* {activeTab === "Manager" && <Manager />} */}
        {/* {activeTab === "Manager" && activeSubTab === "Application 2" && (
          <Application1 />
        )} */}
        {/* {activeTab === "Manager" && (
          <>
            {activeSubTab["Application 1"] && <Application1 />}
            {activeSubTab["Application 2"] && <Application2 />}
            {activeSubTab["Application 3"] && <Application3 />}
            {activeSubTab["AddApartment"] && <Manager />}
          </>
        )} */}

        {activeTab === "MaintenanceRequest" && <MaintenanceRequest />}
        {activeTab === "AddVisitors" && <AddVisitors />}

      </div>
    </div>
  );
};

export default HomePage;
