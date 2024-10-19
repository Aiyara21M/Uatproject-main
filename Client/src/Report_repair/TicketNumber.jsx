import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartments, getToken, getUser } from "../auth/auth";

function TicketNumber() {
  const { id } = useParams();
  const token = getToken();
  const UUID = getUser();
  const depart = getDepartments();
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const inputRef = useRef(null);
  const [content, setContent] = useState("");
  const [dataTicket, setDataticket] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getdata(id);
  }, []);

  const getdata = async (paramID) => {
    const response = await axios.post(
      "http://localhost:4211/api/getTicket",
      { id: paramID },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setDataticket(response.data);
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

    console.log(content, UUID, depart, id);

    if (content === "<p><br></p>" || content === "") {
      return alert(`กรุณณากรอกรายละเอียดให้ครบถ้วน`);
    }

    const formDataToSend = new FormData();
    formDataToSend.append(
      "jsonData",
      JSON.stringify({ content, UUID, depart, id })
    );
    if (selectedFile) {
      formDataToSend.append("filefolder", selectedFile); //'filefolder'
    }
    try {
      const response = await axios.post(
        "http://localhost:4211/api/UpdateTicket",
        formDataToSend,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // if(response)
      getdata(id);
      setContent("");
      setSelectedFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Please try again.");
    }
  };

  return (
    <div className="h-full md:h-[91vh] w-full flex flex-col items-center justify-center md:py-1 font-athiti">
      <div className="flex flex-col-reverse w-full md:flex-row md:h-full  md:w-[95%] md:rounded-lg bg-white overflow-hide">
        <div className="flex-1 h-full md:h-[95%] w-full bg-gray-900 md:rounded-lg md:w-[30%] md:h-[100%] p-4 md:m-4">
          <div className="flex pb-3 items-center justify-center font-bold text-white text-2xl">
            Replay Ticket
          </div>

          <div className="flex-1 h-[70%] w-full bg-white  overflow-auto">
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
              className="rounded border border-gray-300  h-[83%] w-full overflow-hide border-transparent "
            />
          </div>
          <div className="p-3">
            <input
              name="filefolder"
              type="file"
              ref={inputRef} // ใช้ ref เพื่อผูกกับ input file element
              onChange={Upfile}
              className="mb-2 text-white"
            />
          </div>
          <div className="flex p-3 md:mt-4">
            <button
              onClick={sendData}
              className="w-full p-2 bg-white text-gray-900 font-semibold rounded-lg  shadow-md hover:shadow-lg hover:bg-gray-300  transition-all"
            >
              Send
            </button>
          </div>
        </div>

        <div className="bg-white w-full md:w-[60%] container rounded-r-lg mx-auto p-3   ">
          <div className="flex w-full container mx-auto p-1 md:w-[100%] bg-white border-0 border-y-2 border-y-gray-900 rounded-full ">
            <div className="flex flex-col md:flex-row justify-center md:justify-start p-2 items-center w-[100%]">
              <div
                onClick={() => navigate("../Technician")}
                className="font-bold text-gray-900 text-md mr-6 cursor-pointer"
              >
                <img
                  src="/img/clipart2061713.png"
                  alt="My Image"
                  className="h-0 md:h-6 "
                />
              </div>

              <div className="flex  font-bold text-gray-900 text-md  w-[90%] md:w-[70%]">
                <div className="md:mr-2 w-[35%]">
                  {" "}
                  Ticket - {dataTicket.TicketNumber}
                </div>
                <div className="justify-center md:justify-start font-bold text-gray-900 text-md truncate ... w-[65%] ">
                  {dataTicket.HeadContent}
                </div>
              </div>
            </div>
          </div>

          {/* ตัวโพส */}
          <div className="container mx-auto rounded-xl md:h-[90%] md:w-[100%] overflow-auto ">
            {/* content */}
            {dataTicket.Audilog &&
              dataTicket.Audilog.map((data, index) => (
                <div
                  key={index}
                  className="bg-white p-4 mb-6 transition-all    border-0 border-b-2 border-b-gray-900"
                >
                  <div className="flex items-center  flex pb-3 border-0 border-b-2">
                    <div className="flex w-[100%] font-bold  text-xl justify-center items-center  px-8  rounded-xl text-white bg-gray-900 text-sm p-2 ">
                      <div>
                        <img
                          alt=""
                          src={`${data.profileimg}`}
                          className="h-12 w-12 rounded-full bg-gray-300 mr-4"
                        />
                      </div>
                      <div>
                        {data.User}
                        <div className="text-sm font-none text-gray-400 justify-center items-center h-[100%]">
                          แผนก {data.UserDepartment}
                        </div>
                        <div className="text-sm font-none text-gray-400 justify-center items-center h-[100%]">
                          Create Date {data.ModifyDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-4 text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                  />
                  {data.filename && (
                    <div className="mt-3  border-0 border-t-2 pt-2">
                      Download File
                      <a
                        href={`http://localhost:4211/Uploads/${data.filename}`}
                      >
                        <img
                          src="/img/pngegg(17).png"
                          alt="My Image"
                          className="h-10 pr-2"
                        />
                      </a>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketNumber;
