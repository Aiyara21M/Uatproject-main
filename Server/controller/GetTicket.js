require("dotenv").config();
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const os = require('os');
const moment = require('moment-timezone');

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

        docs.forEach(doc => {
          doc.CreateDate = moment.tz(doc.CreateDate, 'Asia/Bangkok').format('DD/MM/YYYY HH:mm');
        });

        
        console.log({
          docs
          });
        res.status(200).json({
            data: docs,
            currentPage: page,
            totalPages: totalPages,
            totalDocs: totalDocs.Ticket,
          });

      } catch (error) {
        console.error('Error fetching IP:', error);
        res.status(500).json({ error: error });
      }
  };




  exports.GetTicketID = async (req, res) => {
    try {
  
      const data = req.body.id.split('-');
      const type=data[0]
      const id=data[1]
      const dbSearch = type == 'Mer__'? 'worklistmechanical':'worklistcomputer'

        const ticket = await mongoose.connection.db
        .collection(dbSearch)
        .aggregate([
          {
              $match:{
                  "_id" : new ObjectId(id)
            }
          },
          { $unwind: { path: "$Audilog", preserveNullAndEmptyArrays: true } },
          {$sort:{
                  "Audilog.ModifyDate" :1
          }},
          { $lookup: { from: "profiles", localField: "Audilog.User", foreignField: "employeeid", as: "Audilog.User" } },
          { $unwind: { path: "$Audilog.User", preserveNullAndEmptyArrays: true } },
          { $lookup: { from: "departments", localField: "Audilog.UserDepartment", foreignField: "_id", as: "Audilog.UserDepartment" } },
          { $unwind: { path: "$Audilog.UserDepartment", preserveNullAndEmptyArrays: true } },
          {
               $addFields:{
                  "Audilog.User" : {$concat:["$Audilog.User.firstname"," ","$Audilog.User.lastname"]},
                  "Audilog.profileimg":"$Audilog.User.profileimg",
                  "Audilog.UserDepartment":"$Audilog.UserDepartment.department"
               }
          },
          {
               $group:{
                  _id:"$_id",
                  "TicketNumber" :{$first:"$TicketNumber"},
                  Audilog:{$push:"$Audilog"},
                  HeadContent:{$first:"$HeadContent"},
                  CreateDate:{$first:"$CreateDate"},
                  "Phone" : {$first:"$Phone"}
               }
          }
        ])
        .toArray()

        ticket[0].CreateDate=moment.tz(ticket[0].CreateDate, 'Asia/Bangkok').format('DD/MM/YYYY HH:mm');
        ticket[0].Audilog.forEach(log => {
          log.ModifyDate = moment.tz(log.ModifyDate, 'Asia/Bangkok').format('DD/MM/YYYY HH:mm');
        });

      console.log(ticket[0]);
      res.status(200).json(ticket[0]);

      } catch (error) {
       
        console.error('Error fetching IP:', error);
        res.status(500).json({ error: error });
      }
  };