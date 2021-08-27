import {manufacturesSelectorsArray, Selectors} from "../utilities/selectors";
import {Product} from "../utilities/productsModel";
import {concatUrl, titleParser, availability, date, trimPrice, manufacturerUrl} from "../utilities/parser";
const cheerio = require("cheerio");
//import cheerio from 'cheerio'
import axios from 'axios'


let url = require("../utilities/url");
let selectors = require("../utilities/selectors").selectorsArray;
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
     url.getSiliconWebUrl(),
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

    let baseTitle: string = (selector.retailer == "Dreamware") ? $(data).find(selector.getTitleSelector(index)).attr('title') : $(data).find(selector.getTitleSelector(index)).text().trim()
    let title = titleParser(baseTitle)
    let price = trimPrice($(data).find(selector.getPriceSelector()).text().trim())

    //console.log(title)
    if(price === undefined)
        return

    if ( title.model === "" || title.brand === ""){
        return 
    }

    let brand = title.brand; let model = title.model

    let productsArray = {
        image: concatUrl($(data).find(selector.getImageSelector(index)).attr('src'), baseUrl),
        brand: brand,
        model: model,
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


        /*
            Pass in the title to the descriptions array and scrape the manufactures
        */
        description: getDescription(brand, model)
    }

    if(type === "gpu") {

        products.gpu.push(<Product>productsArray)
    }else if(type === "cpu"){

        products.cpu.push(<Product>productsArray)
    }

}

export const getDescription = (brand: string, model: string) =>{

    const url_man = manufacturerUrl(brand, model)
    const man = url_man.manufacture
    const url = url_man.url
    const selector = manufacturesSelectorsArray



    return ""
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

// scrapeSilon(url.getEveTecCpuUrl().urls[0], selectors[1], selectors[1].getBaseUrl(), "cpu" ).then(r => {console.log(r)})


