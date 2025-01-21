const express = require('express')
const dotenv = require('dotenv').config();
const connectDb = require('./dbConnection')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
connectDb();


//middlewares : 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : false}))


app.use('/' , require('./Routes/authRoutes'))

//listening port : 
const PORT = process.env.PORT || 4500 ;
app.listen(PORT , () =>{
  console.log(`Server is Succesfully runnning on the port : ${PORT}`);
})
