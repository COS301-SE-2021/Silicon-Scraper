const cheerio = require("cheerio");
const axios = require("axios");

let url = require("../utilities/url.js");
let EvetechSelector = require("../utilities/EvetechSelectors");
let products = [];

/**
 *This is an array of urls to scrape
 * @type {string[]} specific url to scrape
 */
let eveTech = [
     url.getEveTecGpuUrl(),
     url.getEveTecCpuUrl()
]

/**
 *
 * @param webToScrape url to
 * @returns {array} An array of products
 */
const scrapeSilon = async (webToScrape) =>{
    const html = await axios.get(webToScrape);
    const $ = await cheerio.load(html.data);

    let b = 0;
    $(EvetechSelector.getTableSelector()).find(EvetechSelector.getRowSelector()).children().each((i, row) => {
        $(row).each((k, col)=>{
            
            addToProducts(col, b++, $);
         
        })
    })
    
   return products;

}
/**
 *
 *
 * @param data
 * @param index
 * @param $
 */
const addToProducts = (data, index, $) =>{
    let title = titleParser($(data).find(EvetechSelector.getTitleSelector(index)).text().trim())
    products.push({
        image: concatUrl($(data).find(EvetechSelector.getImageSelector(index)).attr('src')),
        brand: title.brand,
        model: title.model,
        price: trimPrice($(data).find(EvetechSelector.getPriceSelector()).text().trim()),
        availability: $(data).find(EvetechSelector.getAvailabilitySelector(index)).text().trim(),
        link: concatUrl($(data).find(EvetechSelector.getLinkSelector(index)).attr('href')),
        retailer:"Evetech"
    })
}

/**
 * This function concatenates the given url to the base url of the specific Website
 * @param urlRES
 * @returns {string}
 */
const concatUrl = (urlRES) =>{

    let base = urlRES.split('../')[1]
    base = url.getEveTecUrl() + base;
    return base;

}

/**
 * This function cleans out the spaces and tabs from the innerHtml and returns the price ad is
 * @param price
 * @returns {number}
 */
 const trimPrice = (price) =>{
    return parseFloat(price.split('\n')[0].split('R')[1].replace(",","."));
}

/**
 * get the name , model and brand from the title
 * @return {object}
 */

const titleParser = (title) =>{
    let detailedTitle = title.split(' ')
    let model = ''
    for (let i = 1; i < detailedTitle.length - 1; i++) {
        if(i == 1){
            model = detailedTitle[i]
        }else{
            model = model+" "+detailedTitle[i]
        }

    }
    let detailedTitleObj = {
        'brand' : detailedTitle[0],
        'model' : model
    }
    return detailedTitleObj
}

/**
 * This function loops through the url array and calls the scrape function
 * @returns {array} Of product objects
 */
module.exports.scrape = async () => {
    for(let i = 0; i < eveTech.length; i++){
        await scrapeSilon(eveTech[i]);
    }
    return products;
}
