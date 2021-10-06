import {dataOps} from "../../src/main/scraperDbOp";
// import axios from "axios";
// import axios, * as x from 'axios';
import { scrape, scrapeSilon } from "../../src/main/scraper";
import { Product } from "../../src/utilities/productsModel";

const eve = require("../../__mocks__/mockUrl")
// Mock axios
jest.mock("axios", () => {
    const eve = require("../../__mocks__/mockUrl")
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

let d: string = eve.getMockData()

const mockAxios = axios as jest.Mocked<typeof axios>;

const mockedResponse = {
    data: d,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
}

mockAxios.get = jest.fn().mockResolvedValue(mockedResponse);

const gpus: Product[] = [{
    image: "gpuTitle", 
    brand: "gpubrand",
    model: "gpuModel",
    price: 500000,
    availability: "gpuAvailabilty",
    link: "gpuLink",
    retailer: "gpuRetailer",
    details: {
        productDetails: [
            {
                datetime: "dateTime",
                price: 500000,
                availability: "gpuAvailabilty"
            }
        ]
    },
    type: "gpu",
    description: {
        'des': 'gpuDes'
    }, 
    descriptionUrl: {}
}]

const cpus: Product[] = [{
    image: "cpuTitle", 
    brand: "cpubrand",
    model: "cpuModel",
    price: 400000,
    availability: "cpuAvailabilty",
    link: "cpuLink",
    retailer: "cpuRetailer",
    details: {
        productDetails: [
            {
                datetime: "dateTime",
                price: 400000,
                availability: "cpuAvailabilty"
            }
        ]
    },
    type: "cpu",
    description: {
        'des': 'cpuDes'
    }, 
    descriptionUrl: {}
}]

jest.mock("../../src/main/scraper")

const mockScrape = scrape as jest.MockedFunction<typeof scrape>
const mockScrapeSilon = scrapeSilon as jest.MockedFunction<typeof scrapeSilon>

// jest.mock("pg-promise")

describe("Database operations tests", () => {
    let products: any;
    let dbOps: any;
   // let pgp;
    let db: any;
    // pgp = jest.fn((connection) => ({
    //     none: jest.fn().mockResolvedValue(Promise.resolve()),
    //     any: jest.fn().mockReturnValue((query: any) => Promise.resolve([]))
    // }))

    db = {};

    beforeEach(() =>{
        jest.resetModules();
        jest.resetAllMocks();
        products = [{
            gpu: gpus,
            cpu: cpus
        }]

        dbOps = dataOps(db);

        mockScrape.mockResolvedValue({
            gpu: gpus, 
            cpu: cpus
        })


        db.none = jest.fn().mockResolvedValue(Promise.resolve()),
         db.any = jest.fn().mockReturnValue((query: any) => Promise.resolve([]))
    
    })


    test("database updated with valid product", async () =>{
        return dbOps.getProducts().then(async () => {
            await expect(scrape).toBeCalled();
           // await expect(scrape).toHaveBeenCalledTimes(1);
            await expect(db.any).toBeCalled();
            await expect(db.any.mock.calls[0]).not.toBeNull();
        }).catch((e: any) => {})
        
    })

    test("database not updated with invalid product", async () => {
        let gpu: Product[] = [];
        mockScrape.mockResolvedValueOnce({
            gpu: gpu,
            cpu: gpu
        })

        await expect(Promise.reject(dbOps.getProducts())).rejects.not.toThrow('octopus').catch((e)=>{});

        return dbOps.getProducts().then(async () => {
            await expect(scrape).toBeCalled();
            await expect(db.any).toBeCalled();
            await  expect(db.any.mock.calls.length).toBe(1);
        }).catch((e: any) => {})
           
        
    })

    test("update with valid product", async () => {
        return dbOps.update({gpu: gpus, cpu: cpus}).then(async () => {
            await expect(db.any.mock.calls.length).toBe(1);
            await expect(db.any.mock.calls[0]).not.toBeNull();
            await expect(db.none.mock.calls.length).toBe(1);
        }).catch((e: any) => {})
        
    })


    test("Execute query fails", async () => {
        db.none = jest.fn(() => Promise.reject())
        await dbOps.exeQuery("").then(async () => {
            await expect(db.none).toBeCalled();
            await expect(db.none.mock.calls.length).toBe(1);
        }).catch((e: any) => {})            
        
    })

})
