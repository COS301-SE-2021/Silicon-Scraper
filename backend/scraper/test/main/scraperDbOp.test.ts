import {update, queryProducts, getProducts} from "../../src/main/scraperDbOp";
import axios from "axios";
import { scrape, scrapeSilon } from "../../src/main/scraper";
import { Product } from "../../src/utilities/productsModel";
//import { scrape } from "../../src/main/scraper";
//import { scrape } from "../../__mocks__/scraper";

const eve = require("../../__mocks__/mockUrl")
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
    description: "gpuDescr"
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
    description: ""
}]


jest.mock("../../src/main/scraper.ts")

const mockScrape = scrape as jest.MockedFunction<typeof scrape>
const mockScrapeSilon = scrapeSilon as jest.MockedFunction<typeof scrapeSilon>


//const pgp = pg-promise as jest.Mocked<typeof pg-promis>;

let pgp = jest.fn(() => ({
    none: jest.fn(),
    any: jest.fn(),
    as: jest.fn(() => {
        format:jest.fn()

    }),
    helpers:jest.fn(() => {
        ColumnSet:jest.fn()
    })
}))

jest.mock('pg-promise');

let db = pgp()

describe("Database operations tests", () => {
    let products: any;
    beforeEach(() =>{
        jest.resetModules();
        jest.resetAllMocks();
        products = [{
            gpu: gpus,
            cpu: cpus
        }]
        
    })

    afterAll((done) => {
        done();
    })

    test("should return product when found in database", async () =>{
        mockScrape.mockResolvedValue({
                gpu: gpus, 
                cpu: cpus
            })

        // mockScrapeSilon.mockResolvedValue({
        //     gpu: gpus,
        //     cpu: cpus
        // })
        return getProducts().then(products => {
            expect(scrape).toBeCalled();
        });
       //

        //await update(products);

    })

    test("should 404 when not found", () => {
        
    })

})

describe("Testing the data operation",  () => {
    test("should 404 when not found", () => {
        
           })


})