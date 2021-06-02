const eve = require("../scraper/Mocks/mockUrl.js")
const scraper = require("../../backend/scraper/main/scraper.js")
const fs = require("fs")




test("Takes unfilterd price and trims it to fit to a double criteria" , () => {
    expect(scraper.trimPrice("R44,499/n/t/t/t/t/t/t/")).toBe(44499)
})


//Mock title
let title = "ASUS ROG Strix RTX 3090 OC 24GB"
let exp = ["ASUS", "ROG Strix RTX 3090 OC 24GB"]

test("Takes in a title and returns an array of the brand and the model", () => {
    expect(scraper.titleParser(title)).toBe(exp)
})
