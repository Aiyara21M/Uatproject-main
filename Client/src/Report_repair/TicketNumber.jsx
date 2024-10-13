import { useState, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from 'react-router-dom';



function TicketNumber() {
  const { id } = useParams();
  console.log(id);
  

  const [Comment, setComment] = useState("");
  const quillRef = useRef(null);

  const handleQuillChange = (value) => {
    setComment(value);
  };



  

  return (
    <div className="h-full md:h-[91vh] mt-0 sm:mt-0 w-full flex flex-col items-center justify-center">
      <div className="w-full container mx-auto p-3 md:w-[75%] bg-gradient-to-b from-gray-800 to-gray-900 sm:rounded-t-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h3 className="font-bold text-white text-xl sm:text-2xl">เนื้อหา</h3>
        </div>
      </div>

      <div className="container mx-auto p-6 h-[100%] md:h-[75%] md:w-[75%] overflow-auto bg-white ">
        {/* {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gradient-to-r from-gray-200 via-gray-100 to-white rounded-lg p-6 mb-6 transition-all"
          >
            <div
              className="mt-4 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </div>
        ))} */}
      </div>

      <div className="w-full container mx-auto p-6 md:w-[75%] bg-white rounded-b-lg mt-0">
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="flex-1">
            <ReactQuill
              ref={quillRef}
              value={Comment}
              onChange={handleQuillChange}
              modules={{
                toolbar: {
                  container: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    ["link", "image", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["clean"],
                  ],
                },
              }}
              className="rounded border border-gray-300"
            />
          </div>
          <div className="flex lg:w-1/4">
            <button
              // onClick={processAndSaveContent}
              className="w-full px-4 py-2 bg-white text-gray-600 font-semibold rounded-lg border-1 border-gray-500 shadow-md hover:shadow-lg hover:bg-gray-100 transition-all"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketNumber;
