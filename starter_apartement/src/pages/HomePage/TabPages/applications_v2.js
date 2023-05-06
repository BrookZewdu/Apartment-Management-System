import React, { useEffect, useState } from "react";
import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";
import TabItem from "../components/TabItem";
import { useRecoilState } from "recoil";
import ApplicationCard from "../components/ApplicationCard";

const Applications = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const dummyApplications = [
    {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
      status: "Pending",
      date: "2022-04-23",
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Data Analyst",
      status: "Accepted",
      date: "2022-04-20",
      notes:
        "Nulla vel lacinia velit. Sed tempus libero mauris, vel faucibus mauris interdum eget.",
    },
    {
      id: 3,
      name: "Bob Johnson",
      position: "Product Manager",
      status: "Rejected",
      date: "2022-04-18",
      notes:
        "Suspendisse potenti. Aliquam vestibulum lacus magna, id laoreet lectus varius vel.",
    },
    {
      id: 4,
      name: "Alice Lee",
      position: "UX Designer",
      status: "Accepted",
      date: "2022-04-15",
      notes: "Mauris sed sapien eu odio laoreet mattis eget in dui.",
    },
  ];
  const [applications, setActiveApplication] = useState(dummyApplications);

  const filteredApplications = applications.filter(
    (app) => app.status === activeTab
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
        {/* <SubNavItem
          tabName="Accepted"
          Icon={CheckCircle}
          count={""}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        /> */}
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
            <ApplicationCard key={application.id} application={application} />
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