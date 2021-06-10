const eve = require("../__mocks__/mockUrl.js")
const scraper = require("@main/scraper.ts")
const fs = require("fs")

let d = eve.getEveTechMockUrl()

module.exports = {
    get: jest.fn(() => Promise.resolve({data: d})),
    create: jest.fn(function () {
        return this;
    })

};