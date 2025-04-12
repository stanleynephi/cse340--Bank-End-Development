// inventory-model.js document is where we'll write all the functions to interact with the classification and inventory tables of the database, since they are integral to our inventory.
/**start with importing the database folder (require) */
const pool = require("../database")

/**
 * get all the data on the classification
 * using a good old async function to request from the database.
 */

async function getclassificationdata() {
    return await pool.query("select* from public.classification order by classification_id")
}

/**create a function to query the database based on the classification_id */

async function getclassificationdatabyid(classification_id){
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i 
            JOIN public.classification AS c 
            ON i.classification_id = c.classification_id 
            WHERE i.classification_id = $1`
      , [classification_id]
        )
        return data.rows;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getvehicledatabyid(inv_id){
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory
            WHERE inv_id = $1`
      , [inv_id]
        )
        return data.rows;

    } catch (error) {
        console.log(error);
        throw error;
    }
    
}


/**function to insert classification name into the database */
async function insertclassification(classification_name){
    try{
        const sql = `insert into public.classification (classification_name) VALUES ($1) RETURNING *`
        const value = [classification_name]
        const result = await pool.query(sql,value)
        return result.rows[0]   
    }
    catch(error){
        console.log("Error" + error)
        return error.message
    }
}

/** function to find the classification type in the database */
async function findOne(classification_name){
    try{
        const sql = `SELECT * FROM public.classification WHERE classification_name = $1`
        const existingclassification = await pool.query(sql,[classification_name])
        return existingclassification.rowCount
    }
    catch(error){
        return error.message
    }
}

/** function to add inventory items to the inventory in the database */
/** function to add inventory items to the inventory in the database */
async function addinventory(inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color, inv_description, inv_image, inv_thumbnail, classification_id) {
    try {
        const sql = `
            INSERT INTO public.inventory(
                inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color, inv_description, inv_image, inv_thumbnail, classification_id
            )
            VALUES(
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
            )
        `
        const values = [
            inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color,
            inv_description, inv_image, inv_thumbnail, classification_id
        ]
        const result = await pool.query(sql, values)
        return result.rows[0]
    } catch (error) {
        console.log("Error adding inventory: " + error)
    }
}


module.exports = {getclassificationdata,getclassificationdatabyid,getvehicledatabyid,
    insertclassification,findOne,
    addinventory}

