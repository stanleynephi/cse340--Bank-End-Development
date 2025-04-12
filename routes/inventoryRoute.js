/** build the inventory route using the express.js router system */
/** bring into scope the express js and the router object as well */
const express = require("express")
/** create a new router instance */
const router = new express.Router()
/**applying the error handler to the route */
const utilities = require("../utilities/")
/**import the validation for the inventory*/
const classificationvalidation = require("../utilities/inventory_validation")


/**controller into scope */
const controller = require("../controllers/inventorycontroller")
const { route } = require("./accountroute")

/**use the router.get to get the build classificationbyid method */
router.get("/type/:classificationId",utilities.handleerrors(controller.buildClassificationById))
router.get("/detail/:inv_id",utilities.handleerrors(controller.buildcardetailsbyid))


// /**route to the management page and the add to classification page*/
// router.get("/management",utilities.handleerrors(controller.buildmanagementview))
// router.get("/add_classification",controller.buildaddclassificationview)
// router.get("/add_inventory",utilities.handleerrors(controller.buildinventoryview))
/**build the add_classifiacation route */
router.get("/management",utilities.handleerrors(controller.buildmanagementview))
router.get("/addinventory",utilities.handleerrors(controller.buildinventoryview))
router.get("/addclassification",utilities.handleerrors(controller.buildaddclassificationview))

/**create a route post to process the data from the form */
router.post(
    "/addclassification",
    /**validation rules */
    classificationvalidation.classificationrules(),
    /**check the validation */
    classificationvalidation.checkaddition,
    /**handle the addition */
    controller.handlesubmission
)

/**create a route post for the inventory form */
router.post(
    "/addinventory",
    /**validation rules */
    classificationvalidation.addtoinventoryrules(),
    /**check the validation */
    classificationvalidation.checkinventory,
    /**handle the addition */
    controller.handleinventorysubmission
)
    
/**export the module */
module.exports = router