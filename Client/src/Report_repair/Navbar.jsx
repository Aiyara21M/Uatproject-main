import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getProfileimg, getUser, logout } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

export default function Navbar() {
  const navigate = useNavigate();
  const profileimg = getProfileimg();
  // const [alert, setAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    // Listen for alerts
    socket.on("Getalert", (data) => {
      // ใช้ axios เพื่อดึงข้อมูล
      // setAlert(data.count > 0 ? data.count : null);
      console.log(data);
    });
    return () => {
      socket.off("Getalert");
    };
  }, []);

  const [notifications, setNotifications] = useState([
    // Add more notifications as needed
  ]);

  // if (getUser()) {
  //   const UUID = getUser();
  //   const putAlert = () => {
  //     socket.emit("Putalert", { UUID });
  //   };
  //   putAlert();
  // }
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const menuRef = useRef(null);
  const RepairTicket = useRef(null);
  const Managedata = useRef(null);
  const Dashboard = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
    Managedata.current.removeAttribute("open");
    RepairTicket.current.removeAttribute("open");
    Dashboard.current.removeAttribute("open");
  };

  const closeMenuOnly = () => {
    setIsOpen(false);
  };

  const OpenDashboard = () => {
    Managedata.current.removeAttribute("open");
    RepairTicket.current.removeAttribute("open");
  };
  const OpenManagedata = () => {
    RepairTicket.current.removeAttribute("open");
    Dashboard.current.removeAttribute("open");
  };
  const OpenRepairTicket = () => {
    Dashboard.current.removeAttribute("open");
    Managedata.current.removeAttribute("open");
  };

  const closeAllMenus = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    if (
      notificationsRef.current &&
      !notificationsRef.current.contains(event.target)
    ) {
      setIsNotificationsOpen(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeAllMenus);
    return () => {
      document.removeEventListener("mousedown", closeAllMenus);
    };
  }, []);

  if (!getUser()) {
    return null;
  }

  return (
    <nav className="sticky top-0 bg-white  z-50  hover:shadow-l transition-all duration-100  border-0 border-b-2  border-b-gray-900 shadow-inner ">
      <div className="mx-auto max-w-7xl px-2 px-6 px-8">
        <div className="relative flex h-16 items-center justify-between font-athiti">
          {/* Mobile Menu Button */}
          {/* sm:hidden */}
          <div className="absolute inset-y-0 left-0 flex items-center ">
            <button
              onClick={() => {
                isOpen === false ? setIsOpen(true) : "";
              }}
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
            >
              <span className="sr-only">Open main menu</span>
              <img
                alt="Your Company"
                src={`http://localhost:4211/Uploads/logo/pngegg(2).png`}
                className="h-9 w-auto"
              />
              {/* <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" /> */}
            </button>
          </div>

          {/* Logo and Navigation Links */}
          <div className="flex  items-center justify-center">
            <div className="inline-flex items-center justify-center h-15 w-20 transition duration-300 px-4"></div>
          </div>

          {/* Notification and Profile Menu */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Notifications Button */}
            <div className="relative " ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative rounded-full bg-gray-900 p-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 transition duration-150 ease-in-out"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-7 w-7" />
                {alert > 0 && (
                  <div className="absolute top-0 right-0 -mt-1 -mr-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                    {alert}
                  </div>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute  w-[90vw] sm:w-[400px] right-[-80px] sm:right-0 top-full mt-2 w-96 bg-white rounded-md shadow-lg z-50 select-none">
                  <header className="flex justify-between items-center p-2 border-b">
                    <h1 className="text-lg font-semibold text-gray-800">
                      Notifications
                    </h1>
                    <div className="flex space-x-2">
                      <button
                        className="text-sm text-blue-600 hover:text-blue-500"
                        onClick={() => console.log("Mark all as read")}
                      >
                        All Notifications
                      </button>
                    </div>
                  </header>
                  <div className="p-2 max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <article 
                          key={notification.id}
                          className={`flex items-start p-2 cursor-pointer ${
                            notification.unread ? "bg-gray-100" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsNotificationsOpen(false);
                          }}
                        >
                          <div className="image-container mr-2">
                            <figure className="user-profile-pic avatar-text small profile-bg-2">
                              {notification.senderInitial}
                            </figure>
                            <img
                              src={notification.senderImage}
                              alt=""
                              className="hidden"
                            />
                          </div>
                          <div className="notification-inner">
                            <div className="notification-type text-sm font-medium text-gray-600">
                              <i
                                className="ficon-ticket fsize-12"
                                aria-hidden="true"
                              ></i>{" "}
                              {notification.type}
                            </div>
                            <div className="notification-content text-sm">
                              <span className="font-semibold">
                                {notification.sender}
                              </span>{" "}
                              {notification.content}
                            </div>
                            <div className="notification-time text-xs text-gray-500">
                              {notification.time}
                            </div>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 cursor-pointer">
                        No notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative ml-3" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative flex rounded-full bg-gray-900 text-sm p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 transition duration-150 ease-in-out"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src={profileimg}
                  className="h-8 w-8 rounded-full"
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md  bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none select-none">
                  <div className="p-2 text-gray-700 font-semibold cursor-default  m-1  text-gray-700 border-b ">
                    User Menu
                  </div>
                  <a
                    onClick={(e) => {
                      e.preventDefault;
                      setIsProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                  >
                    Your Profile
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault;
                      setIsProfileOpen(false);
                      navigate("#");
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                  >
                    Settings
                  </a>
                  <button
                    onClick={(e) => {
                      e.preventDefault;
                      setIsProfileOpen(false);
                      logout(() => navigate("/"));
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-y-0 left-0  w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform overflow-auto  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            key="Home"
            onClick={(e) => {
              e.preventDefault;
              navigate("/index");
              closeMenu();
            }}
            className="select-none text-gray-800 font-semibold hover:bg-gray-900 hover:text-white font-medium block rounded-md px-4 py-2 text-lg transition duration-150 ease-in-out tracking-wide cursor-pointer font-athiti"
          >
            Home
          </a>

          <details ref={Managedata} onClick={OpenManagedata}>
            <summary
              className="text-gray-800 font-semibold hover:bg-gray-900 hover:text-white font-medium block rounded-md px-4 py-2 text-lg transition duration-150 ease-in-out tracking-wide cursor-pointer font-athiti  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
              style={{
                listStyle: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            >
              <div className="select-none">Manage data</div>
            </summary>
            <div className="m-3 md:w-48 ">
              <div
                onClick={() => {
                  closeMenuOnly();
                  navigate(`#`);
                }}
                className="flex flex-row items-center  bg-white pl-5 rounded-lg shadow mb-1 relative h-10 cursor-pointer"
              >
                <div className="absolute top-1 right-2"></div>
                <img
                  src="/img/pngegg.png"
                  alt="My Image"
                  className="h-5 pr-2"
                />
                <h3 className="font-semibold select-none">Employee</h3>
              </div>

              <div
                onClick={() => {
                  closeMenuOnly();
                  navigate(`/departments`);
                }}
                className="flex flex-row items-center  bg-white pl-5 rounded-lg shadow mb-1 relative h-10 cursor-pointer"
              >
                <div className="absolute top-1 right-2"></div>
                <img
                  src="/img/department.png"
                  alt="My Image"
                  className="h-5 pr-2"
                />
                <h3 className="font-semibold select-none">Department</h3>
              </div>

              <div
                onClick={() => {
                  closeMenuOnly();
                  navigate(`#`);
                }}
                className="flex flex-row items-center  bg-white pl-5 rounded-lg shadow mb-1 relative h-10 cursor-pointer"
              >
                <div className="absolute top-1 right-2"></div>
                <img
                  src="/img/pngegg(1).png"
                  alt="My Image"
                  className="h-5 pr-2"
                />
                <h3 className="font-semibold select-none">Sex</h3>
              </div>

              <div
                onClick={() => {
                  closeMenuOnly();
                  navigate(`#`);
                }}
                className="flex flex-row items-center  bg-white pl-5 rounded-lg shadow mb-1 relative h-10 cursor-pointer"
              >
                <div className="absolute top-1 right-2"></div>
                <img
                  src="/img/pngegg(5).png"
                  alt="My Image"
                  className="h-5 pr-2"
                />
                <h3 className="font-semibold select-none">Address</h3>
              </div>
            </div>
          </details>

          <details ref={RepairTicket} onClick={OpenRepairTicket}>
            <summary
              className="text-gray-800 font-semibold hover:bg-gray-900 hover:text-white font-medium block rounded-md px-4 py-2 text-lg transition duration-150 ease-in-out tracking-wide cursor-pointer font-athiti  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
              style={{
                listStyle: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            >
              <div className="select-none">Repair Ticket</div>
            </summary>

            <div className="m-3 md:w-48 ">
              <div
                onClick={() => {
                  closeMenuOnly();
                  navigate(`/createticket`);
                }}
                className="flex flex-row items-center  bg-white pl-5 rounded-lg shadow mb-1 relative h-10 cursor-pointer"
              >
                <div className="absolute top-1 right-2"></div>
                <img
                  src="/img/pngegg(10).png"
                  alt="My Image"
                  className="h-5 pr-2"
                />
                <h3 className="font-semibold select-none">Create Ticket</h3>
              </div>

              <div
                onClick={() => {
                  closeMenuOnly();
                  navigate(`#`);
                }}
                className="flex flex-row items-center  bg-white pl-5 rounded-lg shadow mb-1 relative h-10 cursor-pointer"
              >
                <div className="absolute top-1 right-2"></div>
                <img
                  src="/img/travel-agent.png"
                  alt="My Image"
                  className="h-5 pr-2"
                />
                <h3 className="font-semibold select-none">Your Tickets</h3>
              </div>

              <div
                onClick={() => {
                  closeMenuOnly();
                  navigate(`/Technician`);
                }}
                className="flex flex-row items-center  bg-white pl-5 rounded-lg shadow mb-1 relative h-10 cursor-pointer"
              >
                <div className="absolute top-1 right-2"></div>
                <img
                  src="/img/work-list.png"
                  alt="My Image"
                  className="h-5 pr-2"
                />
                <h3 className="font-semibold select-none">Work List</h3>
              </div>
            </div>
          </details>

          <details ref={Dashboard} onClick={OpenDashboard}>
            <summary
              className="text-gray-800 font-semibold hover:bg-gray-900 hover:text-white font-medium block rounded-md px-4 py-2 text-lg transition duration-150 ease-in-out tracking-wide cursor-pointer font-athiti  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
              style={{
                listStyle: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
              }}
            >
              <div className="select-none">Dashboard</div>
            </summary>

            <div className="m-3 md:w-48 ">

              <div
                onClick={() => {
                  closeMenuOnly();
                  navigate(`#`);
                }}
                className="flex flex-row items-center  bg-white pl-5 rounded-lg shadow mb-1 relative h-10 cursor-pointer"
              >
                <div className="absolute top-1 right-2"></div>
                <img
                  src="/img/pngegg(7).png"
                  alt="My Image"
                  className="h-5 pr-2"
                />
                <h3 className="font-semibold select-none">Dashboard</h3>
              </div>



            </div>
          </details>






        </div>
      </div>
    </nav>
  );
}
