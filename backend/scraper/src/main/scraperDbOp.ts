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

const cs = new pgp.helpers.ColumnSet(['brand','model','price','retailer','image','link','availability','detail' ], {table:'products'})

const getProducts =  async () => {
    await scraper.scrape().then((products: any) => {
        insert(products).then(p => {
            console.log(p)
        })
    })

}

const insert = async (products: any) => {
    const query = pgp.helpers.insert(products, cs)
    await db.none(query).then( (err: any) => {
        if(err){
            console.log(err)
        }else{
            console.log(200, " ok")
        }

    })

    // try{
    //     await db.none(query).then( () => {
    //
    //         console.log("none")
    //     })
    //
    // }catch(error){
    //     console.log(error)
    // }
}

getProducts().then(r => {
    console.log("getProducts")
})

