import {manufacturesSelectorsArray, Selectors} from "../utilities/selectors";
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
import {Browser, Page} from "puppeteer";


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

    let description: string[] = []
    //const url_man = manufacturerUrl(brand, model)
    const url_man = {
        url: "https://www.amd.com/en/products/graphics/amd-radeon-rx-6800-xt",
        manufacturer: "amd"
    }
    if(url_man.url === "") return ""

    let man = url_man.manufacturer
    if(model.toUpperCase().includes("TI ")){
        man = man+" "+"ti"
    }

    const url = url_man.url
    const keys = Object.keys(manufacturesSelectorsArray)
    const index = keys.findIndex((key) => { return key === man}) //Finds matching selector index using the keys
    const selector = Object.values(manufacturesSelectorsArray)[index]



    try {
         //const html = await axios.get(url);


//         const fs = require('fs')
//
// // Data which will write in a file.
//         let data = html.data
//
// // Write data in 'Output.txt' .
//         fs.writeFile('Output.txt', data, (err: any) => {
//
//             // In case of a error throw err.
//             if (err) throw err;
//         })
        // const browser = await puppeteer.launch({
        //     headless:false,
        //     args: ["--no-sandbox" , "--disabled-setupid-sandbox"]
        // });

        return puppeteer.launch({headless: false}).then(async (browser: Browser ) => {
            
            let page = await browser.newPage()
            await page.setDefaultNavigationTimeout(0);
            return page.goto(url, {waitUntil: 'domcontentloaded'}).then(async () => {
                //await page.screenshot({path: 'image.png'})
                const content = await page.evaluate(async () => {
                    //let html = document.documentElement.innerHTML
                    let descript = document.documentElement.querySelectorAll('#product-specs > div > fieldset:nth-child(3) > div')[0].innerHTML
                    return {
                        description: descript
                    }
                })

                //let results = await content.then(async (html) => {
                    console.log(content.description)
                    // const $ = await cheerio.load(content.html);
                    // console.log(selector.getDescriptions())
                    // console.log($(selector.getDescriptions()).length)

                    // const children = $(selector.getDescriptions()).children()
                    // if(children !== undefined){
                    //     console.log('getchildren')
                    //     children.each((i: any, row: any) =>{
                    //         //push into an array of descriptions with key values
                    //         console.log("Hello")
                    //         description.push($(row).text().replace("\\n", "/").replace(":", "/"))
                    //     })
                    // }else{
                    //     console.log('Unable to fetch results')
                    // }
                    
                    // console.log('description', description)
                    // let des = getDescriptions(description, man)

                     await browser.close()
                    // console.log('getDes', des)
                    // return des
                //});

                
                return 

            })//.then(async (html:string) =>{

                    
                //})
            
        }).catch((err: any) => {
            console.warn(err)
        })


         //const $ = await cheerio.load(html);
        // console.log(selector.getDescriptions())
        //
        // console.log($(selector.getDescriptions()).length)
        //
        // $(selector.getDescriptions()).children().each((i: any, row: any) =>{
        //     //push into an array of descriptions with key values
        //     console.log("Hello")
        //     description.push($(row).text().replace("\\n", "/").replace(":", "/"))
        // })
        //
        // return getDescriptions(description, man)
    }catch(e){
        console.warn(e)
        return {status: 'fail'}
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
scrapeDescription("MSI", "Radeon RX 6800 xt ").then( r=> {console.log('results', r)})

