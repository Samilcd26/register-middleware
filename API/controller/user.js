const User = require('../models/User')
const asyncErrorWropper = require("express-async-handler");
const CustomError = require("../helper/error/CustomError");

const getSingleUser = asyncErrorWropper(async (req, res, next) => {
    const id = req.params
    const user = await User.findById(id);

    if(!user){
        return next(new CustomError("There is no such user",400))
    }

    return res.status(200).json({
        success: true,
        data:user
    })
})

module.exports = {
    getSingleUser
}
