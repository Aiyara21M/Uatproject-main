import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();


  return (

    <div className="h-full md:h-[91vh] w-full flex flex-col items-center justify-center py-1 font-athiti">
    <div className="flex flex-col h-full w-full bg-gray-100 items-center justify-center">
      
      <div className="bg-white w-full md:w-[80%] h-[95%] overflow-auto rounded-lg">
      
      <div className='flex flex-col items-center justify-center h-auto '>
      <h2 className="flex items-center justify-center  text-5xl font-bold mb-4  pt-3">Menu</h2>
      <div className=" flex md:flex-row flex-col rounded-lg  h-[100%]  w-[90%]">
       
 {/* Manage */}
          <div className="m-3 md:w-48 ">
          <div className='border-2 border-sky-800 text-2xl font-bold mb-4 flex flex-row bg-white items-center justify-center  p-3 text-gray-900 rounded-lg items-center shadow'>Manage data</div>
          <div className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/pngegg.png" alt="My Image"    className="h-10 pr-2" />
          <h3 className="font-semibold">Employee</h3>
          </div>

          <div className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/department.png" alt="My Image"  className="h-10 pr-2" />
          <h3 className="font-semibold">Department</h3>
          </div>

          <div className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/pngegg(1).png" alt="My Image"  className="h-10 pr-2" />
          <h3 className="font-semibold">Sex</h3>
          </div>

          <div className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
          <div className="absolute top-1 right-2">
          </div>
          <img src="/img/pngegg(5).png" alt="My Image"  className="h-10 pr-2 " />
          <h3 className="font-semibold">Address</h3>
          </div>


          </div>

  {/* repair */}
          <div className=" m-3 md:w-48 ">
          <div className='border-2 border-sky-800 text-2xl font-bold mb-4 flex flex-row items-center justify-center bg-white p-3 text-gray-900 rounded-lg items-center shadow'>Repair Ticket</div>

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
          <div className='border-2 border-sky-800 text-2xl font-bold mb-4 flex flex-row items-center justify-center bg-white p-3 text-gray-900 rounded-lg items-center shadow'>Dashboard</div>

          <div onClick={() => navigate(`#`)} className="flex flex-row items-center  bg-white p-3 rounded-lg shadow mb-4 relative h-16 cursor-pointer">
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

export default Index;
