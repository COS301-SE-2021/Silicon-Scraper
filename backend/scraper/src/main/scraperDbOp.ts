import {Product} from "../utilities/productsModel";

const { Client, sql, Pool } = require('pg')
const env = require('../../config.js')
const scraper = require("./scraper.ts");
const pgp = require('pg-promise')({
    /* initialization options */
    capSQL: true // capitalize all generated SQL
});

const client = {
    host: env.host,
    user: env.user,
    database: env.name,
    password: env.pw,
    port: env.port
}

const db = pgp(
    client
)

const cs = new pgp.helpers.ColumnSet(['brand','model','price','retailer','image','link','availability','detail' ], {table:'gpus'})

const cs_ = new pgp.helpers.ColumnSet(['brand','model','price','retailer','image','link','availability','detail' ], {table:'cpus'})

const getProducts =  async () => {
    await scraper.scrape().then((products: any) => {
        insert(products).then(p => {
            console.log(p)
        })
    })

}

const insert = async (products: any) => {

    await  exeQuery(pgp.helpers.insert(products.gpu, cs))
    await  exeQuery(pgp.helpers.insert(products.cpu, cs_))

}
const exeQuery = async (query:any) =>{
    await db.none(query).then( (err: any) => {
        if(err){
            console.log(err)
        }else{
            console.log(200, " ok")
        }
    })
}

getProducts().then(r => {
    console.log("getProducts")
})


/**
 * Ths function get all products from the data base given a product type
 * @param type
 * @returns []
 */

const queryProducts = async (type:string)=>{
    await db.any(`SELECT * FROM $1`,type)

}


/**
 * This function will take in a list of products, query the database and compare the incoming data with
 * the data queried, if any changes are found the database will be updated
 *
 * @returns void
 * @param products
 */
const updateProducts = async (products:Product[]) => {

}



/**
 *if the timestamp of an item
 *that has been unavailable for over 3 months we would remove that item from the data base
 *
 * @param Product
 * @returns void
 */
