import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../auth/auth";

export default function Technician() {
  const navigate = useNavigate();
  document.title = "Ticket list Technician";

  const [getTicket, setTicket] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);

  
  const token = getToken();
  useEffect(() => {
    token ? getdata(currentPage) : setTicket([]);  
  }, [currentPage]);
  const getdata = async (currentPage) => {
    const response = await axios.post("http://localhost:4211/api/ticket", { numpage: currentPage }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setTicket(response.data.data);
    setcurrentPage(response.data.currentPage)
    settotalPages(response.data.totalPages)
  };

  return (
    <div className="flex flex-col justify-center items-center h-[91vh] px-4 font-athiti">
      <div className="flex flex-col bg-white justify-center items-center h-[98%] w-full md:w-[80%] rounded-lg  overflow-hidden">
        <div className="bg-white  flex flex-col md:flex-row justify-between items-center w-full p-2 rounded-t-lg border-0 border-b-4  border-b-gray-900 ">
        
          <h2 className="flex flex-row justify-center items-center text-lg text-gray-900 font-bold text-center md:text-left">
          <div
                onClick={() => navigate("../index")}
                className="font-bold text-gray-900 text-md mr-6 cursor-pointer"
              >
                <img
                  src="/img/clipart2061713.png"
                  alt="My Image"
                  className="h-0 md:h-6 "
                />
              </div>
          <img src="/img/pngegg(3).png" alt="My Image"  className="h-10 md:h-10 pr-2"   />
            Ticket list ( Technician )
          </h2>
          <div className="relative w-full md:w-1/3 mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-1 pl-10 pr-4 rounded-lg border border-sky-300 focus:border-white focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <ul className="flex flex-col items-center h-[90%] w-full md:w-[90%] mt-1 mb-auto overflow-y-auto ">
  {/* Ticket items */}
  {getTicket ? (
    getTicket.map((getTicket) => (
      <li
        key={getTicket._id}
        className="w-full mb-1 bg-white hover:bg-gray-100 rounded-lg p-2 border border-gray-300 transition-shadow"
      >
        <div
          className="flex flex-col"
          onClick={() => navigate(`/Technician/Mer__-${getTicket._id}`)}
        >
          <h3 className="font-bold">
            {getTicket.HeadContent}
            <span className="display-id text-gray-500">
              {"  Ticket Number - "}
              {getTicket.TicketNumber}
            </span>
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <span className="text-gray-600">
              <span className="created-on">Created {getTicket.CreateDate}</span>
              <span className="source source-2"> {" "}ผู้แจ้ง - {getTicket.User}</span>
            </span>
            <span className="rounded mt-2 md:mt-0 self-end md:self-auto">
              {getTicket.action === true ? (
                <span className="text-gray-900 bg-sky-500 p-1 rounded font-bold">
                  Ticket In Progress
                </span>
              ) : (
                <span className="text-white bg-rose-600 p-1 rounded font-bold">
                  Ticket Closed
                </span>
              )}
            </span>
          </div>
        </div>
      </li>
    ))
  ) : (
    <li className="text-5xl"></li>
  )}
  {/* Repeat the above <li> block for more tickets */}
</ul>

        <div className="flex justify-between items-center w-full p-1 bg-white rounded-b-lg border-0 border-t-4 border-t-gray-900">
          <button 
           disabled={currentPage <= 1}
           onClick={()=>setcurrentPage(currentPage=>currentPage-1)}
          className="bg-gray-900 text-white hover:text-gray-900 font-bold py-2 px-4 rounded-lg shadow-lg border-1 border-gray-600 hover:shadow-xl hover:bg-gray-300  transition-all duration-300 ">
            Prev Page
          </button>
          <div className="flex items-center">
            <p>Page</p>
            <span className="font-bold mx-2">{currentPage}</span>
            <p>From {totalPages}</p>
          </div>
          <button 
           disabled={currentPage >= totalPages}
           onClick={()=>setcurrentPage(currentPage=>currentPage+1)}
          className="bg-gray-900 text-white hover:text-gray-900 font-bold py-2 px-4 rounded-lg shadow-lg border-1 border-gray-600 hover:shadow-xl hover:bg-gray-300  transition-all duration-300 ">
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
