const express = require('express');
const mongoose = require('mongoose'); 
const morgan = require('morgan'); 
const cors = require('cors')
const http = require('http');
const UserRoute = require('./Router/RouterAPI')
const path = require('path');
const socketRouter = require('./Router/SocketIO');
const connectdb = require("./connectdb");
// เชื่อมต่อกับฐานข้อมูล
connectdb();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'], 
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.json({ limit: '40mb' }));
app.use(express.urlencoded({ limit: '40mb', extended: true }));
// ใช้ Socket.IO โดยตรงที่นี่
const server = http.createServer(app);
socketRouter(server);



// เปิดให้เรียกใช้งานรูปภาพ
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));


app.get('/', async (req, res) => {
  return res.status(200).json({success: true})
});

app.use('/api',UserRoute);


server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
// ปิดการเชื่อมต่อเมื่อไม่ต้องการใช้งาน
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected');
    process.exit(0);
  });
});
