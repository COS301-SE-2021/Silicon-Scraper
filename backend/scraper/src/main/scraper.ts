import {descriptionSelector, manufacturesSelectorsArray, Selectors} from "../utilities/selectors";
import {Product} from "../utilities/productsModel";
import {
    concatUrl,
    titleParser,
    availability,
    date,
    trimPrice,
    manufacturerUrl,
    getDescriptions
} from "../utilities/parser";
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
//import cheerio from 'cheerio'
import axios from 'axios'
import {Browser, JSHandle, JSONObject, Page} from "puppeteer";
import { getJSDocImplementsTags } from "typescript";
import { stringify } from "querystring";
import bluebird from "bluebird"

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
    return await getWebData(html.data, selector, baseUrl, type)
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
        $(row).each(async (k: any, col: any) => {
            await addToProducts(b++, $, selector, baseUrl, type, col);
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
export const addToProducts = async (index: number, $: (arg0: any) => any[], selector: Selectors, baseUrl: string, type: string, data?: any) => {

    let baseTitle: string = (selector.retailer == "Dreamware") ? $(data).find(selector.getTitleSelector(index)).attr('title') : $(data).find(selector.getTitleSelector(index)).text().trim()
    let title = titleParser(baseTitle)
    let price = trimPrice($(data).find(selector.getPriceSelector()).text().trim())

    //console.log(title)
    if (price === undefined)
        return

    if (title.model === "" || title.brand === "") {
        return
    }

    let brand = title.brand;
    let model = title.model
    let des = {}
   // let deurl = await getDesUrl(brand, model)


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

                    datetime: date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()),
                    price: trimPrice($(data).find(selector.getPriceSelector()).text().trim()),
                    availability: availability($(data).find(selector.getAvailabilitySelector(index)).text().trim())
                }
            ]
        },
        type: type,


        /*
            Pass in the title to the descriptions array and scrape the manufactures
        */
        description: des,
        // decriptionUrl:deurl
    }
    
    if (type === "gpu") {

        products.gpu.push(<Product>productsArray)
    } else if (type === "cpu") {

        products.cpu.push(<Product>productsArray)
    }
}


const getDesUrl = (brand: string, model: string) =>{

    const url_man =  manufacturerUrl(brand, model)


    if(url_man.url === "" || url_man.manufacturer == "intel") {
        return {
            "url":"",
            "selector":"",
            "manufacturer": ""
        }
    }
    let select_type = 'general'
    let man = url_man.manufacturer
    if(model.toUpperCase().includes("TI ")){
        man = man+" "+"ti"
        select_type = '301620ti'
    }

    const url = url_man.url
    const keys = Object.keys(manufacturesSelectorsArray)
    const index = keys.findIndex((key) => { return man.includes(key)}) //Finds matching selector index using the keys
    const selector = Object.values(manufacturesSelectorsArray)[index]
    
    if(url.includes('20') || url.includes('ti') || url.includes('16') || url.includes('quadro')){
        select_type = '301620ti'
    }else if(url.includes('rtx-a') || url.includes){
        select_type = 'quadroa'
    }

    let urlPair = {
        "url":url,
        "selector":selector.getDescriptions(select_type),
        "manufacturer": man
    }

    return urlPair
}

let titles = {
    "cpu": [
        getDesUrl('Sapphire','NITRO+ Radeon RX 6900 XT SE 16GB GDDR6 PCIE 4.0 AMD Graphics Card'),
        getDesUrl("MSI","Radeon RX 6600 XT GAMING X 8GB GDDR6"),
        getDesUrl('ASUS ROG Strix LC', 'RX 6900 XT 16GB Top Gaming'),
        getDesUrl("ASUS"," GeForce RTX 3060 Ti V2 LHR OC Dual 8GB GDDR6")
    ],
    "gpu": [
        getDesUrl("ASUS Dual ","GeForce RTX 2060 OC EVO 6GB GDDR6"),
        getDesUrl("ASUS TUF Gaming"," GeForce GTX 1660 Ti OC EVO 6GB"),
        getDesUrl("NVIDIA","Quadro P1000 4GB GDDR5 Workstation Graphics"),
        getDesUrl("MSI","GTX 1650 VENTUS XS 4GB OC"),
        getDesUrl("Gigabyte","GT 1030 Low Profile 2GB DDR4 Graphics Card")
    ]
    

}




const withBrowser = async (fn: (arg0: Browser) => any) => {
    const browserFetcher = puppeteer.createBrowserFetcher();
    const revisionInfo = await browserFetcher.download('901912');
    
    let browser: Browser = await puppeteer.launch({headless: false, args: ['--no-sandbox'], executablePath: revisionInfo.executablePath});
    
    try{
        return await fn(browser)
    }finally{
        await browser.close()
    }
}

const withPage = (browser: Browser) => async (fn: any) => {
    const page = await browser.newPage()
    await (await page).setDefaultNavigationTimeout(0);
    await (await page).setDefaultTimeout(0);

    try {
        return await fn(page)
    }finally{
        (await page).close()
    }
}   


/**
 * This is a Description scraper which collects product descriptions of the given product passed in via model and brand thus returning
 * an object with all the desired descriptions
 * @param brand
 * @param model
 * @return {description} type: {[key:string] : any}
 */
const scrape_description = async () => {
    console.log("scraping descriptions")
    
    const cpus = titles.cpu//products.cpu
    const gpus = titles.gpu//products.gpu
    
    //let descriptions: ({ [x: string]: any; } | undefined)[] = []

    titles.cpu = await withBrowser(async (browser) => {
        return products_descriptions(cpus, browser)

        
    })

    titles.gpu = await withBrowser(async (browser) => {
        return products_descriptions(gpus, browser)
    })

    
    
    
    console.log("Products")
    //console.log(prods)
    //console.log("res", res)
    return titles
    
}


const products_descriptions = async (type_product: any[], browser: Browser) => {
 
    return await bluebird.map(type_product, async (prod) => {
        const url = prod.url//prod.decriptionUrl.url
        let result: {[k:string]: any} |void

        return withPage(browser)(async (page: Page) => {
            
            if(url != ""){
                const selector = prod.selector//prod.decriptionUrl.selector
                
                result = await page.goto(url, {waitUntil: 'networkidle0'}).then(async () => {
                    let descript:string[] = []
                    console.log('before eval')
                    const content = page.content()
                    await content.then(async (success) => {
                        const $ = await cheerio.load(success)
                        let text 
                        $(selector).children().each((i:any, row:any) => {
                            text = $(row).text().trim().replace('GPU:','').replace(/\s{2,} |:/g, '//')
                            descript.push(text !== undefined? text: '')
                        })
                        //console.log(descript)
                    })
                    const des = getDescriptions(descript, prod.manufacturer)//prod.decriptionUrl.manufacturer)
                    return des
        
    
                }).catch(async (err: any) =>{
                    console.error(err)
                    await page.close()
                    prod.description = {}
                    return prod
                    
                    //await browser.close()
                })
                //await page.close()
                prod.description = result
                return prod
    
            }else {
                prod.description = {}
                //await page.close()
                return prod
            }

        })
        
        
        
        
    }, {concurrency: 10})


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
    let all_products 
    return scrape_description()
    //return all_products;
}



 //scrape().then(r => { console.log("done") }).catch(async (err) => {})
scrape_description().then(r => console.log(r))
//getDesUrl("AMD", "Ryzen 7 1800X Octa-Core 3.6GHz (4.0GHz Turbo) AM4 Socket Desktop CPU").then ( r => {console.log(r)} )
