const express = require('express')
const consign = require('consign')
const cors = require("cors")
 
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

module.exports = () => {
 const app = express()
 
 app.use(express.json())
 app.use(cors({
   origin: ["http://localhost:3000"],
   methods: ["GET", "POST"],
   credentials: true
 }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))

app.use(
  session({
    key: "userId",
    secret: "subiscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    }
  })
)
 
 consign()
   .include('controllers')
   .into(app)
 
 return app
}