const request = require("request");
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

            //console.log(b, $(col).find(EvetechSelector.getImageSelector(b)))
            // $(col).find(EvetechSelector.getImageSelector(b)).children().each((i,image) => {
            //     console.log($(image).attr('src'))
            // })

            products.push({
                image: $(col).find(EvetechSelector.getImageSelector(b)).attr('src'),
                title: $(col).find(EvetechSelector.getTitleSelector(b)).text().trim(),
                price: trimPrice($(col).find(EvetechSelector.getPriceSelector()).text().trim()),
                availability: $(col).find(EvetechSelector.getAvailabilitySelector(b)).text().trim(),
                link: $(col).find(EvetechSelector.getLinkSelector(b)).attr('href'),
                retailer:"Evetech"
            })
            
            b = b + 1;


        })


    })

   console.log(products);

}


function trimPrice(price){
    let priceW = price.split(' ')[0];

    return priceW
}







scrapeSilon().then(() => {
    console.log("running scraper");
})




