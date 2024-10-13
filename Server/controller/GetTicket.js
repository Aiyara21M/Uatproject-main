require("dotenv").config();
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const os = require('os');

exports.GetTicket = async (req, res) => {
    try {
  
      const {numpage} = req.body;
      const page = numpage
        const limit = 30; // จำนวนข้อมูลต่อหน้า
        const skip = (page - 1) * limit; // ข้ามข้อมูลตามจำนวนหน้าที่เลือก
    
        // นับจำนวนข้อมูลทั้งหมด
        const totalDocs = await mongoose.connection.db
        .collection("TicketCounts")
        .findOne({"_id" : "ticket_number_Mechanical" })
    
        const totalPages = Math.ceil(totalDocs.Ticket / limit);

        const docs = await mongoose.connection.db
        .collection("worklistmechanical")
        .aggregate([
          {
            $unset: ["Audilog", "filename"]  // ลบฟิลด์ field1 และ field2 จากผลลัพธ์
          },
          {
            $sort:{
                CreateDate:-1
            }
        },
          { $skip: skip },
      { $limit: limit },
            { $lookup: { from: "profiles", localField: "User", foreignField: "employeeid", as: "User" } },
            { $unwind: { path: "$User", preserveNullAndEmptyArrays: true } },
             { $lookup: { from: "departments", localField: "UserDepartment", foreignField: "_id", as: "UserDepartment" } },
            { $unwind: { path: "$UserDepartment", preserveNullAndEmptyArrays: true } },
            {
                $addFields:{
                    User:{$concat:["$User.firstname"," ","$User.lastname"]},
                    UserDepartment:"$UserDepartment.department"
                }
            },

        ])
        .toArray()

        const Newdocs = docs.map((doc) => {
        
            const Newdate = new Intl.DateTimeFormat("th-TH", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "Asia/Bangkok",
            }).format(new Date(doc.CreateDate));
  
            
            return {
              ...doc,
              CreateDate: Newdate, 
            };
          });
        
        console.log({
            data: Newdocs,
            currentPage: page,
            totalPages: totalPages,
            totalDocs: totalDocs.Ticket,
          });
        res.status(200).json({
            data: Newdocs,
            currentPage: page,
            totalPages: totalPages,
            totalDocs: totalDocs.Ticket,
          });

      } catch (error) {
        console.error('Error fetching IP:', error);
        res.status(500).json({ error: error });
      }
  };