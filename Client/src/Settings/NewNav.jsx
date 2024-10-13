import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/outline";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState({
    registration: false,
    opd: false,
    inpatient: false,
  });

  const toggleMenu = (menu) => {
    setIsOpen({ ...isOpen, [menu]: !isOpen[menu] });
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-r from-gray-100 via-gray-400 to-gray-800 text-white sticky top-0 z-50 shadow-2xl">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4">
        <img
          src={`http://localhost:4211/Uploads/logo/pngegg(2).png`}
          alt="Your Company"
          className="h-10 w-auto"
        />
      </div>

      {/* Sidebar Navigation */}
      <nav className="px-4 py-6">
        {/* Registration Menu */}
        <div className="mb-4">
          <button
            onClick={() => toggleMenu("registration")}
            className="w-full flex justify-between items-center py-3 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            <span className="flex items-center">
              <i className="fas fa-users mr-2"></i> Registration
            </span>
            {isOpen.registration ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>

          {isOpen.registration && (
            <ul className="pl-6">
              <li className="py-2 hover:bg-gray-600 rounded-md">
                <a href="#">OP Registration</a>
              </li>
              <li className="py-2 hover:bg-gray-600 rounded-md">
                <a href="#">Bulk Registration</a>
              </li>
              <li className="py-2 hover:bg-gray-600 rounded-md">
                <a href="#">Pre Registration</a>
              </li>
            </ul>
          )}
        </div>

        {/* OPD Menu */}
        <div className="mb-4">
          <button
            onClick={() => toggleMenu("opd")}
            className="w-full flex justify-between items-center py-3 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            <span className="flex items-center">
              <i className="fas fa-hospital mr-2"></i> OPD
            </span>
            {isOpen.opd ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>

          {isOpen.opd && (
            <ul className="pl-6">
              <li className="py-2 hover:bg-gray-600 rounded-md">
                <a href="#">OPD List</a>
              </li>
              <li className="py-2 hover:bg-gray-600 rounded-md">
                <a href="#">Appointment List</a>
              </li>
            </ul>
          )}
        </div>

        {/* Inpatient Menu */}
        <div className="mb-4">
          <button
            onClick={() => toggleMenu("inpatient")}
            className="w-full flex justify-between items-center py-3 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            <span className="flex items-center">
              <i className="fas fa-bed mr-2"></i> Inpatient
            </span>
            {isOpen.inpatient ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>

          {isOpen.inpatient && (
            <ul className="pl-6">
              <li className="py-2 hover:bg-gray-600 rounded-md">
                <a href="#">Admission List</a>
              </li>
              <li className="py-2 hover:bg-gray-600 rounded-md">
                <a href="#">Ward Board</a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
