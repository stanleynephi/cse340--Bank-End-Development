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

/**build the management view */
async function buildmanagementview (req,res,next){
  try {
    /**build the page no data is been needed */
    const navigations = await utility.getnavigation()
    
    /**render the page */
    res.render("./inventory/management",
      {
        title: "Management",
        navigation: navigations,
      }
    )
  } catch (error) {
    console.log("There is an error building the management view" + error)
    
  }
}

/**build the view for the add to classification */
async function buildaddclassificationview (req,res,next){
  try {
    /**build the view for the classification */
    const navigations = await utility.getnavigation()
    /**render the page */
    res.render("./inventory/add_classification",
      {
        title: "Add Classification",
        navigation: navigations,
        errors: null,
      }
    )
  } catch (error) {
    console.log("There is an error building the add classification view" + error)
    
  }
}


/** function to handle the form submission process */
async function handlesubmission(req, res){
  let navigation = await utility.getnavigation()
  const {classification_name} = req.body
  /**check the validation result and then use the model from the database to insert 
   * the value into it.
   */
  const registerresult = await inventorymodel.insertclassification(
    classification_name
  )

  /**check the result */
  if (registerresult){
    /**redirect to the management view */
    req.flash("notice", "Classification added successfully")
    res.status(201).render(
      "inventory/management",{
        
        title: "Management",
        navigation,
      }
    )
  }else{
    req.flash("notice", "Sorry there was an error processing the classification")
    res.status(501).render(
      "/add_classification",{
        title: "Add Classification",
        navigation,
      }
    )
  }
}

/**build the inventory view */
async function buildinventoryview(req,res,next){
  try {
    /**build the inventory view */
    const navigations = await utility.getnavigation()
    /**get the classification list */
    const classificationlist = await utility.buildclassificationlist()
    /**render the page */
    res.render("./inventory/add_inventory",
      {
        title: "Inventory",
        navigation: navigations,
        classificationlist,
        errors: null,

      }
    )
  } catch (error) {
    console.log("There is an error building the inventory view" + error)
    
  }
}

/**handle the inventory submission */
async function handleinventorysubmission(req,res) {
  let navigation = await utility.getnavigation()
  const {inv_make,inv_model,inv_year,inv_price,inv_miles,inv_color,inv_description,inv_image,inv_thumbnail,classification_id} = req.body

    /**check the validation result and then use the model from the database to insert 
   * the value into it.
   */
  const registerresult = await inventorymodel.addinventory(
    inv_make,inv_model,inv_year,inv_price,inv_miles,inv_color,inv_description,inv_image,inv_thumbnail,classification_id)

  /**check the result */
  if (registerresult){
    /**redirect to inventory view */
    req.flash("notice", "Inventory added successfully")
    res.status(201).render(
      "inventory/management",{
        title: "Management",
        navigation
      }
    )
  } else{
    req.flash("notice", "Sorry there was an error processing the inventory")
    const classificationlist = await utility.buildclassificationlist()
    res.status(501).render(
      "inventory/add_inventory",{
        title: "Add Inventory",
        navigation,
        errors: null,
        classificationlist
      }
    )
  }
}


module.exports = {buildClassificationById,buildcardetailsbyid,
  buildmanagementview,buildaddclassificationview,
  handlesubmission,
buildinventoryview,handleinventorysubmission}