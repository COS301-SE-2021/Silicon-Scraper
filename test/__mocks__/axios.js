const eve = require("../scraper/Mocks/mockUrl.js")
const scraper = require("../../backend/scraper/main/scraper.js")
const fs = require("fs")

let d = ""

fs.readFile(eve.getEveTechMockUrl(), 'utf8' , (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    d = data;
})

module.exports = {
    get: jest.fn(() => Promise.resolve({data: {
            d
        }})),
    create: jest.fn(function () {
        return this;
    })

};

