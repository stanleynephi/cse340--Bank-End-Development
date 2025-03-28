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


/**build the grid layout using the data from the database */
async function gridlayout(data){
  /**get the data from the inventory */
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/**build car details layout */
async function cardetails(data){
  if (!data || data.length === 0) {
    return '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  const car = data[0]
    
    return `
    <div class="car-details">
      <img src="${car.inv_image}" alt="Image of ${car.inv_make} ${car.inv_model}" />
      <div class="details">
      <p><strong>Price:</strong> $${car.inv_price.toLocaleString()}</p>
      <p><strong>Year:</strong> ${car.inv_year}</p>
      <p><strong>Color:</strong> ${car.inv_color}</p>
      <p><strong>Milage:</strong> ${car.inv_miles}ml</p>
      <p><strong>Description:</strong> ${car.inv_description}</p>
      </div>
    </div>
  `
}

/**high order function to handle robust errors needed in the code */
/**middleware for handling errors
 * wrap other function in this for 
 * general error handling
 */
const handleerrors = (fn) => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next)


module.exports = {getnavigation,handleerrors,gridlayout,cardetails}