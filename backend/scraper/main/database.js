const { Client } = require('pg')
const env = require('../../config.js')

let product = []

const client = new Client({
    host: env.host,
    user: env.user,
    database: env.name,
    password: env.pw,
    port: env.port
})


client.connect()
client.end()
const testingConncection = () => {
    const query = `
    CREATE TABLE products (
        
    )
    `
}

// (getProducts = async () => {
//     await product = scraper.scrape()
//
// })()

/**
 * This function populates the db with products scraped
 * @param products array from the scrape function
 */
// const addProducts = (products) => {
//     let insertQuery = `INSERT INTO products(name,model,price,availability,retailer,url,image)
//                         VALUES(products.title, products.model, products.price, products.availability, products.retailer, products.url, products.image )`
//     client.query(insertQuery, (err, res) =>{
//
//     })
// }