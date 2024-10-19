import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, getUser } from "../auth/auth";

const Departments = () => {
  const navigate = useNavigate();
  const [DepartmentData, setDepartmentData] = useState(null);
  const [Datalog, setDatalog] = useState(null);
  const [formAdd, setFormAdd] = useState(null);
  
  const [DataEdit, setDataEdit] = useState(null); 
  const token = getToken();
  const UUID = getUser();
  const logRef = useRef(null);
  const editRef = useRef(null);
  const formAddRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  // Fetch department data on component mount
  useEffect(() => {
    getDepartmentData();
  }, []);

  // Fetch department data from API
  const getDepartmentData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4211/api/getDepartments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDepartmentData(response.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const getLog = async (Departid) => {
    try {
      const response = await axios.post(
        "http://localhost:4211/api/getLogDepart",
        { id: Departid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDatalog(response.data); 
    } catch (error) {
      console.error("Error fetching log data:", error);
    }
  };

  const getDataEdit = async (Departid) => {
    try {
      const response = await axios.post(
        "http://localhost:4211/api/getDepartEdit",
        { id: Departid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataEdit(response.data); 
    } catch (error) {
      console.error("Error fetching log data:", error);
    }
  };

  const closelog = (event) => {

    if (logRef.current && !logRef.current.contains(event.target)) {
      setDatalog(null); 
    }
  };

  const closeEdit = (event) => {
    if (editRef.current && !editRef.current.contains(event.target)) {
      setDataEdit(null); 
    }
  };

  const closeForm = (event) => {
    if (formAddRef.current && !formAddRef.current.contains(event.target)) {
      setFormAdd(null); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closelog);
    document.addEventListener("mousedown", closeEdit);
    document.addEventListener("mousedown", closeForm);

  }, []);
  const [searchText, setSearchText] = useState('');



  return (
    
    <div className="h-full md:h-[91vh] w-full flex flex-col items-center justify-center md:py-1 font-athiti">
      <div className="flex flex-col h-full w-full bg-gray-100 items-center justify-center">
        <div className="bg-white w-full md:w-[85%] h-[98%] overflow-auto rounded-lg relative">
        <div className="absolute top-6 right-[6%]">
        <img src="/img/add.png"  alt="My Image"  className="h-6 pr-2 cursor-pointer"
            onClick={()=>{setFormAdd({id:UUID,NameDepart:"",Code:""})}} 
                      />
          </div>


          <div className="flex flex-col items-center  h-[100%]">
          <div className="flex flex-col md:flex-row items-center   w-[80%]">
          <h2 className="flex  items-center justify-center md:justify-start md:items-start text-3xl font-semibold mb-4 pt-3 md:w-[80%]">
             <div className="">Department list</div> 
            </h2>
            <input type="text" placeholder="ค้นหา..." className="w-[100%] md:w-[400px] p-1 md:mr-3 flex text-md focus:border-0 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-sky-200" 
              value={searchText} 
              onChange={(e) => setSearchText(e.target.value)}/>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-10 font-semibold text-white  w-[90%] rounded-xl bg-gray-900 mt-3 md:mt-0">
                  <div className="flex items-center justify-center p-2 md:col-span-3 border rounded-t-lg md:rounded-l-lg md:rounded-r-none">Value</div>
                  <div className="flex items-center justify-center p-2 md:col-span-2 border ">Create Date</div>
                  <div className="flex items-center justify-center p-2 md:col-span-3 border ">Create By</div> 
                  <div className="flex items-center justify-center p-2 md:col-span-1 border ">Setting</div>
                  <div className="flex items-center justify-center p-2 md:col-span-1 border rounded-b-lg md:rounded-r-lg md:rounded-l-none">Audi Log</div>
            </div>
            <div className="flex flex-col  w-[90%] h-[80%] overflow-auto">
            {DepartmentData &&
              DepartmentData.filter(dept => 
                dept.department.toLowerCase().includes(searchText.toLowerCase())||
                dept.createUser.toLowerCase().includes(searchText.toLowerCase())
              ).map((depart) => (
                <div key={depart._id} className="grid grid-cols-1 md:grid-cols-10 gap-1   w-[100%] rounded-xl border-b-2 border-b-gray-900">
                  <div className="flex items-center justify-center md:justify-start p-2 md:col-span-3 md:pl-8 lg:pl-16" >{depart.department}</div>
                  <div className="flex items-center justify-center p-2 md:col-span-2">{depart.createdAt}</div>
                  <div className="flex items-center justify-center md:justify-start p-2 md:col-span-3 md:pl-8 lg:pl-16">{depart.createUser}</div> 
                  <div className="flex items-center justify-center p-2 md:col-span-1">                   
                  <img src="/img/pngegg(12).png" alt="My Image" className="h-5 pr-2 hover:-translate-y-1 cursor-pointer" onClick={() => getDataEdit(depart._id)}/>
                  </div>
                  <div className="flex items-center justify-center p-2 md:col-span-1" >        
                  <img src="/img/pngegg(18).png" alt="My Image" className="h-5 pr-2 hover:-translate-y-1 cursor-pointer" onClick={() => getLog(depart._id)}/>
                  </div>
                </div>
              ))}


              </div>
          </div>
        </div>
      </div>

        {/* FromAdd */}
  {formAdd && (
   <div 
   ref={formAddRef}
   className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 h-[250px] w-[400px] overflow-auto p-4 rounded-md shadow-2xl 
   ${formAdd ? 'slide-in-active' : 'slide-out-active'}`}
 >
<div className="bg-gray-900 text-white w-[100%] font-semibold p-2 rounded-md">Add Department</div>
<div  className="flex flex-col items-center justify-center rounded-md">
<span className="w-[90%] mt-3">Value</span>
<input 
        type="text" 
          className="text-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-sky-200 w-[80%]" 
          name="department" 
          // value={DataEdit.department} 
          // onChange={(e) => setDataEdit({...DataEdit, department: e.target.value})} 
/>
<div className="flex flex-row w-[80%] mt-4 ">
<div className="flex items-center justify-center w-[50%] p-2 bg-gray-900 text-white rounded-md cursor-pointer m-1 hover:bg-gray-500">Save</div>
<div className="flex items-center justify-center w-[50%] p-2 bg-gray-900 text-white rounded-md cursor-pointer m-1 hover:bg-gray-500" onClick={() => setFormAdd(null)}>Cancel</div>
</div>
</div>

  </div>

)}

   
  {/* Log */}
  {Datalog && (
  <div
    ref={logRef}
    className="fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 h-[400px] w-[70%] md:w-[700px]  p-4 rounded-md shadow-2xl"
  >
    <div className="bg-gray-900 text-white w-[100%] font-semibold p-2 rounded-md">Audi Log</div>
    {Datalog.map((log, index) => (
      <div key={index} className="rounded-md shadow-2xl w-[80%] bg-sky-300">
        {log.name}
      </div>
    ))}
  </div>
)}


{/* Edit */}
{DataEdit && (
  <div
    ref={editRef}
    className="bg-gray-200  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[250px] w-[300px] overflow-auto p-3 rounded-md shadow-2xl"
  >
    <div className="bg-gray-900 text-white w-[100%] font-semibold p-2 rounded-md">Edit</div>

      <div  className="flex flex-col items-center justify-center rounded-md">
        <span className="w-[80%] mt-2">Value</span>
        <input 
        type="text" 
          className="text-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-sky-200" 
          name="department" 
          value={DataEdit.department} 
          onChange={(e) => setDataEdit({...DataEdit, department: e.target.value})} 
/>
      
        <div className="flex mt-3 w-[80%]">
        <span className="mr-3">Status</span>
      <label htmlFor="toggleSwitch" className="flex  cursor-pointer">

        {/* Switch */}
        <div className="relative ">
          <input
            type="checkbox"
            id="toggleSwitch"
            className="sr-only"
            checked={isActive}
            onChange={()=>{setIsActive(!isActive)}}
          />
          {/* Background */}
          <div
            className={`block w-12 h-6 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-600'}`}
          ></div>
          {/* Circle */}
          <div
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              isActive ? 'transform translate-x-6' : ''
            }`}
          ></div>
        </div>
        {/* Label */}
        <span className={`ml-3 select-none  ${isActive? 'text-green-500':'text-red-500'}`}>{isActive?'Active':'Close'}</span>
      </label>
    </div>

<div className="flex flex-row w-[80%] mt-4 ">
<div className="flex items-center justify-center w-[50%] p-2 bg-gray-900 text-white rounded-md cursor-pointer m-1 hover:bg-gray-500">Save</div>
<div className="flex items-center justify-center w-[50%] p-2 bg-gray-900 text-white rounded-md cursor-pointer m-1 hover:bg-gray-500" onClick={() => setDataEdit(null)}>Cancel</div>
</div>
    
      </div>

  </div>
)}
    </div>
  );
};


export default Departments;
