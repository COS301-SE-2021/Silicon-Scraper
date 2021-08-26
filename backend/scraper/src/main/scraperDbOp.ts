import {Product} from "../utilities/productsModel";
const env = require('../../config')
//const scraper = require("./scraper.ts");
import * as scraper from "../main/scraper"

// const pgp = require('pg-promise')({
//     /* initialization options */
//     capSQL: true // capitalize all generated SQL
// });

import pgPromise from 'pg-promise';
const pgp = pgPromise({
    capSQL: true
});

let today = new Date()

const client = {
    host: env.host,
    user: env.user,
    database: env.name,
    password: env.pw,
    port: env.port
}

let db_ = pgp(client)
//let db_:any = undefined

export const dataOps = (db:any =db_) => {


    const cs = new pgp.helpers.ColumnSet(['brand', 'model', 'price', 'retailer', 'image', 'link', 'availability', 'details', 'type', 'description'], {table: 'gpus'})

    const cs_ = new pgp.helpers.ColumnSet(['brand', 'model', 'price', 'retailer', 'image', 'link', 'availability', 'details', 'type', 'description'], {table: 'cpus'})

     const getProducts = async () => { //needs to be tested

        await scraper.scrape().then( async (products: any) => {
                if (products.gpu.length == 0 || products.cpu.length == 0) {
                    throw new Error("Empty products");

                } else {
                    await update(products).then(async (res) => {
                        console.log("200 ok")
                    }).catch((e) => {})
                    
                }

        }).catch((e) => { console.log(e)})
         return "successful update"
    }

    getProducts().then( () => {
        console.log("Successful")
    }).catch((e) => {})

    /**
     * @param query
     */
     const exeQuery = async (query: any) => {
        await db.none(query).then((err: any) => {
            if (err) {
                //console.log(err)
                throw new Error(err);
            } else {
                console.log(200, " ok")
            }
        }).catch((e: any) => {})
    }

    /**
     * @param products
     */
     const update = async (products: any) => {

        await queryProducts("gpus", products.gpu)
        await queryProducts("cpus", products.cpu)

    }
    /**
     * Checks if the database is empty, if true it inserts to the db else
     * Ths function get all products from the data base given a product type
     * @param type
     * @returns []
     */
     let queryProducts = async (table: string, products: Product[]) => {
        await db.any('SELECT * FROM $1:raw', table).then(async (result: any) => {

                if (result.length === 0) {
                    //insert(products)

                    if (table === "gpus"){

                        await exeQuery(pgp.helpers.insert(products, cs))
                    }
                    else if (table === "cpus")
                        await exeQuery(pgp.helpers.insert(products, cs_))

                } else {

                    await updateProducts(result, products, table) //compare the products from db and the scraped products
                }

        }).catch((e: any) => {})
    }

    /**
     * this function updates the availability or rent
     * @param table
     * @param column
     * @param value
     * @param id
     */
    const updateDetails = async (table: any, column: any, value: any, id: any) => { //needs to be tested

        const restQuery = pgp.as.format('$1:raw SET  $2:raw = $3 WHERE id = $4', [table, column, value, id])
        await db.none('UPDATE $1:raw ', restQuery);

    }


    /**
     * if the timestamp of an item
     * that has been unavailable for over 3 months we would remove that item from the data base
     *
     * @param id_
     * @param table
     * @returns void
     */
    const deleteProduct = async (id_: any, table: any) => {   //needs to be tested

        const restQuery = pgp.as.format('$1:raw WHERE id = $2', [table, id_])
        await db.none('DELETE FROM $1:raw', restQuery);

    }

    const preCleaning = async (results: any, table:any) => {
        let m = today.getMonth() + 1
        let d = today.getDay()

        for(const i in results){
            if(results[i].availability === "Out of Stock") {
                let currentDate = results[i].details.productDetails[0].datetime.split('-')[1]
                let currDay = results[i].details.productDetails[0].datetime.split('-')[2]
                let timeInDb = Math.abs(Number(m) - Number(currentDate)) * 30 + Number(currDay) + Number(d)

                console.log(results[i].id + " timepassed =" + timeInDb)
                await stailChecker(timeInDb, results[i], table)
            }
        }
    }

    const stailChecker = async (duration:number, product:any, table:any) => {
        if (duration >= 90) {
            //This item is stale and had its availability has not been updated, it must be removed from the database
            await deleteProduct(product.id, table).then((error: any) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Successful deletion from db: "+product.link)
                }
            })
        }
    }


    /**
     * The function get all products from the data base given a product type
     * This function will take in a list of products, query the database and compare the incoming data with
     * the data queried, if any changes are found the database will be updated
     *
     * @returns void
     * @param products
     */
    const updateProducts = async (results: any, products: Product[], table: string) => { //needs to be tested
        // console.log(results)
        // console.log(products)
        for (const pkey in products) {
            let contains = false
            let prod: any = {};
            for (const  rkey in  results) {
                prod = products[pkey]
                if (products[pkey].model === results[rkey].model && products[pkey].brand === results[rkey].brand && products[pkey].retailer === results[rkey].retailer) {
                    let avail = false;
                    contains = true;
                    //Update the availability and/or price if it changed

                    console.log("FOUND PROD THAT MATCHES!!!!")
                    if (!(products[pkey].availability === results[rkey].availability)) {
                        console.log("Availablity updated from: "+ results[rkey].availability + " to "+products[pkey].availability)
                        avail = true;
                        //call update
                        await updateDetails(table, "availability", products[pkey].availability, results[rkey].id)

                    } else if (!(products[pkey].price === results[rkey].price)) {
                        //call update
                        console.log("price updated from: "+ results[rkey].price + " to "+products[pkey].price)
                        await updateDetails(table, "price", products[pkey].price, results[rkey].id)

                    }
                    if (!avail) {
                        //test the timestamp

                        if(results[rkey].availability === "Out of Stock") {
                            let currentDate = results[rkey].details.productDetails[0].datetime.split('-')[1]
                            let newDate = products[pkey].details.productDetails[0].datetime.split('-')[1]
                            let currDay = results[rkey].details.productDetails[0].datetime.split('-')[2]

                            let newDay = products[pkey].details.productDetails[0].datetime.split('-')[2]
                            let timeInDb = Math.abs(Number(newDate) - Number(currentDate)) * 30 + Number(currDay) + Number(newDay)

                            await stailChecker(timeInDb, results[rkey], table)
                        }
                    }
                }
            }

            if (!contains)
                await insert(prod, table)
        }

        console.log("IN THE UPDATE")
        await preCleaning(results, table)
    }

    /**
     *
     * @param prod
     * @param table
     */
    const insert = (prod: Product, table: string) => {
        db.none('INSERT INTO $1:raw (brand, model , price , retailer , image , link , availability , details ,  type ,  description ) ' +
            'VALUES ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
            table, prod.brand, prod.model, prod.price, prod.retailer, prod.image, prod.link, prod.availability, prod.details, prod.type, prod.description
        ])
    }

    return{
        getProducts,
        exeQuery,
        update,
        updateDetails,
        deleteProduct,
        updateProducts,
        insert,
        queryProducts
    }
}

//dataOps()
console.log("Run scraper")