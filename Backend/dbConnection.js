const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDb = async () => {
  try {
   const mongoDbConnection =  await mongoose.connect(process.env.MONGO_CONNECT);
    console.log(`Database connected Succesfully ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Database Connection Error :  ${error}`);
  }
};

module.exports = connectDb;
