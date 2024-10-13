import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../auth/auth";

export default function Mechanical() {
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
    const response = await axios.post("http://localhost:4211/api/ticket",{currentPage}, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    setTicket(response.data.data);
    setcurrentPage(response.data.currentPage)
    settotalPages(response.data.totalPages)
  };

  return (
    <div className="flex flex-col justify-center items-center h-[91vh] px-4 font-athiti">
      <div className="flex flex-col bg-white justify-center items-center h-[95%] w-full md:w-[80%] rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col md:flex-row justify-between items-center w-full p-2 rounded-t-lg shadow-md">
          <h2 className="text-lg text-white font-bold text-center md:text-left">
            Ticket list ( Technician )
          </h2>
          <div className="relative w-full md:w-1/3 mt-2 md:mt-0">
            <input
              type="text"
              placeholder="ค้นหา..."
              className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <ul className="flex flex-col items-center h-[90%] w-full md:w-[90%] mt-3 mb-auto overflow-y-auto p-2">
          {/* Ticket items */}
          {getTicket ? (
            getTicket.map((getTicket) => (
              <li
                key={getTicket._id}
                className="w-full mb-2 bg-gradient-to-b from-gray-200 to-gray-100 rounded-lg p-2 border-b hover:shadow-md transition-shadow"
              >
                <div
                  className="flex flex-col"
                  onClick={() => navigate(`/mechanical/${getTicket._id}`)}
                >
                  <h3 className="font-bold">
                    {getTicket.HeadContent}
                    <span className="display-id text-gray-500">
                      {"  Ticket Number - "}
                       {getTicket.TicketNumber}
                    </span>
                  </h3>
                  <p className="text-gray-600">
                    <span className="created-on">
                      Created {getTicket.CreateDate}
                    </span>
                    <span className="source source-2">
                      {" "}
                      ผู้แจ้ง - {getTicket.User}
                    </span>
                    <span className="rounded flex justify-end">
                      <span className="text-green-700 bg-gray-300 p-1 rounded font-bold">
                        {" "}
                        {getTicket.action == true
                          ? `Being Processed`
                          : `Close`}{" "}
                      </span>
                    </span>
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="text-5xl">No Ticket</li>
          )}
          {/* Repeat the above <li> block for more tickets */}
        </ul>

        <div className="flex justify-between items-center w-full p-4 bg-white rounded-b-lg shadow-md">
          <button 
           disabled={currentPage <= 1}
           onClick={()=>setcurrentPage(currentPage=>currentPage-1)}
          className="bg-white text-gray-600 font-bold py-2 px-4 rounded-lg shadow-lg border-1 border-gray-600 hover:shadow-xl hover:bg-gray-300  transition-all duration-300 transform {currentPage <= 1} hover:-translate-y-1">
            Previous
          </button>
          <div className="flex items-center">
            <p>Page</p>
            <span className="font-bold mx-2">{currentPage}</span>
            <p>From {totalPages}</p>
          </div>
          <button 
           disabled={currentPage >= totalPages}
           onClick={()=>setcurrentPage(currentPage=>currentPage+1)}
          className="bg-white text-gray-600 font-bold py-2 px-4 rounded-lg shadow-lg border-1 border-gray-600 hover:shadow-xl hover:bg-gray-300  transition-all duration-300 transform hover:-translate-y-1">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
