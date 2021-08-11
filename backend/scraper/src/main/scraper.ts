import {Selectors} from "../utilities/selectors";
import {Product} from "../utilities/productsModel";
import {concatUrl, titleParser, availability, date, trimPrice} from "../utilities/parser";
const cheerio = require("cheerio");
//import cheerio from 'cheerio'
import axios from 'axios'


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

/**
 *
 * @param data
 * @param index
 * @param $
 * @param selector
 */
export const addToProducts = ( index: number, $: (arg0: any) => any[], selector: Selectors, baseUrl: string , type:string,  data?: any) =>{


    let title = titleParser($(data).find(selector.getTitleSelector(index)).text().trim())
    let price = trimPrice($(data).find(selector.getPriceSelector()).text().trim())

    //console.log(title)
    if(price === undefined)
        return

    if ( title.model === "" || title.brand === ""){
        return 
    }
    let productsArray = {
        image: concatUrl($(data).find(selector.getImageSelector(index)).attr('src'), baseUrl),
        brand: title.brand,
        model: title.model,
        price: price,
        availability: availability($(data).find(selector.getAvailabilitySelector(index)).text().trim()),
        link: concatUrl($(data).find(selector.getLinkSelector(index)).attr('href'), baseUrl),
        retailer: selector.retailer,
        details: {
            productDetails: [
                {
                    //change datetime when calling the cache data

                    datetime:date( today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()),
                    price: trimPrice($(data).find(selector.getPriceSelector()).text().trim()),
                    availability: availability($(data).find(selector.getAvailabilitySelector(index)).text().trim())
                }
            ]
        },
        type:type,
        description:""
    }

    if(type === "gpu") {

        products.gpu.push(<Product>productsArray)
    }else if(type === "cpu"){

        products.cpu.push(<Product>productsArray)
    }

}

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

 // scrape().then(r => {console.log(r)})


