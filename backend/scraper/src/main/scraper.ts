import {Selectors} from "../utilities/selectors";
import {Product} from "../utilities/productsModel";
const cheerio = require("cheerio");
const axios = require("axios");

let url = require("../utilities/url.ts");
let selectors = require("../utilities/selectors.ts").selectorsArray;
let array1 : Product[] = [];
let array2 : Product[] = [];
let products = {
    "gpu": array1,
    "cpu": array2
};

let today = new Date()

/**
 *This is an array of urls to scrape
 * @type {string[]} specific url to scrape
 */
let urls = [
     url.getEveTecGpuUrl(),
     url.getEveTecCpuUrl(),
     url.getAmpTekGpuUrl(),
     url.getAmpTekCpuUrl(),
     url.getDreamwareGpuUrl(),
     url.getDreamwareCpuUrl()
]
let jk = 0;
/**
 *
 * @param webToScrape url to
 * @param selector
 * @returns {array} An array of products
 */
export const scrapeSilon = async (webToScrape: any, selector: Selectors, baseUrl: string, type:string) =>{
    const html = await axios.get(webToScrape);
    return getWebData(html.data, selector, baseUrl, type)
}
/**
 *
 * @returns {*[]}
 * @param html
 */

const getWebData = async (html: any, selector: Selectors, baseUrl: string, type:string) => {

        const $ = await cheerio.load(html);
        let b = 0;

        //Number of pages = number of times a request is going to happen at a specific site
        $(selector.getTableSelector()).find(selector.getRowSelector()).children().each((i: any, row: any) => {
            $(row).each((k: any, col: any) => {
                addToProducts(b++, $, selector, baseUrl, type, col);
            })
        })

        return products;
}

//module.exports = {getWebData}
/**
 *
 * @param data
 * @param index
 * @param $
 * @param selector
 */
export const addToProducts = ( index: number, $: (arg0: any) => any[], selector: Selectors, baseUrl: string , type:string, data?: any) =>{

    let title = titleParser($(data).find(selector.getTitleSelector(index)).text().trim())
    let price = trimPrice($(data).find(selector.getPriceSelector()).text().trim())

    if(price === undefined)
        return


    let productsArray = {
        image: concatUrl($(data).find(selector.getImageSelector(index)).attr('src'), baseUrl),
        brand: title.brand,
        model: title.model,
        price: price,
        availability: $(data).find(selector.getAvailabilitySelector(index)).text().trim(),
        link: concatUrl($(data).find(selector.getLinkSelector(index)).attr('href'), baseUrl),
        retailer: selector.retailer,
        details: {
            productDetails: [
                {
                    datetime: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
                    price: trimPrice($(data).find(selector.getPriceSelector()).text().trim()),
                    availability: $(data).find(selector.getAvailabilitySelector(index)).text().trim()
                }
            ]
        },
        type:type
    }


    if(type === "gpu") {

        products.gpu.push(<Product>productsArray)
    }else if(type === "cpu"){

        products.cpu.push(<Product>productsArray)
    }



}

/**
 * This function concatenates the given url to the base url of the specific Website
 * @param urlRES
 * @returns {string}
 */
export const concatUrl = (urlRES: string | undefined, baseUrl: string) =>{

    if(urlRES !== undefined) {
        let base = urlRES.split('../')[1]


        if(base !== undefined) {
            base = baseUrl + base;
            return base
        }else {
            let base1 = urlRES.split('/p/')[1]
            if(base1 !== undefined) {
                base1 = baseUrl + "/p/" + base1
                return base1
            }
        }

        return urlRES;
    }else{
        return url.getEveTecUrl()
    }

}

//module.exports = {concatUrl}

/**
 * This function cleans out the spaces and tabs from the innerHtml and returns the price ad is
 * @param price
 * @returns {number}
 */
 export const trimPrice = (price: string) =>{

    let price_ = price.split('\n')[0].split('R')[1];
    if(price_ !== undefined ){
        return parseFloat(price.split('\n')[0].split('R')[1].replace(",", ""));
    }else{
        return price_
    }
}

//module.exports = {trimPrice}

/**
 * get the name , model and brand from the title
 * @return {object}
 */

export const titleParser = (title: string) =>{
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

//module.exports = titleParser;

/**
 * This function loops through the url array and calls the scrape function
 * @returns {array} array Of product objects
 */
export const scrape = async () => {
    for (const selector of selectors) {
        for (const url of urls) {          
            for(const url_ of url.urls) {

                await scrapeSilon(url_, selector, selector.getBaseUrl(), url.type);

            }
        }
    }

    return products;
}


//module.exports = {scrape}

// scrape().then(res => {
//    // console.log(res)
 //})

//Clink link and get the description

