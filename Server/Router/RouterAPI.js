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
const { GetDepartments, getLogDepart,getDepartEdit } = require('../controller/GetValue');





// เส้นทางการทำงาน
router.post('/user', login);
router.post('/getprofile', checktoken, getProfile);
router.post('/createdticket', checktoken, upload.single('filefolder'), createdticket);
router.get('/ip', GetIP);
router.post('/ticket',checktoken, GetTicket);
router.post('/getTicket',checktoken, GetTicketID);
router.post('/UpdateTicket',checktoken,upload.single('filefolder'), UpdateTicket);
router.get('/getDepartments',checktoken, GetDepartments);
router.post('/getLogDepart',checktoken, getLogDepart);
router.post('/getDepartEdit',checktoken, getDepartEdit);


module.exports = router;
