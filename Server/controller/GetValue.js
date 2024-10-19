require("dotenv").config();
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const os = require('os');
const moment = require('moment-timezone');


  exports.GetDepartments = async (req, res) => {
    try {
  
        const Department = await mongoose.connection.db
        .collection("departments")
        .aggregate([
            { $lookup: { from: "profiles", localField: "createUser", foreignField: "employeeid", as: "createUser" } },
            { $unwind: { path: "$createUser", preserveNullAndEmptyArrays: true } },
           {
               $addFields:{
                   createUser:{$concat:["$createUser.firstname"," ","$createUser.lastname"]}
               }
           },
           {
            $project:{
                _id:1,
                department:1,
                createUser:1,

            }
           }
        ])
        .toArray()

        Department.forEach(Department => {
            Department.createdAt = moment.tz(Department.createdAt, 'Asia/Bangkok').format('DD/MM/YYYY HH:mm');
          });
      console.log(Department);
      res.status(200).json(Department);

      } catch (error) {
       
        console.error('Error fetching IP:', error);
        res.status(500).json({ error: error });
      }
  };

  exports.getLogDepart = async (req, res) => {
    try {
        const id= req.body 
        const LogDepart = await mongoose.connection.db
        .collection("departments")
        .aggregate([
            {
                $match:{
                    "_id" :new ObjectId(id)
                } 
             },
                { $unwind: { path: "$log", preserveNullAndEmptyArrays: true } },
                 { $lookup: { from: "profiles", localField: "log.User", foreignField: "employeeid", as: "User" } },
                    { $unwind: { path: "$User", preserveNullAndEmptyArrays: true } },
                    {
                       $sort:{
                       "log.modifieddate": -1   
                       } 
                    },
                    {
                        $project:{
                            name : {$concat:["$User.firstname"," ","$User.lastname"]},
                             modifieddate:"$log.modifieddate",
                             value:"$log.department",
                        }
                    },
        ])
        .toArray()
        LogDepart.forEach(log => {
            log.modifieddate = moment.tz(log.modifieddate, 'Asia/Bangkok').format('DD/MM/YYYY HH:mm');
          });
      console.log(LogDepart);
      res.status(200).json(LogDepart);
      } catch (error) {
        console.error('Error fetching IP:', error);
        res.status(500).json({ error: error });
      }
  };


  exports.getDepartEdit = async (req, res) => {
    try {
        const id= req.body
        const DepartmentData = await mongoose.connection.db
        .collection("departments")
        .aggregate([
            {
                $match:{
                    "_id" :new ObjectId(id)
                } 
             },
             {
                $project:{
                    _id:1,
                    department:1,
                }
             }
        ])
        .toArray()

      res.status(200).json(DepartmentData[0]);

      } catch (error) {
        console.error('Error fetching IP:', error);
        res.status(500).json({ error: error });
      }
  };