/**location where all the logic for the application is stored. */
const utilities = require("../utilities")
const basecontroller = {}

basecontroller.buildhome = async function (req,res){
    const navigation = await utilities.getnavigation()
    res.render("index",{title: "Home",navigation})
}

module.exports = basecontroller