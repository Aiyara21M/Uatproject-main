import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu_Index = () => {
  const navigate = useNavigate();

  return (

    <div className="h-full md:h-[91vh] w-full flex flex-col items-center justify-center py-1 font-athiti">
    <div className="flex flex-col h-full w-full bg-white items-center">
      
      <div className="w-full md:w-[80%] h-[95%] overflow-auto">
      <h2 className="flex items-center justify-center md:justify-start text-5xl font-bold mb-4 md:pl-16 pt-3">Menu</h2>
      <div className='flex flex-col items-center justify-center h-[85%]'>
      <div className=" flex md:flex-row flex-col bg-gray-100 rounded-lg shadow h-[100%]  w-[90%]">
       
 {/* Manage */}
          <div className="m-3 md:w-48 ">
          <div className='text-2xl font-bold mb-4 flex flex-row  items-center'>Manage data</div>
          <div className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/pngegg.png" alt="My Image"    className="h-10 pr-2"   />
          <h3 className="font-semibold">Employee</h3>
          </div>

          <div className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/department.png" alt="My Image"  className="h-10 pr-2"   />
          <h3 className="font-semibold">Department</h3>
          </div>

          <div className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/pngegg(1).png" alt="My Image"  className="h-10 pr-2"   />
          <h3 className="font-semibold">Sex</h3>
          </div>

          <div className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/pngegg(5).png" alt="My Image"  className="h-10 pr-2 "   />
          <h3 className="font-semibold">Address</h3>
          </div>
          </div>

  {/* repair */}
          <div className=" m-3 md:w-48 ">
          <div className='text-2xl font-bold mb-4 flex flex-row  items-center'>Repair Ticket</div>

          <div onClick={() => navigate(`/createticket`)} className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/pngegg(10).png" alt="My Image"    className="h-10 pr-2"   />
          <h3 className="font-semibold">Create Ticket</h3>
          </div>

          <div className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer"  >
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/travel-agent.png" alt="My Image"  className="h-10 pr-2"   />
          <h3 className="font-semibold">Your Tickets</h3>
          </div>

          <div onClick={() => navigate(`/Technician`)} className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/work-list.png" alt="My Image"  className="h-10 pr-2"    />
          <h3 className="font-semibold">Work List</h3>
          </div>


          </div>


    
 {/* Dashboard */}
          <div className=" m-3 md:w-48 ">
          <div className='text-2xl font-bold mb-4 flex flex-row  items-center'>Dashboard</div>

          <div onClick={() => navigate(`/createticket`)} className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/pngegg(7).png" alt="My Image"    className="h-10 pr-2"   />
          <h3 className="font-semibold">Dashboard</h3>
          </div>


          </div>





          </div>









       
          </div>
      </div>

    </div>

    </div>


  );
};

export default Menu_Index;
