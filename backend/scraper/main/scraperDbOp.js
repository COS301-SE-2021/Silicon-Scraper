const { Client, sql, Pool } = require('pg')
const env = require('../../config.js')
const scraper = require("../main/scraper.js");
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

const cs = new pgp.helpers.ColumnSet(['brand','model','price','retailer','image','link','availability','detail' ], {table:'products'})

const getProducts =  async () => {
    await scraper.scrape().then((products) => {
        insert(products).then(p => {
            console.log(p)
        })
    })

}

const insert = async (products) => {
    const query = pgp.helpers.insert(products, cs)
    try{
        await db.none(query).then( (err) => {

            console.log("none")
        })

    }catch(error){
        console.log(error)
    }
}

getProducts().then(r => {
    console.log("getProducts")
})

