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
      status: "Pending",
      date: "2022-04-23",
      house: {
        name: "Cozy Cottage",
        price: 120000,
        description: "A charming little cottage perfect for a small family.",
        images: [
          "https://example.com/cozy_cottage_exterior.jpg",
          "https://example.com/cozy_cottage_living_room.jpg",
          "https://example.com/cozy_cottage_bedroom.jpg",
        ],
      },
    },
    {
      id: 2,
      status: "Accepted",
      date: "2022-04-20",
      house: {
        name: "Spacious Apartment",
        price: 200000,
        description:
          "A luxurious apartment with plenty of room for entertaining.",
        images: [
          "https://example.com/spacious_apartment_exterior.jpg",
          "https://example.com/spacious_apartment_living_room.jpg",
          "https://example.com/spacious_apartment_kitchen.jpg",
        ],
      },
    },
    {
      id: 3,
      status: "Rejected",
      date: "2022-04-18",
      house: {
        name: "Modern Townhouse",
        price: 300000,
        description:
          "A sleek and modern townhouse with plenty of natural light.",
        images: [
          "https://example.com/modern_townhouse_exterior.jpg",
          "https://example.com/modern_townhouse_living_room.jpg",
          "https://example.com/modern_townhouse_bedroom.jpg",
        ],
      },
    },
    {
      id: 4,
      status: "Accepted",
      date: "2022-04-15",
      house: {
        name: "Beach House",
        price: 500000,
        description:
          "A beautiful beachfront property with stunning ocean views.",
        images: [
          "https://example.com/beach_house_exterior.jpg",
          "https://example.com/beach_house_living_room.jpg",
          "https://example.com/beach_house_bedroom.jpg",
        ],
      },
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
        <SubNavItem
          tabName="Accepted"
          Icon={CheckCircle}
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
