import axios from "axios";
import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { socket } from "../socket";
import { getDepartments, getToken, getUser } from "../auth/auth";
import { useNavigate } from "react-router-dom";


const Createticket = () => {
  const [formData, setFormData] = useState({
    HeadContent: "",
    Phone: "",
    action: true,
    Type: "",
  });

 
  const [Load, setLoad] = useState(false);
  const navigate= useNavigate();
  const inputRef = useRef(null);
  const quillRef = useRef(null);
  const token = getToken();
  const UUID = getUser();
  const depart = getDepartments();
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State เพื่อเก็บไฟล์ที่เลือก

  const putData = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const putContent = (value) => {
    setContent(value);
  };

  
  const Upfile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); 
  };

  const sendData = async (e) => {
    e.preventDefault();
    setLoad(true);
    if (formData.HeadContent === "" || formData.Phone === "" || formData.Type === "" || formData.content === ""|| content=== '<p><br></p>'||content==='') {
      return alert(`กรุณณากรอกรายละเอียดให้ครบถ้วน`), setLoad(false);
    }

    const formDataToSend = new FormData();
    formDataToSend.append("jsonData", JSON.stringify({ ...formData,content,UUID,depart}));
    if (selectedFile) {
      formDataToSend.append("filefolder", selectedFile); //'filefolder'
    }
    try {
      const response = await axios.post(
        "http://localhost:4211/api/createdticket", 
        formDataToSend,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);

      setFormData({ HeadContent: "", Phone: "", action: true, Type: "" });
      setContent("");
      setSelectedFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setLoad(false);
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Please try again.");
      setLoad(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[91vh] md:px-4 font-athiti ">
      <div className="flex flex-col bg-white items-center h-full md:h-[95%] w-full md:w-[80%] rounded-lg overflow-hidden shadow-inner">
        <div className="flex flex-col w-full p-6 h-[100%] relative overflow-auto">
          <h1 className="text-2xl font-bold mb-4 flex flex-row  items-center">          <div
                onClick={() => navigate("../index")}
                className="font-bold text-gray-900 text-md mr-6 cursor-pointer"
              >
                <img
                  src="/img/clipart2061713.png"
                  alt="My Image"
                  className="h-0 md:h-6 "
                />
              </div>   <img src="/img/pngegg(10).png" alt="My Image"  className="h-10 pr-2"   /> Create Ticket</h1>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 h-[90%]">
            {/* ส่วนฟอร์มด้านซ้าย */}
            <div className="flex flex-col w-full md:w-[35%] bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white rounded-lg shadow-md">
              <label className="mb-1 font-semibold">Type</label>
              <div className="flex  mb-2 flex-col md:flex-row">
                <label className="mr-4 flex items-center text-white">
                  <input
                    type="radio"
                    name="Type"
                    value="Mechanical"
                    checked={formData.Type === "Mechanical"}
                    onChange={putData}
                    required
                    className="form-check-input h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium">Technician</span>
                </label>
                <label className="flex items-center text-white mt-2 md:mt-0">
                  <input
                    type="radio"
                    name="Type"
                    value="Computer"
                    checked={formData.Type === "Computer"}
                    onChange={putData}
                    required
                    className="form-check-input h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium">
                    IT Support
                  </span>
                </label>
              </div>

              <label className="block mb-1">Phone :</label>
              <input
                type="text"
                name="Phone"
                value={formData.Phone}
                onChange={putData}
                className="border rounded w-full p-2 mb-4 text-gray-800"
                required
              />

              <label className="block mb-1">Subject :</label>
              <input
                type="text"
                name="HeadContent"
                value={formData.HeadContent}
                onChange={putData}
                className="border rounded w-full p-2 mb-4 text-gray-800"
                required
              />

              <div>
                <input
                  name="filefolder"
                  type="file"
                  ref={inputRef} // ใช้ ref เพื่อผูกกับ input file element
                  onChange={Upfile}
                  className="mb-2"
                />
              </div>

              {/* ปุ่มแจ้งซ่อม */}
              <div className="mt-auto">
                <button
                  onClick={sendData}
                  type="submit"
                  className={`bg-white text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg w-full border-2 border-gray-500 hover:shadow-xl hover:bg-gray-300 transition-all duration-300 transform ${
                    Load ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={Load}
                >
                  {Load ? "Waiting ..." : "Send Ticket"}
                </button>
              </div>
            </div>

            {/* ส่วน ReactQuill ด้านขวา */}
            <div className="flex flex-col w-full md:w-[65%]">
              <label className="block mb-1">Detail :</label>
              <div className="flex-1 h-full">
                <ReactQuill
                  ref={quillRef}
                  value={content}
                  onChange={putContent}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      ["link", "image", "code-block"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                  className=" rounded h-[80%]"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Createticket;
