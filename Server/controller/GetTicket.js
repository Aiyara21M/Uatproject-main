require("dotenv").config();
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const os = require('os');

exports.GetTicket = async (req, res) => {
    try {

        const { currentPage } = req.body; // ดึงค่า currentPage จาก request body
        const page = currentPage // หน้าที่ต้องการ (ค่าเริ่มต้นเป็นหน้าแรก)
        console.log(`C page`+currentPage);
        
        
        const limit = 1; // จำนวนข้อมูลต่อหน้า
        const skip = (page - 1) * limit; // ข้ามข้อมูลตามจำนวนหน้าที่เลือก
    
        // นับจำนวนข้อมูลทั้งหมด
        const totalDocs = await mongoose.connection.db
          .collection("worklistmechanical")
          .countDocuments();
    
        // คำนวณจำนวนหน้าทั้งหมด
        const totalPages = Math.ceil(totalDocs / limit);


        const docs = await mongoose.connection.db
        .collection("worklistmechanical")
        .aggregate([
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
            {
                $sort:{
                    CreateDate:-1
                }
            },
            { $skip: skip }, // ข้ามข้อมูลตามจำนวนหน้าที่เลือก
        { $limit: limit },
        ])
        .toArray()

        const Newdocs = docs.map((doc) => {
            const createDate = new Date(doc.CreateDate);
            const Newdate = new Intl.DateTimeFormat("th-TH", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "Asia/Bangkok",
            }).format(createDate);
      
            return {
              ...doc,
              CreateDate: Newdate, // 
            };
          });
        
        console.log({
            data: Newdocs,
            currentPage: page,
            totalPages: totalPages,
            totalDocs: totalDocs,
          });
        res.status(200).json({
            data: Newdocs,
            currentPage: page,
            totalPages: totalPages,
            totalDocs: totalDocs,
          });

      } catch (error) {
        console.error('Error fetching IP:', error);
        res.status(500).json({ error: error });
      }
  };