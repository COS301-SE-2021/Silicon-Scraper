// const scrape_description = async () => {
//     console.log("scraping descriptions")
//     const browserFetcher = puppeteer.createBrowserFetcher();
//     const revisionInfo = await browserFetcher.download('901912');
    
//     let browser: Browser = await puppeteer.launch({headless: false, args: ['--no-sandbox'], executablePath: revisionInfo.executablePath});

//     const qty = 5
//     const all_products = products.cpu.concat(products.gpu)

//     const prods = (await Promise.allSettled(
//         urls = await bluebird.map(all_products, async (prod) => {
//             const page = await browser.newPage()
//             const url = prod.decriptionUrl.url
//             const selector = prod.decriptionUrl.selector
//             await page.goto(url, {waitUntil: 'networkidle0'});
//             return page.$eval(selector, (element) => {
//                 const children = Array.from(element.children)
//                 children.forEach(el => {
//                     const text = el.textContent?.trim().replace('GPU:','').replace(/\s{2,} |:/g, '//')
//                     //descript.push(text !== undefined? text: '')
//                     return text
//                 });
//             })
//         }, {concurrency: 10})
//     )).filter(e => e.status === "fulfilled")
//     .map(e => e)

//     await browser.close()

//     console.log(prods)
  
// }
