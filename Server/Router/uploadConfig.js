// uploadConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ตรวจสอบว่ามีโฟลเดอร์ Uploads อยู่หรือไม่ หากไม่มีให้สร้างขึ้น
const uploadDir = './Uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ตั้งค่า storage ของ multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Uploads'); // โฟลเดอร์สำหรับเก็บไฟล์ที่อัปโหลด
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // ตั้งชื่อไฟล์ไม่ให้ซ้ำกัน
  },
});

// สร้างและส่งออกตัวแปร upload ด้วยการตั้งค่า storage
const upload = multer({ storage: storage });

module.exports = upload;
