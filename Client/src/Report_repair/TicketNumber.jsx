import { useState, useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const commentsData = [
  {
    id: 1,
    username: "Boyscouted",
    avatar: "https://via.placeholder.com/50",
    lastUpdated: "06/08/2023",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut delectus fuga, suscipit praesentium repellat quod unde aspernatur veritatis odio atque veniam facere possimus natus. Quos, placeat quas praesentium fuga porro soluta facere voluptatum sunt harum voluptates, cumque odio quis ea labore esse commodi odit delectus, facilis nisi totam quidem ab?",
  },
  {
    id: 2,
    username: "ChitoDesu",
    avatar: "https://via.placeholder.com/50",
    lastUpdated: "06/08/2023",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut delectus fuga, suscipit praesentium repellat quod unde aspernatur veritatis odio atque veniam facere possimus natus. Quos, placeat quas praesentium fuga porro soluta facere voluptatum sunt harum voluptates, cumque odio quis ea labore esse commodi odit delectus, facilis nisi totam quidem ab?",
  },
];

function TicketNumber() {
  
  const [comments, setComments] = useState(commentsData);
  const [Comment, setComment] = useState("");
  const quillRef = useRef(null);

  const handleQuillChange = (value) => {
    setComment(value);
  };

  const processAndSaveContent = async () => {

    const updatedContent = await processQuillContent(Comment);
    // บันทึก updatedContent ลงในฐานข้อมูลของคุณ
    console.log("Updated content:", updatedContent);
    setComments([
      ...comments,
      { id: comments.length + 1, content: updatedContent },
    ]);
    setComment(""); // รีเซ็ต editor หลังจากบันทึกข้อมูล
  };

  const processQuillContent = async (quillContent) => {
    const base64Pattern = /<img src="data:image\/(.*?);base64,(.*?)"[^>]*>/g;
    let match;
    let updatedContent = quillContent;

    while ((match = base64Pattern.exec(quillContent)) !== null) {
      const base64Image = match[0];
      const base64Data = match[2];
      // Convert base64 data to a Blob or File object
      const blob = base64ToBlob(base64Data);
      const formData = new FormData();
      formData.append("image", blob, "image.jpg");

      try {
        // Upload image to server using axios
        const response = await axios.post(
          "http://localhost:4211/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = response.data.filePath; // URL ของรูปภาพที่ได้รับจาก server

        // Replace base64 image with the URL of the uploaded image in the content
        updatedContent = updatedContent.replace(
          base64Image,
          `<img src="${imageUrl}" />`
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return updatedContent;
  };

  const base64ToBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: "image/jpeg" });
  };

  return (
    <div className="h-full md:h-[91vh] mt-0 sm:mt-0 w-full flex flex-col items-center justify-center">
      <div className="w-full container mx-auto p-3 md:w-[75%] bg-gradient-to-b from-gray-800 to-gray-900 sm:rounded-t-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h3 className="font-bold text-white text-xl sm:text-2xl">เนื้อหา</h3>
        </div>
      </div>

      <div className="container mx-auto p-6 h-[100%] md:h-[75%] md:w-[75%] overflow-auto bg-white ">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gradient-to-r from-gray-200 via-gray-100 to-white rounded-lg p-6 mb-6 transition-all"
          >
            <div
              className="mt-4 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
          </div>
        ))}
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
              onClick={processAndSaveContent}
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
