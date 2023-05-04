import React from "react";

const TabItem = ({ tabName, Icon, onClick, isActive }) => {
  return (
    <button
      className={`flex items-center justify-start w-full h-12 px-4 transition-colors duration-200 rounded-none focus:outline-none ${
        isActive
          ? "text-white bg-blue-600"
          : "text-gray-500 hover:text-white hover:bg-secondary"
      }`}
      onClick={() => onClick(tabName)}
    >
      <Icon size={isActive ? 28 : 24} weight={isActive ? "bold" : "regular"} />
      <span className="ml-4 text-sm font-medium">{tabName}</span>
    </button>
  );
};

export default TabItem;
