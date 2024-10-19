
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");



exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const docs = await mongoose.connection.db
      .collection("employees")
      .aggregate([
        {
          $match: {
            $and: [
              { Username: { $in: [username] } },
              { Password: { $in: [password] } }, 
            ],
          },
        },
        { $lookup: { from: "profiles", localField: "Profile", foreignField: "_id", as: "Profile" } },
        { $unwind: { path: "$Profile" } },
      ])
      .toArray()
      
    if (docs.length) {
        const token = jwt.sign({ id: username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      })

      const userData = docs.map(doc => ({
        UUID:doc._id,
        Profileimg:doc.Profile.profileimg,
        departments:doc.Department,
        token
      }))

      res.status(200).json(userData[0])

    } else {
      res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({
      success: false,
      message: "Error during aggregation",
      error: error.message,
    });
  }
};


exports.getProfile = async (req, res) => {
  const { UUID } = req.body; 
  try {
    const docs = await mongoose.connection.db
      .collection("employees")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(UUID) // Use 'new' keyword here
          },
        },
        { $lookup: { from: "profiles", localField: "Profile", foreignField: "_id", as: "profiles" } },
        { $unwind: { path: "$profiles", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "title", localField: "profiles.Title", foreignField: "_id", as: "title" } },
        { $unwind: { path: "$title", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "sex", localField: "profiles.Sex", foreignField: "_id", as: "sex" } },
        { $unwind: { path: "$sex", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "departments", localField: "Department", foreignField: "_id", as: "departments" } },
        { $unwind: { path: "$departments", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "positions", localField: "Position", foreignField: "_id", as: "positions" } },
        { $unwind: { path: "$positions", preserveNullAndEmptyArrays: true } },
        { $lookup: { from: "statusworks", localField: "Statuswork", foreignField: "_id", as: "statusworks" } },
        { $unwind: { path: "$statusworks", preserveNullAndEmptyArrays: true } },
      {
         $project:{
         "title":"$title.title",
        "firstname":"$profiles.firstname",
        "lastname":"$profiles.lastname",
        "sex":"$sex.sex",
        "position":"$positions.position",
        "departments":"$departments.department",
        "createdAt":"$createdAt",
        "address":"$profiles.address",
        "district":"$profiles.district",
        "subdistrict":"$profiles.subdistrict",
        "village":"$profiles.village",
        "road":"$profiles.road",
        "county":"$profiles.county",
        "postalCode":"$profiles.postalCode",
        "status":"$statusworks.status",
        "birthdate":"$profiles.birthdate",
        "CodeID":"$profiles.CodeID",
        "profileimg":"$profiles.profileimg",
     }
 }
      ])
      .toArray()

    if (docs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No profile found",
      })
    }

    res.status(200).json(docs[0]);

  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({
      success: false,
      message: "Error during aggregation",
      error: error.message,
    });
  }
}





