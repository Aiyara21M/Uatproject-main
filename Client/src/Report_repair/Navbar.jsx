import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getProfileimg, getUser, logout } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

const navigation = [
  { name: "Home", href: "/index", current: false },
  { name: "Create Ticket", href: "/createticket", current: false },
  { name: "งานที่แจ้ง", href: "#", current: false },
  { name: "Work list", href: "/mechanical", current: false },
  // { name: 'งานคอมพิวเตอร์', href: '/computer', current: false },
  // { name: 'ticket', href: '/GetMsg', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const profileimg = getProfileimg();
  // const [alert, setAlert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const nonerefresh = (e, href) => {
    e.preventDefault();
    navigate(href);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleNotifications = () =>
    setIsNotificationsOpen(!isNotificationsOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleNotificationClick = (e, notification) => {
    e.preventDefault();
    setIsNotificationsOpen(false);
    console.log(notification);
  };

  const handleProfileClick = (e, action) => {
    e.preventDefault();
    setIsProfileOpen(false);
    if (action === "logout") {
      logout(() => navigate("/"));
    } else if (action === "profile") {
      nonerefresh(e, "/profile");
    } else if (action === "settings") {
      nonerefresh(e, "/settings");
    }
  };

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
    {
      id: 1,
      type: "Ticket",
      sender: "NameSend",
      senderInitial: "Img",
      content: "Content",
      time: "26 Sep 2024 - 11:05 AM",
      senderImage:
        "/api/_/users/16003914118/profile_image_no_blank?hashval=a8c1a8a039998718deac0685cec50ce4",
      unread: true,
    },
    // Add more notifications as needed
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // if (getUser()) {
  //   const UUID = getUser();
  //   const putAlert = () => {
  //     socket.emit("Putalert", { UUID });
  //   };
  //   putAlert();
  // }

  const menuRef = useRef(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!getUser()) {
    return null;
  }

  return (
    <nav
      className="sticky top-0 bg-white  z-50  hover:shadow-l md:rounded-b-xl transition-all duration-100 shadow-inner"
      style={{ borderWidth: "0px" }}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between font-athiti">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" />
            </button>
          </div>

          {/* Logo and Navigation Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="inline-flex items-center justify-center h-15 w-20 transition duration-300 px-4">
              <img
                alt="Your Company"
                src={`http://localhost:4211/Uploads/logo/pngegg(2).png`}
                className="h-15 w-auto"
              />
            </div>

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-6">
                {navigation.map((item) => (
                  <a
                    onClick={(e) => nonerefresh(e, item.href)}
                    key={item.name}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? ""
                        : "text-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-md",
                      "py-2 px-3 text-lg font-medium transition duration-150 ease-in-out cursor-pointer rounded-lg font-athiti"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Notification and Profile Menu */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Notifications Button */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={toggleNotifications}
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
                <div className="absolute right-[-40px] w-[90vw] sm:w-[400px] sm:right-0 top-full mt-2 w-96 bg-white rounded-md shadow-lg z-50">
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
                          className={`flex items-start p-2 ${
                            notification.unread ? "bg-gray-100" : ""
                          }`}
                          onClick={(e) =>
                            handleNotificationClick(e, notification)
                          }
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
                      <div className="text-center text-gray-500">
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
                onClick={toggleProfile}
                className="relative flex rounded-full bg-gray-900 text-sm p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 transition duration-150 ease-in-out"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src={`${profileimg}`}
                  className="h-8 w-8 rounded-full"
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md  bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                  <div className="p-2 text-gray-700 font-semibold">
                    User Menu
                  </div>
                  <a
                    href="#"
                    onClick={(e) => handleProfileClick(e, "profile")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                  >
                    Your Profile
                  </a>
                  <a
                    onClick={(e) => handleProfileClick(e, "settings")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                  >
                    Settings
                  </a>
                  <button
                    onClick={(e) => handleProfileClick(e, "logout")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div ref={menuRef} className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                onClick={(e) => {
                  nonerefresh(e, item.href);
                  closeMenu(); // Close menu when an item is clicked
                }}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-800 font-semibold"
                    : "text-gray-800 hover:bg-gray-900 hover:text-white font-medium",
                  "block rounded-md px-4 py-2 text-lg transition duration-150 ease-in-out tracking-wide cursor-pointer font-athiti"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
