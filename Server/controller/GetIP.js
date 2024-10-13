require("dotenv").config();
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const os = require('os');

exports.GetIP = async (req, res) => {
    try {
        const clientIp = req.ip || req.connection.remoteAddress;
    
        // แปลงเป็น IPv4 ถ้าต้องการ
        const ipv4 = clientIp.includes('::ffff:') ? clientIp.replace('::ffff:', '') : clientIp;
    
        res.json({ ip: ipv4 });
      } catch (error) {
        console.error('Error fetching IP:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึง IP' });
      }
  };