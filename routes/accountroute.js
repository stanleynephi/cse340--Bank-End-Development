/**create a route that will access the registration view */
const express = require("express")
const router = express.Router()
/** function to apply error handler from the utility*/
const utilities = require("../utilities/")
/**controller into scope */
const registerController = require("../controllers/accountcotroller")
/**add the registration rules to this route*/
const registrationvalidation = require("../utilities/accountvalidation")


/**create a route that will access the registration view */
// router.get("/register", utilities.handleerrors(registerController.registration))
router.get("/login", utilities.handleerrors(registerController.login))
router.get("/register", utilities.handleerrors(registerController.registration))

/**process the post for the forms */
router.post(
    "/register",
    registrationvalidation.registrationRules(),
    registrationvalidation.checkregistration,
    /**handle the registration process */
    registerController.registrationprocess,
    registerController.registration
)

/**login process this function should take the logi results and verify it*/
router.post(
    "/login",
    (res,req) => {
        res.status(200).send("login process")
    }
)


/**export the router module */
module.exports = router