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
        .custom(async(classification_name) => {
            const existingClassification = await inventorymodel.findOne(classification_name)
            if(existingClassification){
                throw new Error("Classification already exists")
            }
        })
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

    next()
}


/**check rules for the add_inventory rules */
function addtoinventoryrules() {
    /**an array to set rules for each of the arrays */
    return [
        body("inv_make")
        .trim()
        .isLength({min: 2})
        .withMessage("Please enter a make with at least 2 characters"),
        body("inv_model")
        .trim()
        .isLength({min: 2})
        .withMessage("Please enter a model with at least 2 characters"),
        body("inv_year")
        .trim()
        .isNumeric()
        .withMessage("Please enter a valid year")
        .isLength({max: 4}),
        body("inv_description")
        .trim()
        .isLength({min: 2})
        .withMessage("Please enter a description with at least 2 characters"),
        body("inv_miles")
        .trim()
        .isNumeric()
        .withMessage("Please enter a valid number of miles"),
        body("inv_price")
        .trim()
        .isNumeric()
        .withMessage("Please enter a valid price"),
        body("inv_color")
        .trim()
        .isLength({min: 2})
        .withMessage("Please enter a color with at least 2 characters")
    ]
}

/**check data and return error or continue to register inventory*/
async function checkinventory(req,res,next) {
    const {inv_make,inv_model,inv_year,inv_price,inv_miles,inv_color,inv_description} = req.body
    /**check the validation result */
    let errors = []
    errors = validationResult(req)
    /**check if there are errors */
    if(!errors.isEmpty()){
        let navigation = await utilities.getnavigation()
        res.render("inventory/add_inventory", {
            errors,
            title: "Add Inventory",
            navigation,
            inv_make,
            inv_model,
            inv_year,
            inv_price,
            inv_miles,
            inv_color,
            inv_description
        })
        return
    }

    next()
}


module.exports = { classificationrules, checkaddition,
    addtoinventoryrules, checkinventory
}