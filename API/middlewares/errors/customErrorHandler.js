const CustomError = require("../../helper/error/CustomError");

const cutomErrorHandler = (err,req,res,next)=>{
    
    let cutomerEror = err;

    if(err.name==="SyntaxError"){
        cutomerEror=new CustomError("Unexpected Syntax",400)
    }
    if(err.name==="ValidationError"){
        cutomerEror=new CustomError(err.message,400)
    }
    if(err.name===11000){
        cutomerEror=new CustomError("Duplicate key Found:check your ınput",400)
    }
    console.log(cutomerEror.message,cutomerEror.status);

    res
    .status(400)
    .json({
        success: false
    })
} 

module.exports = cutomErrorHandler;