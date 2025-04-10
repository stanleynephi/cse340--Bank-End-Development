/**this controller works with the account model to handle account registration
 * and logins
 */

/** require the database pool and establish a connection with the database */
const pool = require("../database")

/**function to insert registration form values into the database */
async function registeraccount(account_firstname,account_lastname,account_email,account_password){
    try{
        const sql = `insert into public.account (account_firstname,account_lastname,account_email,account_password) VALUES ($1,$2,$3,$4) RETURNING *`
        const value = [account_firstname,account_lastname,account_email,account_password]
        console.log("Query Values:", value);
        const result = await pool.query(sql,value)
        console.log("Inserted successfully" + result)
        return result.rows[0]
    }
    catch(error){
        console.log("Error" + error)
        return error.message
    }
}

/**function to check if email exists already 
 * export and apply function to the registration form
*/
async function checkemail(account_email){
    try{
        const sql = `SELECT * FROM public.account WHERE account_email = $1`
        const existingemail = await pool.query(sql,[account_email])
        return existingemail.rowCount
    }
    catch(error){
        return error.message
    }
}


module.exports = {registeraccount,checkemail}