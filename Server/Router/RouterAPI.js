const fs = require('fs');
const express = require('express');
const router = express.Router();
const upload = require('./uploadConfig');
const { login, getProfile } = require('../controller/DataUser');
const { createdticket } = require('../controller/DataInsert');
const { checktoken } = require('../controller/Auth');
const { GetIP } = require('../controller/GetIP');
const { GetTicket, GetTicketID } = require('../controller/GetTicket');
const { UpdateTicket } = require('../controller/UpdateTicket');





// เส้นทางการทำงาน
router.post('/user', login);
router.post('/getprofile', checktoken, getProfile);
router.post('/createdticket', checktoken, upload.single('filefolder'), createdticket);
router.get('/ip', GetIP);
router.post('/ticket',checktoken, GetTicket);
router.post('/getTicket',checktoken, GetTicketID);
router.post('/UpdateTicket',checktoken,upload.single('filefolder'), UpdateTicket);
module.exports = router;
