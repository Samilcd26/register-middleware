const User = require("../models/User");
const CustomError = require("../helper/error/CustomError");
const asyncErrorWropper = require("express-async-handler");
const { sendJwtToClient } = require("../helper/autorization/tokenHelpers");
const {
  validateUserInput,
  coparePassword,
} = require("../helper/input/inputHelpers");
const nodemailer = require("nodemailer");
const sendEmail = require("../helper/libraries/sendEmail")


const register = asyncErrorWropper(async (req, res, next) => {
  //Post Data

  const { name, email, password, role } = req.body;

  const NewUser = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(NewUser, res);
});

const login = asyncErrorWropper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password)) {
    return next(new CustomError("inputları kontrol et", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!coparePassword(password, user.password)) {
    return next(new CustomError("giriş hatalı", 400));
  }

  sendJwtToClient(user, res);
});

const logout = asyncErrorWropper(async (req, res, next) => {
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie({
      httpOnly: true,
      exprires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "logout success",
    });
});

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};

const imageUpload = asyncErrorWropper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      "profile_image": req.saveProfileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );
    
  res.status(200).json({
    success: true,
    message: "image upload successfully",
    data: user,
  });
});


const forgetpassword = asyncErrorWropper(async (req, res, next) => {
  const resetEmail = req.body.email;
  
  const user = await User.findOne({ "email": resetEmail });
  
  if (!user) {
    return next(new CustomError("email ve isim kontrol et", 400))
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
  const resetPasswordToken = user.getResetPasswordTokenFromUser();
  
  await user.save()

  const resetPasswordUrl = "http://localhost:3000/newpassword?resetPasswordToken=" + resetPasswordToken

  const emailTampate =`
  <h3>Reset Your Password</h3>
  <p>This <a href='${resetPasswordUrl}'  target='_blank'> will expire in 1 hourse</p>`

  
   try {
    await transporter.sendMail({
         from: process.env.SMTP_USER,
         to : resetEmail,
         subject: "Reset Your pass",
         text: "Hello world?",
         html: emailTampate,
       })
       
      res.status.json({
         success: true,
         message: "token send to your email",
       })
  } catch (error) {
    
   
     
    await user.save()
    return next(new CustomError("Email kontrolet",500))
   }

  
})

const resetpassword =asyncErrorWropper(async (req, res, next) => {

  const {resetPasswordToken} = req.query
  const {password} = req.body

  
  if(!resetPasswordToken){
    return next(new CustomError("Email güncelleme tokeni gelmedi",400)) 
  }

  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken
  })


  console.log(resetPasswordToken);

  

  if(!user){
    return next(new CustomError("Token tarihi geçmiş ya da mevcut değil",400)) 
  }
  user.password= password
  user.resetPasswordToken=undefined
  user.resetPasswordExpires=undefined

  await user.save()

  return res.status(200).json({
    success: true,
    message: "password reset successfully",
  })
})

module.exports = {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgetpassword,
  resetpassword,

};
