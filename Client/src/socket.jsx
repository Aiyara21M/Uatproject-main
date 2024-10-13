// socket.js
import { io } from 'socket.io-client';

// ปรับปรุง URL นี้ให้ตรงกับที่อยู่ของเซิร์ฟเวอร์ของคุณ

export const socket = io(import.meta.env.VITE_API_SERVER, {
  transports: ['websocket'], // ใช้ transports เป็น 'websocket'
});