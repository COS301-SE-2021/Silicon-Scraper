import {dataOps} from "../../../src/main/scraperDbOp";
<<<<<<< HEAD
import * as scraper from "../../../src/main/scraper"
// Mock axios
=======

const eve = require("../../../__mocks__/mockUrl")
import * as scraper from "../../../src/main/scraper"
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
>>>>>>> 881a2296672cfc037f18474389ef966df8995f4a

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
    })
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

     test("Testing the intergration between scraper and scraperDataOperations", async () => {
        const response = await dataOps(db).getProducts()
        expect(response).toEqual("successful update")
        expect(mockAxios).toBeCalled()
     })



    test.skip("Get products should call scrape only once", async (done) => {
        const scraper_ = jest.spyOn(scraper,'scrape')
        const getProducts_ = jest.spyOn(dataOps(db), 'getProducts')
        await dataOps(db).getProducts()
        expect(scraper_).toHaveBeenCalled()
        done()
    })

    test.skip("Scrape should return the correct data when called by getProducts", async (done) => {

        const getProducts_ = jest.spyOn(dataOps(db), 'getProducts')
        const scraper_ = jest.spyOn(scraper,'scrape')
        await dataOps(db).getProducts().then(async () => {
            await expect(scraper_).toHaveBeenCalledTimes(3)
            done()
        })

   })

    test.skip("If the scrape return data when called by the get products", async (done) =>{
        const getProducts_ = jest.spyOn(dataOps(db), 'getProducts')
        const scraper_ = jest.spyOn(scraper,'scrape')
        await dataOps(db).getProducts().then(async () => {
            expect(scraper_).toHaveReturned()
            done()
        })
    })

})