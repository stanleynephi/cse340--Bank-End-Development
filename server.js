/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
/**adding express jsas our view engine add the express js as a required */
const expresslayouts = require("express-ejs-layouts")


/* ***********************
 * view engine and templates
 *************************/
app.set("view engine", "ejs")
app.use(expresslayouts)
app.set("layout", "layouts/layout")


/* ***********************
 * Routes
 ************************/
app.use(static)

/* ***********************
 * Building the index route for the web application
 *************************/
app.get("/", function(req,res){
  res.render("index", {
    title: "Home"
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
