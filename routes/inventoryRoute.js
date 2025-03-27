/** build the inventory route using the express.js router system */
/** bring into scope the express js and the router object as well */
const express = require("express")
/** create a new router instance */
const router = new express.Router()


/**controller into scope */
const controller = require("../controllers/inventorycontroller")

/**use the router.get to get the build classificationbyid method */
router.get("/type/:classificationId",controller.buildClassificationById)
    
/**export the module */
module.exports = router