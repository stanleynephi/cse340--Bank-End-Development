/**import the registration form from the utility for our account registration page */
const utility = require("../utilities/")
const accountmodel = require("../models/account_model")
/**add the hashing packages */
const bcrypt = require("bcryptjs")
// const account = {}



/**function to render the login form  to the view*/
async function login (req, res, next){
    try {
        let navigation = await utility.getnavigation()
        let loginforms = await utility.login()
        res.render("registration/login", {
        title: "Login",
        navigation: navigation,
        login: loginforms,
        })
    } catch (error) {
        console.log("Error" + error)
    }
}

/**function to render the registration form to the view*/
async function registration(req,res, next) {
    try{
        let navigation = await utility.getnavigation()
        res.render("registration/registration", {
            title: "Register",
            navigation: navigation,
            errors: null,
        })
    }
    catch(error){
        console.log("Error" + error)
    }
}

/**function to handle the registration form submission and process it*/
async function registrationprocess(req, res) {
    let navigation = await utility.getnavigation()
    const {account_firstname, account_lastname, account_email, account_password} = req.body
    let hashedpassword 
    try{
        /**regular password and cost */
        hashedpassword = await bcrypt.hashSync(account_password, 10)
    }
    catch(error){
        req.flash("notice", "Sorry there was an error processing the registration")
        res.status(501).render("registration/registration", {
            title: "Register",
            navigation,
            errors: null,
        })
    }

    const registrationresult = await accountmodel.registeraccount(
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        /**add the hashed password */
        hashedpassword
    )

    if(registrationresult){
       /**create a flash message to show successful account creation */
       req.flash(
        "notice",
        `Account for ${account_firstname} ${account_lastname} has been created successfully`
       )
       res.status(201).render("account/login", {
        title: "Login",
        navigation,
       })
    }
    else{
        req.flash(
            "notice",
            `Account for ${account_firstname} ${account_lastname} could not be created`
        )
        res.status(501).render("/registration", {
            title: "Registeration",
            navigation
        })
    }
}


/**export the account in the module */
module.exports = {login,registration,registrationprocess}