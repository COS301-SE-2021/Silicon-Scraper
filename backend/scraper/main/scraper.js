const cheerio = require("cheerio");
const axios = require("axios");

let url = require("../utilities/url.js");
let EvetechSelector = require("../utilities/EvetechSelectors");
let products = [];

//Send a request to the Evetech url
async function scrapeSilon(){
    const html = await axios.get(url.getEveTecGpuUrl());
    const $ = await cheerio.load(html.data);


    let b = 0;


    $(EvetechSelector.getTableSelector()).find(EvetechSelector.getRowSelector()).children().each((i, row) => {

        $(row).each((k, col)=>{

            products.push({
                image: concatUrl($(col).find(EvetechSelector.getImageSelector(b)).attr('src')),
                title: $(col).find(EvetechSelector.getTitleSelector(b)).text().trim(),
                price: trimPrice($(col).find(EvetechSelector.getPriceSelector()).text().trim()),
                availability: $(col).find(EvetechSelector.getAvailabilitySelector(b)).text().trim(),
                link: concatUrl($(col).find(EvetechSelector.getLinkSelector(b)).attr('href')),
                retailer:"Evetech"
            })
            
            b = b + 1;


        })


    })

   console.log(products);

}

//This function concatinates the base url to the given url
function concatUrl(urlRES){
    let base = urlRES.split('../')[1]
    base = url.getEveTecUrl()+base;
    return base;
}


//this function trims the price string
function trimPrice(price){
    let priceW = price.split('\n')[0];

    return priceW
}



scrapeSilon().then(() => {
    console.log("running scraper");
})

module.exports = scrapeSilon;


