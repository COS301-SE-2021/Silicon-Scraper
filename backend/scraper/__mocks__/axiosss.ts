import axios from "axios";

const eve = require("./mockUrl")
//import scraper from "@main/scraper.ts"
//const fs = require("fs")

jest.mock("axios")

let d = eve.getEveTechMockUrl()

const mockedAxios = axios as jest.Mocked<typeof axios>;

export const mockedResponse = {
    data: d,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
}
// module.exports = {
//     get: jest.fn(() => Promise.resolve({data: d})),
//     create: jest.fn(function () {
//         //return this;
//     })

// };