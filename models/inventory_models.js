// inventory-model.js document is where we'll write all the functions to interact with the classification and inventory tables of the database, since they are integral to our inventory.
/**start with importing the database folder (require) */
const pool = require("../database")

/**
 * get all the data on the classification
 * using a good old async function to request from the database.
 */

async function getclassificationdata() {
    return await pool.query("select* from public.classification order by classification_name")
}

module.exports = {getclassificationdata}

