import {Selectors} from "../utilities/selectors";

const cheerio = require("cheerio");
const axios = require("axios");

let url = require("../utilities/url.ts");
let selectors = require("../utilities/selectors.ts").selectorsArray;
let products: { image: any; brand: any; model: string; price: any; availability: any; link: any; retailer: string; detail: { productDetails: { datetime: string; price: any; availability: any; }[]; }; }[] = [];
let today = new Date()


/**
 *This is an array of urls to scrape
 * @type {string[]} specific url to scrape
 */
let urls = [
     url.getEveTecGpuUrl(),
     url.getEveTecCpuUrl(),
     url.getPcLinkGpuUrl(),
     url.getPcLinkCpuUrl(),
     url.getRebalGamingGpuUrl(),
     url.getRebalGamingCpuUrl(),
]

/**
 *
 * @param webToScrape url to
 * @returns {array} An array of products
 */
const scrapeSilon = async (webToScrape: any, selector: Selectors) =>{
    const html = await axios.get(webToScrape);
    return getWebData(html.data, selector)
}
/**
 *
 * @returns {*[]}
 * @param html
 */

const getWebData = async (html: any, selector: Selectors) => {

    const $ = await cheerio.load(html);
     let b = 0;


    //Number of pages = number of times a request is going to happen at a specific site

    if (selector.getTableSelector() !== undefined) {

        $(selector.getTableSelector()).find(selector.getRowSelector()).children().each((i: any, row: any) => {

            $(row).each((k: any, col: any) => {

                addToProducts(b++, $, selector, col);

            })
        })

        console.log(selector, " using a table" )
    } else {
        //get the list
        //el in that list
            //addToProducts(b++, $, selectors);

        console.log(selector, " not using a table")
    }
    return products;
}

module.exports = {getWebData}
/**
 *
 *
 * @param data
 * @param index
 * @param $
 * @param selector
 */
const addToProducts = ( index: number, $: (arg0: any) => any[], selector: Selectors, data?: any) =>{
    let title = titleParser($(data).find(selector.getTitleSelector(index)).text().trim())

    products.push({
        image: concatUrl($(data).find(selector.getImageSelector(index)).attr('src')),
        brand: title.brand,
        model: title.model,
        price: trimPrice($(data).find(selector.getPriceSelector()).text().trim()),
        availability: $(data).find(selector.getAvailabilitySelector(index)).text().trim(),
        link: concatUrl($(data).find(selector.getLinkSelector(index)).attr('href')),
        retailer: selector.retailer,
        detail:{ productDetails : [
            {
                datetime: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
                price: trimPrice($(data).find(selector.getPriceSelector()).text().trim()),
                availability: $(data).find(selector.getAvailabilitySelector(index)).text().trim()
            }
        ]}
    })
}

/**
 * This function concatenates the given url to the base url of the specific Website
 * @param urlRES
 * @returns {string}
 */
const concatUrl = (urlRES: string | undefined) =>{

    if(urlRES !== undefined) {
        let base = urlRES.split('../')[1]
        base = url.getEveTecUrl() + base;
        return base;
    }else{
        return url.getEveTecUrl()
    }

}

module.exports = {concatUrl}

/**
 * This function cleans out the spaces and tabs from the innerHtml and returns the price ad is
 * @param price
 * @returns {number}
 */
 const trimPrice = (price: string) =>{

    let price_ = price.split('\n')[0].split('R')[1];
    if(price_ !== undefined ){
        return parseFloat(price.split('\n')[0].split('R')[1].replace(",", ""));
    }else{
        return price_
    }
}

module.exports = {trimPrice}

/**
 * get the name , model and brand from the title
 * @return {object}
 */

const titleParser = (title: string) =>{
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

module.exports = {titleParser}

/**
 * This function loops through the url array and calls the scrape function
 * @returns {array} array Of product objects
 */
const scrape = async () => {

    for (const selector of selectors) {
        for (const url of urls) {
            await scrapeSilon(url, selector);
            break;
        }
    }
    return products;
}

module.exports = {scrape}

scrape().then(res => {
    console.log(res)
})















