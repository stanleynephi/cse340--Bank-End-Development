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
const basecontroller = require("./controllers/basecontroller")
const utilities = require("./utilities/")


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
  * added an error handler to handle the anticipated errors in the code
 *************************/
app.get("/",utilities.handleerrors(basecontroller.buildhome))

/** adding the 404 routes to this code */
app.use(async(req,res,next) => {
  next({status: 404, message: "Sorry I do not know that page"})
})

/** error handler using the built in express js error handler 
 * this is placed after all the middleware else the application can end up breaking.
 * the built in error handler uses an arrow function.
*/
app.use(async(err,req,res,next)=> {
  let navigation = await utilities.getnavigation()
  console.log(`Error at: "${req.originalURL}": "${err.message}"`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/errors",{
    title: err.status || "Server Error",
    message: err.message,
    navigation
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
