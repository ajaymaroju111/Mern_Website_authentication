const User = require('../models/User')
const {hashPassword , comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

//test logic : 
const test = (req , res) =>{
  req.json("Testing is Working");
}
//registration Logic : 
const registerUser = async (req,res) =>{
  try {
    const {fullname , email , password } = req.body;
    //check name is entered or not : 
    if(!fullname){
      return res.json({
        error : "fullname is Required"
      })
    };
    //check for the password : 
    if(!password || password.length < 6){
      res.json({
        error : "password should be required and should be atleast 6 chareacters"
      })
    };
    //check for the email : 
    if(!email){
      res.json({
        error : "Email is mandatory"
      })
    };

    //check weather the mail exist or not : 
    const exist = await User.findOne({email});
    if(exist){
      return res.json({
        error : "Email is already taken"
      })
    }

    //Hash the imcommimg password : 
    const hashedPassword = await hashPassword(password)


    //create a user  : 
    const user = await User.create({
      fullname,
      email,
      password : hashedPassword,
      
    })
    return res.json(user);
  } catch (error) {
    console.log(`error in registration od user ${error}`);
  }
}

//login logic : 
const LoginUser = async (req, res) =>{
  try {
    const {email , password} = req.body;
    //check if the user exist or not  : 
    const user = await User.findOne({email})
    if(!user){
      return res.json({
        error : "No user found ! .. please Register"
      })
    }
    //check weathee the password matched or not : 
    const match = await comparePassword(password , user.password)
    if(match){
      jwt.sign({email: user.email , id: user._id, fullname: user.fullname},process.env.JWT_SECRET , {} , (err , token) =>{
        if(err) throw err;
        res.cookie('token' , token).json(user)
      })

    }
    if(!match){
      res.json({
        error : "password does not match"
      })
    }

  } catch (error) {
    console.log(error)
  }
}

const getProfile =(req , res) =>{
  const {token} = req.cookies;
  if(token){
    jwt.verify(token,process.env.JWT_SECRET,{},(err , user) =>{
      if(err) throw err;
      res.json(user)
    })
  }else{
    res.json(null)
  }
}

module.exports = {
  test , registerUser , LoginUser , getProfile
}