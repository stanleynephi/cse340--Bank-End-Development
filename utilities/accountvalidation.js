/**require the utility and then express validator and then create a validate object */
const utilities = require("./index")
const { validationResult,body } = require("express-validator")
const emailvalidation = require("../models/account_model")
// const  validate = {}


/**function to return an array of rules to be used when checking the incoming data
 * each rule focus on specific field from the registration form
 * the rules are defined using the express validator
 */
function registrationRules( ){
    /**an array for each of the body of the input. rules to guide what to expect */
    return [
        body("account_firstname")
        .trim()
        .isLength({min: 2})
        .withMessage("Please enter a first name with at least 2 characters"),
        body("account_lastname")
        .trim()
        .isLength({min: 2})
        .withMessage("Please enter a last name with at least 2 characters"),
        body("account_email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address")
        /**a custom rule to check for existing emaail address in the database. */
        .custom(async(account_email) =>{
            const existingUser = await emailvalidation.checkemail(account_email)
            if(existingUser){
                throw new Error("Email already exists")
            }
        }),
        body("account_username")
        .trim()
        .isLength({min: 2})
        .withMessage("Please enter a username with at least 2 characters")
        ,
        body("account_password")
        .trim()
        .isLength({min: 12})
        .withMessage("Password does not meet requirements")
        .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
    ]
    
}



/**check data and return error or continue to register */
async function checkregistration(req,res,next){
    const {account_firstname,account_lastname,account_email,account_username,account_password} = req.body
    /**check the validation result */
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        let navigation = await utilities.getnavigation()
        res.render("registration/registration", {
            errors,
            title: "Registration",
            navigation,
            account_firstname,
            account_lastname,
            account_email,
            account_username,
            account_password            
        })

        return
    }

    next()
}


module.exports = {registrationRules,checkregistration}