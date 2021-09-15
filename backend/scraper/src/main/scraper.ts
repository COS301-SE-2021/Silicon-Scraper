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
import {Browser, JSHandle, Page} from "puppeteer";
import { getJSDocImplementsTags } from "typescript";


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
    console.log(url_man.url)
    if(url_man.url === "") return ""

    let man = url_man.manufacturer
    if(model.toUpperCase().includes("TI ")){
        man = man+" "+"ti"
    }

    const url = url_man.url
    const keys = Object.keys(manufacturesSelectorsArray)
    const index = keys.findIndex((key) => { return man.includes(key)}) //Finds matching selector index using the keys
    const selector = Object.values(manufacturesSelectorsArray)[index]

    let browser: Browser;
    try {

        browser = await puppeteer.launch({headless: false, dumpio: true})
            
            let page = await browser.newPage()
            await page.setDefaultNavigationTimeout(0);
            
            const page_result = await page.goto(url, {waitUntil: "networkidle0"}).then(async () => {
              
                page.on('console', msg => {
                    console.log("PAGE LOG:", msg.text())
                })
                const selectordes = selector.getDescriptions('search')
                const content = await page.evaluate(async (selectordes: string, model) => {
                    // add intel scraping
                    console.log(selectordes, document.documentElement.querySelectorAll(selectordes)[0])
                    let children = Array.from(document.documentElement.querySelectorAll(selectordes)[0].children)
                    let descript :string[] = [];
                    
                    children.forEach(async (element, idx) => {
                        console.log(model.includes(element.textContent?.split('Processor')[0].replace('Intel', '').trim()))
                        if(model.includes(element.textContent?.split('Processor')[0].replace('Intel', '').trim())){
                            const href = element.querySelectorAll(selector.getDescriptions('url'))[0].getAttribute('href')
                            console.log('href:', href)
                            await browser.close()
                            return
                            //await page.click()
                        }
                        const text = element.textContent?.trim().replace('GPU:','').replace(/\s{2,} |:/g, '//')
                        descript.push(text !== undefined? text: '')

                    })
                    return {
                        description: descript
                    }
                }, selectordes, model)
                
                let des = getDescriptions(content.description, man)
                if(des === {}) throw "Description Error: Unable to get descriptions"
                
                return des

            }).catch(async (err: any) => {
                await browser.close()
                throw "Scraping Error: " + err
            })

            await browser.close()
            return page_result
            
    }catch(e){
        console.error(e)
        return //{}
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

//scrape().then(r => {console.log(r)})
scrapeDescription("Intel", "Core i911900 11th Gen Processor").then( r=> {console.log('results', r)})

