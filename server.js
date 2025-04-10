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
const expresslayouts = require("express-ejs-layouts")
const basecontroller = require("./controllers/basecontroller")
const utilities = require("./utilities/")
const inventory = require("./routes/inventoryRoute")
const account = require("./routes/accountroute")
const session = require("express-session")
const flash = require("connect-flash")
const pool = require("./database")
const pgSession = require("connect-pg-simple")(session)
const messages = require("express-messages")
const bodyparser = require("body-parser")



/* ***********************
 * view engine and templates
 *************************/
app.set("view engine", "ejs")
app.use(expresslayouts)
app.set("layout", "layouts/layout")



/**creates an new session to be stored in the database*/
app.use(session({
  /**create a place to store the session */
  store: new pgSession({
    /**create a table in the database to contain the session if one is not available */
    createTableIfMissing: true,
    /**where the table should be created */
    pool: pool,
  }),
  /**secret is a name value pair that will be used to protect the session */
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: "sessionid",
}))


/**expess messages middleware */
app.use(flash())
app.use(function(req,res,next){
  res.locals.message = messages(req,res)
  next()
})

/**add the body parser as middleware */
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))



/* ***********************
 * Routes
 ************************/
/**index route */
app.use(static)

/* ***********************
 * Building the index route for the web application
  * added an error handler to handle the anticipated errors in the code
 *************************/
app.get("/",utilities.handleerrors(basecontroller.buildhome))

/**add the route for the inventoryRoutes */
app.use("/inv", inventory)
/**add the route for the form registration */
app.use("/account", account)


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
