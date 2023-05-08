import React, { useEffect, useState } from "react";
import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";
import TabItem from "../components/TabItem";
import { useRecoilState } from "recoil";
import ApplicationCard from "../components/ApplicationCard";
import axios from "axios";

const Applications = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  const [applications, setActiveApplication] = useState([]);

  useEffect(() => {
    axios.get("users/applications").then((response) => {
      setActiveApplication(response.data.data);
      console.log("res: ", response.data.data);
    });
  }, []);

  const filteredApplications = applications.filter(
    (app) => app.status.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-8">
        <h2 className="text-xl font-bold">My Applications </h2>
      </div>
      <nav className="flex mt-8 border-b border-gray-300">
        <SubNavItem
          tabName="Pending"
          Icon={Clock}
          count={""}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <SubNavItem
          tabName="Rejected"
          Icon={XCircle}
          count={""}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </nav>
      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 px-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={{ ...application, house: application.apartment }}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-4">
          <p>No applications found.</p>
        </div>
      )}
    </div>
  );
};

const SubNavItem = ({ tabName, Icon, count, activeTab, setActiveTab }) => {
  const isActive = activeTab === tabName;

  return (
    <button
      className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-none transition-colors duration-200 ${
        isActive
          ? "text-white bg-primary"
          : "text-gray-500 hover:text-white hover:bg-secondary"
      }`}
      onClick={() => setActiveTab(tabName)}
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

export default Applications;
