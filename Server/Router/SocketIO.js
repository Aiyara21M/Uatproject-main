const socketIo = require('socket.io');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb'); // อย่าลืม import ObjectId

module.exports = function (server) {
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173', // URL ของไคลเอนต์ React ของคุณ
      methods: ['GET', 'POST'],
    },
  });



  io.on('connection', (socket) => {

    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });


    socket.on('Putdata', async (data) => {

      
      socket.emit('Getalert', { success: true, count: docs.length });
    });
    




  });
};






async function getAlert(UUID, socket) {
    try {
       
        const docs = await mongoose.connection.db
            .collection("alertmechanical")
            .aggregate([
                {
                    $match: {
                        EmployeeId: new ObjectId(UUID),
                        Read: false
                    }
                }
            ])
            .toArray();      
       
        console.log(`Number of alerts: ${docs.length}`);
        socket.emit('Getalert', { success: true, count: docs.length });

    } catch (error) {
    
        console.error("Aggregation error:", error);
        socket.emit('Getalert', {
            success: false,
            message: "Error during aggregation",
            error: error.message,
        });
    }
}