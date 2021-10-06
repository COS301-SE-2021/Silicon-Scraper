import {dataOps} from "../../../src/main/scraperDbOp";
import * as scraper from "../../../src/main/scraper"
import {stubBrowser, stubPage, stubPuppeteer} from '../../../__mocks__/puppeteerMocks'
// import '@types/jest';
// Mock axios

jest.mock("axios", () => {
    const eve = require("../../../__mocks__/mockUrl")
    let d: string = eve.getMockData()

    const mockedResponse = {
        data: d,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
    }

    return Object.assign(jest.fn(), {
        get: jest.fn().mockResolvedValue(mockedResponse)
    })
})
import axios from "axios";

jest.mock('cheerio', () => {
    return Object.assign(jest.fn(), {
        load: jest.fn().mockImplementation()
    })
})
import cheerio from 'cheerio'

jest.mock('puppeteer', () => ({
    launch() {
        return stubBrowser;
    }
}));
//import puppeteer from 'puppeteer'

//const mockAxios = axios as jest.Mocked<typeof axios>;

//mockAxios.get = jest.fn().mockResolvedValue(mockedResponse)

let pgp = jest.fn((connection) => ({
    none: jest.fn(() => Promise.resolve()) ,
    any: jest.fn(() => Promise.resolve([])),
    as: jest.fn(() => {
        format:jest.fn(() => "")

    }),
    helpers:jest.fn(() => {
        ColumnSet:jest.fn(() => "")
        insert:jest.fn((parm1, parm2) => {  [parm1, parm2]  })
    })
}))

let db = pgp("connection")

describe("scraper database operations", () =>{
    let mockAxios:any = undefined
    beforeAll(() => {
        mockAxios = jest.spyOn(axios, 'get')
        jest.spyOn(cheerio, 'load')
        jest.spyOn(stubPuppeteer, 'launch')
        
    })
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

     test("Testing the intergration between scraper and scraperDataOperations", async () => {
        jest.setTimeout(30000);
        const response = await (await dataOps(db)).getProducts()
        expect(response).toEqual("successful update")
        expect(mockAxios).toBeCalled()
     })



    test.skip("Get products should call scrape only once", async () => {
        const scraper_ = jest.spyOn(scraper,'scrape')
        const getProducts_ = jest.spyOn(dataOps(db), 'getProducts')
        await dataOps(db).getProducts()
        expect(scraper_).toHaveBeenCalled()

    })

    test.skip("Scrape should return the correct data when called by getProducts", async () => {

        const getProducts_ = jest.spyOn(dataOps(db), 'getProducts')
        const scraper_ = jest.spyOn(scraper,'scrape')
        await dataOps(db).getProducts().then(async () => {
            await expect(scraper_).toHaveBeenCalledTimes(3)

        })

   })

    test.skip("If the scrape return data when called by the get products", async () =>{
        const getProducts_ = jest.spyOn(dataOps(db), 'getProducts')
        const scraper_ = jest.spyOn(scraper,'scrape')
        await dataOps(db).getProducts().then(async () => {
            expect(scraper_).toHaveReturned()

        })
    })

})