const bcrypt = require('bcryptjs');


const validateUserInput =(email,password)=>{
    return email && password;
}

const coparePassword = (password,heshedPassword)=>{

    return bcrypt.compareSync(password,heshedPassword)
}

module.exports ={validateUserInput,coparePassword};