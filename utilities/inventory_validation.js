/**create and inventory validation using express validator */
const { body, validationResult } = require("express-validator")
const utilities = require("./index")
const inventorymodel = require("../models/inventory_models")


/**function to validate the data from the inventory form */
function classificationrules(){
    return [
        body("classification_name")
        .trim()
        .isLength({min: 2})
        .withMessage("Please enter a classification name with at least 2 characters")
    ]
}

/**function to check addition */
async function checkaddition(req, res, next) {
    const { classification_name } = req.body
    /**check the validation result */
    let errors = []
    errors = validationResult(req)
    /**check if there are errors */
    if (!errors.isEmpty()){
        let navigation = await utilities.getnavigation()
        /**render the add classification page */
        res.render("inventory/add_classification",{
            errors,
            title: "Add Classification",
            navigation,
            classification_name,
        })

        return
    }
}


module.exports = { classificationrules, checkaddition}