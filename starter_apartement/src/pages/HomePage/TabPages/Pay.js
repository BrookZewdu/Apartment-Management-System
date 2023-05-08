import React, { useEffect, useState } from "react";
import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";
import TabItem from "../components/TabItem";
import { useNavigate } from "react-router-dom";

const PaymentCard = ({ payment }) => {
  const { id, status, date } = payment;
  const navigate = useNavigate();

  let statusColor = "";
  let statusIcon = null;

  switch (status) {
    case "Upcoming":
      statusColor = "text-yellow-500";
      statusIcon = <Clock size={24} />;
      break;
    case "Paid":
      statusColor = "text-green-500";
      statusIcon = <CheckCircle size={24} />;
      break;
    default:
      break;
  }

  // New state variable to track whether the modal is open or not
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToDetail = () => {
    openModal();
  };

  return (
    <div
      key={id}
      className="flex flex-col w-full max-w-md px-4 py-2 my-2 bg-white border border-gray-200 rounded-md shadow-md"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Info</h3>
        <span
          className={`flex items-center justify-center px-2 py-1 text-sm font-medium rounded-md ${statusColor}`}
        >
          {statusIcon}
          {status}
        </span>
      </div>
      <p className="mt-2 text-gray-500">{`Issued on ${date}`}</p>
    </div>
  );
};

export const Payment = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const [payments, setActiveApplication] = useState([
    { status: "Upcoming", date: new Date() },
    { status: "Paid", date: new Date() },
  ]);

  const filteredPayments = payments.filter((app) => app.status === activeTab);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-8">
        <h2 className="text-xl font-bold">My Payments </h2>
      </div>
      <nav className="flex mt-8 border-b border-gray-300">
        <SubNavItem
          tabName="Upcoming"
          Icon={Clock}
          count={""}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <SubNavItem
          tabName="Paid"
          Icon={CheckCircle}
          count={""}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </nav>
      {filteredPayments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 px-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPayments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-4">
          <p>No payments found.</p>
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
