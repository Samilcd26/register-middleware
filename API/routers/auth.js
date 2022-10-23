const express = require("express")
const {register,getUser,login,logout,imageUpload,forgetpassword,resetpassword} =require("../controller/auth")
const {getAccessToRoute} = require("../middlewares/autorization/auth")
const ProfileImageUpload = require("../middlewares/libraries/profileImageUpload")
const router = express.Router()


/// api/auth/register
router.post("/register",register)
router.post("/login",login)
router.post("/logout",getAccessToRoute,logout)
router.post("/upload",[getAccessToRoute,ProfileImageUpload.single("profile_image")],imageUpload)
router.post("/forgetpassword",forgetpassword)
router.put("/newpassword",resetpassword)


router.get("/profile",getAccessToRoute,getUser)




module.exports=router;