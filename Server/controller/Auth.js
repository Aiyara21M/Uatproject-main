const { expressjwt: webtoken } = require('express-jwt');
require('dotenv').config();

exports.checktoken = webtoken({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth' 
});