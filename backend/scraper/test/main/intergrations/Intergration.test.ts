import {dataOps} from "../../../src/main/scraperDbOp";
import axios from "axios";
const eve = require("../../../__mocks__/mockUrl")
import * as scraper from "../../../src/main/scraper"
// Mock axios
jest.mock("axios")

let d: string = eve.getMockData()

const mockAxios = axios as jest.Mocked<typeof axios>;

const mockedResponse = {
    data: d,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
}

mockAxios.get = jest.fn().mockResolvedValue(mockedResponse)

let pgp = jest.fn(() => ({
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

let db = pgp()

describe("scraper database operations", () =>{
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

     test("Testing the intergration between scraper and scraperDataOperations", async () => {
        const response = await dataOps(db).getProducts()
        expect(response).toEqual("Successful")
     })

   //
   //
   //  test("Getproducts should call scrape only once", async () => {
   //      const scraper_ = jest.spyOn(scraper,'scrape')
   //      const getProducts_ = jest.spyOn(dataOps(db), 'getProducts')
   //      await dataOps(db).getProducts()
   //      expect(scraper_).toHaveBeenCalled()
   //  })
   //
   //  test("Scrape should return the correct data when called by getProducts", async () => {
   //
   //      const getProducts_ = jest.spyOn(dataOps(db), 'getProducts')
   //      const scraper_ = jest.spyOn(scraper,'scrape')
   //      return await dataOps(db).getProducts().then(async () => {
   //          await expect(scraper_).toHaveBeenCalledTimes(3)
   //      })
   //
   // })
   //
   //  test("If the scrape return data when called by the get products", async () =>{
   //      const getProducts_ = jest.spyOn(dataOps(db), 'getProducts')
   //      const scraper_ = jest.spyOn(scraper,'scrape')
   //      return await dataOps(db).getProducts().then(async () => {
   //      expect(scraper_).toHaveReturned()
   //      })
   //  })

})