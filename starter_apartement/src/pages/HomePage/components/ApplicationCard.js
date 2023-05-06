import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationDetailsModal from "./ApplicationDetailModal";

const ApplicationCard = ({ application }) => {
  const { id, name, status, date } = application;
  const navigate = useNavigate();

  let statusColor = "";
  let statusIcon = null;

  switch (status) {
    case "Pending":
      statusColor = "text-yellow-500";
      statusIcon = <Clock size={24} />;
      break;
    case "Accepted":
      statusColor = "text-green-500";
      statusIcon = <CheckCircle size={24} />;
      break;
    case "Rejected":
      statusColor = "text-red-500";
      statusIcon = <XCircle size={24} />;
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
        <h3 className="text-lg font-medium">{name}</h3>
        <span
          className={`flex items-center justify-center px-2 py-1 text-sm font-medium rounded-md ${statusColor}`}
        >
          {statusIcon}
          {status}
        </span>
      </div>
      <p className="mt-2 text-gray-500">{`Applied on ${date}`}</p>
      <div className="flex justify-end mt-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary"
        >
          View Details
        </button>
      </div>
      <ApplicationDetailsModal
        isOpen={isModalOpen}
        application={application}
        closeModal={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ApplicationCard;