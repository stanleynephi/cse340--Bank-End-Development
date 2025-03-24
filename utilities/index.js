const invmodel = require("../models/inventory_models")


/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
async function getnavigation(res,req,next) {
    let data = await invmodel.getclassificationdata()
    let list = "<ul>"
    list += "<li><a href='/' title='home page'>Home</a></li>"
    data.rows.forEach((row) => {
        list+= "<li>"
        list+= '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
      list+= "</li>"
    })

    list += "</ul>"
    return list
}

/**high order function to handle robust errors needed in the code */
/**middleware for handling errors
 * wrap other function in this for 
 * general error handling
 */
const handleerrors = (fn) => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next)


module.exports = {getnavigation,handleerrors}