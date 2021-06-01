const { Client } = require('pg')
const env = require('../../config.js')
const scraper = require("../main/scraper.js");

let product = []

const client = new Client({
    host: env.host,
    user: env.user,
    database: env.name,
    password: env.pw,
    port: env.port
})

// client.connect()
//
// const testingConncection = () => {
//     const query = `
//     CREATE TABLE products (
//         name varchar,
//         model varchar,
//         price float,
//         retailer varchar,
//         imageURL varchar,
//         productURL varchar,
//         availability varchar,
//         detail JSONB
//
//     )
//     `
//     client.query(query,(err, res) =>{
//         if(err){console.log(err);  return}
//         console.log("created", res);
//         client.end()
//     })
//
// }
//
//  testingConncection()


const getProducts =  async () => {
    product = scraper.scrape();
    product.then((data) =>{
        console.log(data)
    })

}
getProducts()


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