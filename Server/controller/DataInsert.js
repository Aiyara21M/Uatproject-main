require("dotenv").config();
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

exports.createdticket = async (req, res) => {
  try {
    const jsonData = JSON.parse(req.body.jsonData); 
    const { HeadContent, Phone, action, Type,UUID,depart } = jsonData;
    let { content } = jsonData;

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
    

    const getTicketNum = async (nameTicket) => {
      try {
        console.log(`Attempting to find and update sequence for: ${nameTicket}`);
        const sequenceDocument = await mongoose.connection.db
          .collection('TicketCounts')
          .findOneAndUpdate(
            { _id: nameTicket },
            { $inc: { Ticket: 1 } }, 
            {
              returnDocument: 'after', 
              upsert: true  
            }
          );
          return sequenceDocument;
    
      } catch (error) {
        console.error('Error in getNextSequenceValue:', error);
        throw error;
      }
    };
    
    
    const {Ticket} = Type === `Mechanical`? await getTicketNum('ticket_number_Mechanical'):await getTicketNum('ticket_number_computer')
    baseinsert = Type === `Mechanical`?`worklistmechanical`:`worklistcomputer`
  
      const docs = await mongoose.connection.db
      .collection(baseinsert)
      .insertOne({
        TicketNumber:Ticket,
        HeadContent:HeadContent,
        User:new ObjectId(UUID),
        UserDepartment:new ObjectId(depart),
        content:content,
        Phone:Phone,
        action:action,
        filename:filename,
        Audilog:[{
          detail :"CreateTicket",
          content:content,
          User:new ObjectId(UUID),
          ModifyDate:new Date()
        }],
        CreateDate:new Date()
      })
     
    res.status(200).json({
      success: true,
      message: 'File and data uploaded successfully',
    })
    

  } catch (error) {
    // console.error('Error processing request:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

