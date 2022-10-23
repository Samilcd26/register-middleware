const CustomError = require("../../helper/error/CustomError")
const jwt = require("jsonwebtoken")
const {isTokenIncluded,getAccessTokenFromHeader} = require("../../helper/autorization/tokenHelpers")


const getAccessToRoute = (req,res,next) =>{
    //Token
    const{JWT_SECRET_key} = process.env

    
    
    
    if(!isTokenIncluded(req)){
        return next(new CustomError("token yok",401))
    }

    const accessToken = getAccessTokenFromHeader(req)

    
    jwt.verify(accessToken,JWT_SECRET_key,(err,decoded)=>{
        
        if(err){
            return next(new CustomError("Token Tarihi Geçti",401))
        }
        

        req.user = {
            id : decoded.id,
            name:decoded.name
        }
        next()
    })
    
}

module.exports = {
    getAccessToRoute
}