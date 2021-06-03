const eve = require("../__mocks__/mockUrl.js")
const scraper = require("../../backend/scraper/main/scraper.js")
const fs = require("fs")

let d = eve.getEveTechMockUrl()


module.exports = {
    get: jest.fn(() => Promise.resolve({data: {
            d
        }})),
    create: jest.fn(function () {
        return this;
    })

};

