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
declare const window: any

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
    let des = await scrapeDescription(brand, model)
    await new Promise(resolve => setTimeout(resolve, 100000));


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
        description: des
    }
    
    if (type === "gpu") {

        products.gpu.push(<Product>productsArray)
    } else if (type === "cpu") {

        products.cpu.push(<Product>productsArray)
    }
}

/**
 * This is a Description scraper which collects product descriptions of the given product passed in via model and brand thus returning
 * an object with all the desired descriptions
 * @param brand
 * @param model
 * @return {description} type: {[key:string] : any}
 */

export const scrapeDescription = async (brand: string, model: string) =>{

    const url_man = manufacturerUrl(brand, model)
    if(url_man.url === "") return ""

    let man = url_man.manufacturer
    if(model.toUpperCase().includes("TI ")){
        man = man+" "+"ti"
    }

    const url = url_man.url
    const keys = Object.keys(manufacturesSelectorsArray)
    const index = keys.findIndex((key) => { return man.includes(key)}) //Finds matching selector index using the keys
    const selector = Object.values(manufacturesSelectorsArray)[index]

    const browserFetcher = puppeteer.createBrowserFetcher();
    const revisionInfo = await browserFetcher.download('901912');
    
    let browser: Browser = await puppeteer.launch({headless: false, args: ['--no-sandbox'], executablePath: revisionInfo.executablePath});
   // try {

            let page = await browser.newPage()
            await page.setDefaultNavigationTimeout(0);
            console.log('hyehhhhhhs')
            

            //await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
            const page_result = await page.goto(url, {waitUntil: 'networkidle0'}).then(async () => {

                if(brand === 'Intel'){
                    return {}
                }

                const selectordes = selector.getDescriptions()
                // const content = page.content()
                // let text = ""
                // console.log('heyyyyyyyy')
                // await content.then(async (success) => {
                //     const $ = await cheerio.load(success)
                //     // console.log(success)
                //     $(selectordes).children().each(async (i:any, row:any) =>{
                //         text = $(row).text().trim().replace('GPU:','').replace(/\s{2,} |:/g, '//')
                //     })
                //     console.log(text)
                
                // })
                console.log('hryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
                const content = await page.evaluate(async (selectordes: string) => {
                    console.log(document.documentElement.querySelectorAll(selectordes)[0])
                    let children = Array.from(document.documentElement.querySelectorAll(selectordes)[0].children)
                    let descript :string[] = [];
                    
                    children.forEach(async (element) => {
                       
                        const text = element.textContent?.trim().replace('GPU:','').replace(/\s{2,} |:/g, '//')
                        descript.push(text !== undefined? text: '')

                    })

                    return {
                        description: descript
                    }

                }, selectordes)
                console.log(content.description)
                //let des = getDescriptions(content.description, man)
                let des = {}
                
                //await browser.close()
                return des

            }).catch(async (err: any) => {
                console.error("Scraping Error: " + err)
                await browser.close()
                
            })


            await browser.close()
            return page_result

            
    // }catch(e){
    //     console.error(e)
    //     return {}//{}
    // }finally{
    //     await browser.close()
    // }

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

let titles = [
    {
        brand: "ASUS ROG STRIX",
        model: "RX 570 O4G GAMING GRAPHICS"
    },    {
        brand: "Asus Rog Poseidon Platinum",
        model: "Geforce GTX 1080 Ti 11GB Graphics Card"
    },    {
        brand: "MSI",
        model: "GeForce RTX 3090 Gaming X TRIO 24GB"
    },    {
        brand: "MSI",
        model: "Radeon RX 6900 XT GAMING Z TRIO 16GB"
    },    {
        brand: "AMD",
        model: "Ryzen 9 5950X Processor"
    }

]

// for(let x in titles){
//     console.log(scrapeDescription(titles[x].brand, titles[x].model))
// }

//console.log(scrapeDescription("ASUS ROG STRIX", "RX 570 O4G GAMING GRAPHICS"))
scrape().then(r => {console.log(r)})