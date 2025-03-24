/** using the node-postgress to establish a connection with our database 
 * start with an new instance using the require method.
 * require the dotenv.config() to configure the .env
*/
/**this file is used to establish a connection with our database for both development and production environments.*/

const { query } = require("express")
const { Pool } = require("pg")
require("dotenv").config()



/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */

/**local pool variable */
let pool

/** test the process to see if it is in developement or remote production */
if(process.env.NODE_ENV == "development") {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    })


    /**added for troubleshooting queries during development */
    module.exports = {
        async query(text,param){
            try{
                const response = await pool.query(text,param)
                console.log(response)
                return response
            }

            catch (error){
                console.log("error is found in the query sent to the database", {text})
                throw error
            }
        }
    }
}
else{
    /**establish a connection with the database */
    pool = new Pool({
        connectionString: process.env.DATABASE_URL
    })
    module.exports = pool
}


