/**function to render based on the classification */
/**model to send query to the database based on the classification id */
const inventorymodel = require("../models/inventory_models")
/**utility to get items that will be needed in our classification page */
const utility = require("../utilities/");
// const controls = {}


/**get the data from the database and then console.log 
 * build the classification need using the classification_id
*/
async function buildClassificationById (req,res,next) {
  try {
      /**classification id */
      console.log(req.params)
      if(req.params){
        console.log("params found")
      }
      const classification_id = req.params.classificationId

      /**data using the id as a param */
      const data = await inventorymodel.getclassificationdatabyid(classification_id)
      /**build the grid using the data */
      const grid = await utility.gridlayout(data)
      /**provide the nav */
      let navigation = await utility.getnavigation()
      /**the type of car or an identifier */
      const classname = data[0].classification_name
      /**render the build */
      res.render("./inventory/classification",
          {title:classname + "vehicles",
              navigation: navigation,
              grid: grid,
          }
      )     
  } catch (error) {
    console.log("Error" + error)
  }
    
}

/**function to buildcardetails using the data from the model */
async function buildcardetailsbyid (req,res,next){
  /**since each car image url contains the car id, we need we will 
   * use that as the parameter to get the car details
   */
  try {
    console.log(req.params)
    if(req.params){
      console.log("params found" + req.params)
    }
    const inv_id = req.params.inv_id

    /**get the data from the car based of the id */
    const data = await inventorymodel.getvehicledatabyid(inv_id)
    const details = await utility.cardetails(data)
    let navigation = await utility.getnavigation()
    console.log(data)
    /**build the card details */
    /**render the build */
    res.render("./inventory/cardetails",
      {
        title: "Vehicles details",
        navigation: navigation,
        details: details
      }
    )
    
  } catch (error) {
    console.log("There is an error building the car details" + error)
  }
}

module.exports = {buildClassificationById,buildcardetailsbyid}