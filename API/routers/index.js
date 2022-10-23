const express = require("express")
const question = require("./question")
const auth = require("./auth")


//localhost/api


const router =express.Router()


router.use("/question",question)
router.use("/auth",auth)


module.exports=router;