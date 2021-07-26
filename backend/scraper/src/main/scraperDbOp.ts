import {Product} from "../utilities/productsModel";
const env = require('../../config')
//const scraper = require("./scraper.ts");
import * as scraper from "../../src/main/scraper"

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

let db_ = pgp(client)

export const dataOps = (db=db_) => {
    const cs = new pgp.helpers.ColumnSet(['brand', 'model', 'price', 'retailer', 'image', 'link', 'availability', 'details', 'type', 'description'], {table: 'gpus'})

    const cs_ = new pgp.helpers.ColumnSet(['brand', 'model', 'price', 'retailer', 'image', 'link', 'availability', 'details', 'type', 'description'], {table: 'cpus'})

     const getProducts = async () => { //needs to be tested

        await scraper.scrape().then((products: any) => {

            if (products === undefined) {
                throw new Error("Empty products")

            } else {
                //console.log(products)
                update(products).then(res => {
                    console.log("200 ok")
                })
            }

        })
    }

    getProducts().then(() => {
        console.log("successful")
    })

    /**
     * @param query
     */
     const exeQuery = async (query: any) => {
        await db.none(query).then((err: any) => {
            if (err) {
                console.log(err)
            } else {
                console.log(200, " ok")
            }
        })
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
        //needs to be tested
        await db.any('SELECT * FROM $1:raw', table).then(async (result: any) => {
            if (result.length === 0) {
                //insert(products)
                if (table === "gpus")
                    await exeQuery(pgp.helpers.insert(products, cs))

                else if (table === "cpus")
                    await exeQuery(pgp.helpers.insert(products, cs_))

            } else {
                await updateProducts(result, products, table) //compare the products from db and the scraped products
            }
        })
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

    /**
     * The function get all products from the data base given a product type
     * This function will take in a list of products, query the database and compare the incoming data with
     * the data queried, if any changes are found the database will be updated
     *
     * @returns void
     * @param products
     */
    const updateProducts = async (results: any, products: Product[], table: string) => { //needs to be tested
        for (const rkey in results) {
            let contains = false
            let prod: any = {};
            for (const pkey in products) {
                prod = products[pkey]
                if (products[pkey].model === results[rkey].model && products[pkey].brand === results[rkey].brand && products[pkey].retailer === results[rkey].retailer) {
                    let avail = false;
                    contains = true;
                    //Update the availability and/or price if it changed

                    if (!(products[pkey].availability === results[rkey].availability)) {
                        avail = true;
                        //call update
                        await updateDetails(table, "availability", products[pkey].availability, results[rkey].id)

                    } else if (!(products[pkey].price === results[rkey].price)) {
                        //call update
                        await updateDetails(table, "price", products[pkey].price, results[rkey].id)

                    }
                    if (!avail) {
                        //test the timestamp
                        let currentDate = results[rkey].details.productDetails[0].datetime.split('-')[1]
                        let newDate = products[pkey].details.productDetails[0].datetime.split('-')[1]
                        let currDay = results[rkey].details.productDetails[0].datetime.split('-')[2]
                        let newDay = products[pkey].details.productDetails[0].datetime.split('-')[2]
                        let timeInDb = Math.abs(Number(newDate) - Number(currentDate)) * 3 + Number(currDay) + Number(newDay)

                        if (timeInDb >= 90) {
                            //This item is stale and had its availability has not been updated, it must be removed from the database
                            await deleteProduct(results[rkey].id, table).then((error: any) => {
                                if (error) {
                                    console.log(error)
                                } else {
                                    console.log("Successful")
                                }
                            })
                        }
                    }
                }
            }

            if (!contains)
                await insert(prod, table)
        }
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
        insert
    }
}

