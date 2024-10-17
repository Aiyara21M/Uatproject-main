require("dotenv").config();

const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const os = require('os');
const fs = require('fs');
const path = require('path');

exports.UpdateTicket = async (req, res) => {
    try {
        const jsonData = JSON.parse(req.body.jsonData); 
        const {UUID,depart}  =  jsonData
         
        const data = jsonData.id.split('-');
        const type=data[0]
        const id=data[1]
        const dbSearch= type == 'Mer__'? 'worklistmechanical':'worklistcomputer'
       

        let {content}  =  jsonData

        const base64Pattern = /<img src="data:image\/(png|jpeg|jpg|gif|bmp|webp|svg\+xml);base64,([^"]+)"/g;
        const picbase64 = [...content.matchAll(base64Pattern)];
    
        for (let looppic of picbase64) {
          const fileExtension = looppic[1]; 
          const base64Data = looppic[2]; 
          const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
          const filePath = path.join(__dirname, '../Uploads', fileName);
          
          fs.writeFileSync(filePath, base64Data, 'base64');
          content = content.replace(looppic[0], `<img src="http://localhost:4211/uploads/${fileName}"`);
        }
    
        let filename = null;
        if (req.file) {
          filename = req.file.filename;
        }

        
        const ticket = await mongoose.connection.db
        .collection(dbSearch)
        .updateMany(
            { _id: new ObjectId(id) },
            {
                $push: {
                    Audilog: {
                        "detail": "ReplayTicket",
                        "content": content,
                        "User": new ObjectId(UUID),
                        "UserDepartment":new ObjectId(depart),
                        "ModifyDate": new Date(),
                        "filename": filename
                    }
                }
            }
        )
        
        res.status(200).json();
      } catch (error) {
        console.error('Error fetching IP:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึง IP' });
      }
  };