import axios from "axios";

const eve = require("../__mocks__/mockUrl.js")
//import scraper from "@main/scraper.ts"
const fs = require("fs")

let d = eve.getEveTechMockUrl()

module.exports = {
    get: jest.fn(() => Promise.resolve({data: d})),
    create: jest.fn(function () {
        //return this;
    })

};