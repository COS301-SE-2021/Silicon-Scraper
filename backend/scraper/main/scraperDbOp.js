const { Client, sql, Pool } = require('pg')
const env = require('../../config.js')
const scraper = require("../main/scraper.js");

let product = []

const pool = new Pool({
    host: env.host,
    user: env.user,
    database: env.name,
    password: env.pw,
    port: env.port
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})


const getProducts =  async () => {
    await scraper.scrape().then((product) => {
        loopThroughProducts(product).then( (ronfulfilled, onrejected) =>{
            if(ronfulfilled){
                console.log(ronfulfilled)
            }else{
                console.log(onrejected)
            }
        })
    });

}

const loopThroughProducts = async (products) => {
    for (const dataKey in products) {

        console.log("opening connection for product number: ",dataKey)
        pool.connect()

        await addProducts(products[dataKey]).then(() =>{
            pool.end()
            console.log("inserted product number: ", dataKey, "___ connection closed")
        })

    }
}


getProducts().then(r => {
    console.log(r);
})



const insertProducts = async (brand_,model_,price_,retailer_,imageurl_,producturl_,availability_,detail_) => {


    let insertQuery =             `
            INSERT INTO products(brand,model,price,retailer,imageurl,producturl,availability,detail)
            VALUES ('${brand_}', '${model_}', ${price_}, '${retailer_}', '${imageurl_}', '${producturl_}', '${availability_}',  ' { "details" : [ { "date" : "${detail_.details[0].date}" , "price" : ${detail_.details[0].price} , "availability" : "${detail_.details[0].availability}" } ] } '  )
        `


        await client.query(
            insertQuery, (err, res) => {
                if (err) {
                    console.log(err, "ERROR CAUGHT")

                } else {
                    console.log("Inserted correctly")
                }
            }
        )

}


/**
 * This function populates the db with products scraped
 * @param products array from the scrape function
 */
const addProducts = async (data) => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let details = {
        "date": date,
        "price": data.price,
        "availability": data.availability
    }
    let detailsList = [
        details
    ]

    let detailsObj = { 'details' : detailsList}

    await insertProducts(data.brand, data.model, data.price, data.retailer, data.image, data.link, data.availability, detailsObj).then((err, res) => {

    })

}