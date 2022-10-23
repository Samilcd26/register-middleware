const express = require("express");
// api

const {getAllQuestions} =require('../controller/question')

const router = express.Router();

router.get("/",getAllQuestions );


module.exports = router;
