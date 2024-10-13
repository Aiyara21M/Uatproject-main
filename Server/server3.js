const express = require("express");
const morgan = require('morgan'); 
const cors = require('cors')
const connectdb = require('./connect')
const UserRoute = require("./Router/RouterAPI");
// ตรวจสอบให้แน่ใจว่ามีการ import 
require('dotenv').config();


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.get('/',async (req,res)=>{
    try {
        res.status(200).json({number:process.env.PORT});
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
      }
    
});

app.use('/api',UserRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
