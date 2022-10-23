const express = require("express")
const routers = require("./routers/index")
const connectDatabase = require("./helper/Database/connectDatabase",{ keepAlive: true, keepAliveInitialDelay: 300000 })
const cutomErrorHandler = require('./middlewares/errors/customErrorHandler')
const path = require("path")
var cors = require('cors')
const app = express()


const dotenv = require("dotenv")
dotenv.config({
    path:"./config/env/config.env"
})

//Expres Body middleware
app.use(express.json())
app.use(cors())


connectDatabase()
const PORT =process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!')
  })



app.use("/api",routers)


//error handle
app.use(cutomErrorHandler)

//Statik dosyaya erişme işlemi
app.use(express.static(path.join(__dirname, "public")))

app.listen(PORT,()=>{
    console.log(`App Started On ${PORT} : ${process.env.NODE_ENV}`)
})