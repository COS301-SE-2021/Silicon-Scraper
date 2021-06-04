// const eve = require("../scraper/Mocks/mockUrl.js")
// const scraper = require("../../backend/scraper/main/scraper.js")
// const fs = require("fs")
//
// result = [ {
//     image: 'https://www.evetech.co.za/repository/components/msi-geforce-rtx-3090-suprim-x-24gb-gddr6x-300px-v1_sml.jpg',
//     brand: 'MSI',
//     model: 'GeForce RTX 3090 SUPRIM X 24GB',
//     price: 45999,
//     availability: 'Out of Stock',
//     link: 'https://www.evetech.co.za/msi-geforce-rtx-3090-suprim-x-24gb-gddr6x/best-deal/10956.aspx',
//     retailer: 'Evetech'
// },
//     {
//         image: 'https://www.evetech.co.za/repository/components/asus-rog-strix-rtx-3090-oc-24gb-white-gaming-300px-v1_sml.jpg',
//         brand: 'ASUS',
//         model: 'ROG Strix RTX 3090 OC 24GB White',
//         price: 45999,
//         availability: 'Out of Stock',
//         link: 'https://www.evetech.co.za/asus-rog-strix-rtx-3090-oc-24gb-white-gaming/best-deal/11400.aspx',
//         retailer: 'Evetech'
//     },
//     {
//         image: 'https://www.evetech.co.za/repository/components/nvidia-quadro-rtxa6000-48gb-gddr6-300px-v2_sml.jpg',
//         brand: 'NVIDIA',
//         model: 'Quadro RTX A6000 48GB',
//         price: 44999,
//         availability: 'Out of Stock',
//         link: 'https://www.evetech.co.za/nvidia-quadro-rtx-a6000-48gb-gddr6/best-deal/10457.aspx',
//         retailer: 'Evetech'
//     },
//     {
//         image: 'https://www.evetech.co.za/repository/components/msi-geforce-rtx-3090-gaming-x-trio-24gb-300px-v2_sml(1).jpg',
//         brand: 'MSI',
//         model: 'GeForce RTX 3090 Gaming X TRIO',
//         price: 44999,
//         availability: 'Out of Stock',
//         link: 'https://www.evetech.co.za/msi-geforce-rtx-3090-gaming-x-trio-24gb/best-deal/9685.aspx',
//         retailer: 'Evetech'
//     },
//     {
//         image: 'https://www.evetech.co.za/repository/components/asus-tuf-rtx-3090-oc-24gb-gaming-300px-v1_sml.jpg',
//         brand: 'ASUS',
//         model: 'TUF RTX 3090 OC 24GB',
//         price: 44999,
//         availability: 'Out of Stock',
//         link: 'https://www.evetech.co.za/asus-tuf-rtx-3090-oc-24gb-gaming/best-deal/9698.aspx',
//         retailer: 'Evetech'
//     },
//     {
//         image: 'https://www.evetech.co.za/repository/components/asus-rog-strix-rtx-3090-oc-24gb-gaming-300px-v1_sml.jpg',
//         brand: 'ASUS',
//         model: 'ROG Strix RTX 3090 OC 24GB',
//         price: 44499,
//         availability: 'Out of Stock',
//         link: 'https://www.evetech.co.za/asus-rog-strix-rtx-3090-oc-24gb-gaming/best-deal/9696.aspx',
//         retailer: 'Evetech'
//     }
//     ]
//
//
// /**
//  * This function reads contents of the mock html page, and calls the getWebData to scrape that page
//  * and compares the given data to the expected out
//  * param {string} Takes in a string url to the mock html
//  * return {void}
//  */
// fs.readFile(eve.getEveTechMockUrl(), 'utf8' , (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data)
//     // scraper.getWebData(data).then((products) => {
//     //     jest.test('Making a request to a mock html , and comparing it to the given expected output: ', () => {
//     //         expect(products).resolves.toBe(result)
//     //     })
//     // })
// })
//
//
// //Mock url
// let url = "../repository/components/asus-rog-strix-rtx-3090-oc-24gb-gaming-300px-v1_sml.jpg";
// let exp = "https://www.evetech.co.za/repository/components/asus-rog-strix-rtx-3090-oc-24gb-gaming-300px-v1_sml.jpg"
//
// jest.test("parsing the image or link url to link to the base url of the given website evetech" , () => {
//     expect(scraper.concatUrl(url)).toBe(exp)
// })
//
//
// jest.test("Takes unfilterd price and trims it to fit to a double criteria" , () => {
//     expect(scraper.trimPrice("R44,499/n/t/t/t/t/t/t/")).toBe(44499)
// })
//
//
// //Mock title
// let title = "ASUS ROG Strix RTX 3090 OC 24GB"
// let exp2 = ["ASUS", "ROG Strix RTX 3090 OC 24GB"]
//
// jest.test("Takes in a title and returns an array of the brand and the model", () => {
//     expect(scraper.titleParser(title)).toBe(exp2)
// })
