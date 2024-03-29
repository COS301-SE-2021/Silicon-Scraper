import * as scraper  from "../../src/main/scraper";
import * as parser from "../../src/utilities/parser"
import { urls } from "../../__mocks__/urlMock";
// import axios from "axios"
import { selectorsArray } from "../../src/utilities/selectors";

const eve = require("../../__mocks__/mockUrl")

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

describe("scraperTest()", () => {
    let title: string; 
    let parsedTitle: any;
    let trimedPrice: any;

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        title = "MSI GeForce RTX 3090 SUPRIM X 24GB GDDR6X";
        parsedTitle = parser.titleParser(title) ;
        trimedPrice = parser.trimPrice("from R 50000");
      });
    
    afterAll(done => {
        done();
    })
    

    test("Should not return empty string", () => {
        expect(parsedTitle).toEqual(expect.not.stringMatching(/^$/));
        expect(trimedPrice.toString()).toEqual(expect.not.stringMatching(/^$/));
    })

    test("Returns parsed title", () => {
        const expected = {
            'brand': 'MSI',
            'model': 'GeForce RTX 3090 SUPRIM X 24GB GDDR6X'
        }
        expect(parsedTitle).toEqual(expected);
    })

    test("Returns trimed price", () => {
        expect(trimedPrice).toEqual(50000)
        expect(parser.trimPrice("50000")).toEqual(undefined);
    })

    test("Should concatenate base url", () => {
        let urlOld = "../collections/gpus"
        const base = "https://baseUrl.com/"
        let expected = base+"collections/gpus"
        const concat = parser.concatUrl(urlOld, base);
        expect(concat).toBe(expected);

        urlOld = "/p/collections"
        expected = base+urlOld
        expect(parser.concatUrl(urlOld, base)).toBe(expected)
    })

    test("Should produce concatenation error", () => { // this should fail
        expect(parser.concatUrl("", "")).toBe("");
        expect(parser.concatUrl(undefined, "baseurl")).toBe("https://www.evetech.co.za/")
    })
    
    test('Should return array of products', async () =>{
        let product;
        urls.forEach(element => {
            expect(element).toBeTruthy();
        });
        for(let i = 0; i<urls.length; i++){
            product = await scraper.scrapeSilon(urls[i](), selectorsArray[0], "https://www.evetech.co.za/", urls[i]().type);
            expect(urls[i]).toBeCalled();
        }
        
        expect(mockAxios.get).toHaveBeenCalled();
        for(let i = 0; i<urls.length; i++){
            expect(mockAxios.get).toHaveBeenCalledWith(urls[i]());
        }
        
        expect(product).toEqual(expect.arrayContaining([]))
        expect(product).not.toBeNull();
        // expect(product?.cpu).not.toBeNull();
        // expect(product?.gpu).not.toBeNull();
       
    })
})


