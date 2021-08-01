import {Selectors} from "../utilities/selectors";
import {Product} from "../utilities/productsModel";
const cheerio = require("cheerio");
const axios = require("axios");
var j = "/web/20201111060705im_/https://www.evetech"; //delete b4 pushing to master

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
export const scrapeSilon = async (webToScrape: any, selector: Selectors, baseUrl: string, type:string, timestamp: any) =>{
    const html = await axios.get(webToScrape);
    return getWebData(html.data, selector, baseUrl, type, timestamp)
}
/**
 *
 * @returns {*[]}
 * @param html
 */

const getWebData = async (html: any, selector: Selectors, baseUrl: string, type:string, timestamp: any) => {

        const $ = await cheerio.load(html);
        let b = 0;

        //Number of pages = number of times a request is going to happen at a specific site
        $(selector.getTableSelector()).find(selector.getRowSelector()).children().each((i: any, row: any) => {
            $(row).each((k: any, col: any) => {
                addToProducts(b++, $, selector, baseUrl, type, timestamp, col);
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
export const addToProducts = ( index: number, $: (arg0: any) => any[], selector: Selectors, baseUrl: string , type:string,  timestamp: any, data?: any) =>{

    let title = titleParser($(data).find(selector.getTitleSelector(index)).text().trim())
    let price = trimPrice($(data).find(selector.getPriceSelector()).text().trim())

    if(price === undefined)
        return

    if ( title.model === "" || title.brand === ""){
        return 
    }
    let productsArray = {
        //image: concatUrl($(data).find(selector.getImageSelector(index)).attr('src'), baseUrl),
        brand: title.brand,
        model: title.model,
        price: price,
        availability: availability($(data).find(selector.getAvailabilitySelector(index)).text().trim()),
        date: timestamp,
        // link: concatUrl($(data).find(selector.getLinkSelector(index)).attr('href'), baseUrl),
        // retailer: selector.retailer,
        // details: {
        //     productDetails: [
        //         {
        //             //change datetime when calling the cache data

        //             datetime:date( today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()),
        //             price: trimPrice($(data).find(selector.getPriceSelector()).text().trim()),
        //             availability: availability($(data).find(selector.getAvailabilitySelector(index)).text().trim())
        //         }
        //     ]
        // },
        type:type,
        // description:""
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
        }else if(urlRES.includes(j)){
            return "https://web.archive.org"+urlRES;
        } else {
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
    console.log(title)

    let detailedTitle = title.replace(/,/g,"" ).split(' ')
    let model = ''
    let brand = '';
    let graphics = ["GEFORCE", "RTX", "RX", "RADEON", "AMD", "GTX", "GT" ]
    let cpus = ["RYZEN", "ATHLON", "PENTIUM", "CORE", "A12", "A10", "A8", "A6", "DUAL", "CELERON"]
    let temp = ["A12", "A10", "A8", "A6", "i9", "i5", "i3", "i7"]
    if(detailedTitle[0] == "RYZEN")
        brand = "AMD "
    for (let i = 0; i < detailedTitle.length; i++) {
        if(detailedTitle[i].toUpperCase() === "AMD" && (cpus.some(x => detailedTitle[i+1].toUpperCase().includes(x)) || graphics.some(x => x === detailedTitle[i+1].toUpperCase())))
            brand += detailedTitle[i] + " "
        else if(graphics.some(x => x === detailedTitle[i].toUpperCase()) || cpus.some(x => detailedTitle[i].toUpperCase().includes(x))){
            
            for (let k = i ; k< detailedTitle.length; k++){
                if(detailedTitle[k].includes("..."))
                    break;
                if(temp.some(x => x === detailedTitle[k])){
                    model += " " + detailedTitle[k] + "-" + detailedTitle[k+1]
                    k = k+2
                }else
                    model += " " + detailedTitle[k]
            }
            break;
        }else{
            brand += detailedTitle[i] + " "
        }

    }
    console.log(brand + " " + model)

    let detailedTitleObj = {
        'brand' : brand.slice(0,-1), //detailedTitle[0],
        'model' : model.substring(1)
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

            //    await scrapeSilon(url_, selector, selector.getBaseUrl(), url.type);

            }
        }
    }

    return products;
}


const availability = (availability:string) => {
    if(availability.includes("In Stock") || availability.includes("add")){
        return "In Stock"
    }else{
        return "Out of Stock"
    }
}

const date = (d:string)=>{

    return "2020-11-27"
    //return d
}



