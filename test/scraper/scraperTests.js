const eve = require("../scraper/Mocks/mockUrl.js")
const scraper = require("../../backend/scraper/main/scraper.js")
const fs = require("fs")



//Mock url
let url = "../repository/components/asus-rog-strix-rtx-3090-oc-24gb-gaming-300px-v1_sml.jpg";
let exp = "https://www.evetech.co.za/repository/components/asus-rog-strix-rtx-3090-oc-24gb-gaming-300px-v1_sml.jpg"

test("parsing the image or link url to link to the base url of the given website evetech" , () => {
    expect(scraper.concatUrl(url)).toBe(exp)
})


test("Takes unfilterd price and trims it to fit to a double criteria" , () => {
    expect(scraper.trimPrice("R44,499/n/t/t/t/t/t/t/")).toBe(44499)
})


//Mock title
let title = "ASUS ROG Strix RTX 3090 OC 24GB"
let exp = ["ASUS", "ROG Strix RTX 3090 OC 24GB"]

test("Takes in a title and returns an array of the brand and the model", () => {
    expect(scraper.titleParser(title)).toBe(exp)
})
