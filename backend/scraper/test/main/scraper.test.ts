//import { mockAxios } from "../../__mocks__/axios";
import * as scraper  from "../../src/main/scraper";
//import { selectorsArray } from "../../src/utilities/selectors";
import { urls } from "../../__mocks__/urlMock";
import axios from "axios"
import { getEveTecGpuUrl } from "../../src/utilities/url";
import { selectorsArray } from "../../src/utilities/selectors";
const url = require("../../src/utilities/url")

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

//Mock urls

jest.mock("../../src/utilities/url")

let getEveTecGpuUrlMock = getEveTecGpuUrl as jest.MockedFunction<typeof getEveTecGpuUrl>
getEveTecGpuUrlMock = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )

let getEveTecCpuUrl = url.getEveTecCpuUrl as jest.MockedFunction<typeof url.getEveTecCpuUrl>;
getEveTecCpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )

let getAmpTekGpuUrl = url.getAmpTekGpuUrl as jest.MockedFunction<typeof url.getAmpTekGpuUrl>;
getAmpTekGpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )

let getAmpTekCpuUrl = url.getAmpTekCpuUrl as jest.MockedFunction<typeof url.getAmpTekCpuUrl>;
getAmpTekCpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )

let getDreamwareGpuUrl = url.getDreamwareGpuUrl as jest.MockedFunction<typeof url.getDreamwareGpuUrl>;
getDreamwareGpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )
let getDreamwareCpuUrl = url.getDreamwareCpuUrl as jest.MockedFunction<typeof url.getDreamwareCpuUrl>;
getDreamwareCpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} );



//const scrape = require('../../src/main/scraper');

// jest.mock('../../src/utilities/selectors', () => ({
//     getAvailabilitySelector: jest.fn().mockImplementation(() => {return 'availabilty_selector'}),
//     getLinkSelector: jest.fn().mockImplementation(() => "link_selector"),
//     getImageSelector: jest.fn().mockImplementation(() => {return "image_selector"}),
//     getTableSelector: jest.fn().mockImplementation(() => {return "table_selector"}),
//     getRowSelector: jest.fn().mockImplementation(() => {return "row_selector"}),
//     getTitleSelector: jest.fn().mockImplementation(() => {return "title_selector"}),
//     getPriceSelector: jest.fn().mockImplementation(() => "price_selection")
// }
// )) 

describe("scraperTest()", () => {
    let title: string; 
    let parsedTitle: any;
    let trimedPrice: number;

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
        title = "MSI GeForce RTX 3090 SUPRIM X 24GB GDDR6X"
        parsedTitle = scraper.titleParser(title) ;
        trimedPrice = scraper.trimPrice("from R 50000");
      });
    
    afterAll(done => {
        done();
    })

    const index = 0;
    const select = [
       // selectorsArray[0].getAvailabilitySelector(),
    //    elector[1].getAvailabilitySelector(),
    //    selector.selectorsArray[0].getLinkSelector(index),
    //    selector.selectorsArray[0].getImageSelector(index),
    //    selector.selectorsArray[0].getTitleSelector(index),
    //    selector.selectorsArray[0].getTableSelector(),
    //    selector.selectorsArray[0].getPriceSelector(),
    //    selector.selectorsArray[0].getRowSelector()
    ]

    test("Should not return empty string", () => {
        expect(parsedTitle).toEqual(expect.not.stringMatching(/^$/));
        expect(trimedPrice.toString()).toEqual(expect.not.stringMatching(/^$/));
    })

    test("Returns parsed title", () => {
        const expected = {
            'brand': 'MSI',
            'model': 'GeForce RTX 3090 SUPRIM X 24GB'// GDDR6X'
        }
        expect(parsedTitle).toEqual(expected);
    })

    test("Returns trimed price", () => {
        expect(trimedPrice).toEqual(50000);
    })

    test("Should concatenate base url", () => {
        let urlOld = "../collections/gpus"
        const base = "https://baseUrl.com/"
        let expected = base+"collections/gpus"
        const concat = scraper.concatUrl(urlOld, base);
        expect(concat).toBe(expected);

        urlOld = "/p/collections"
        expected = base+urlOld
        expect(scraper.concatUrl(urlOld, base)).toBe(expected)
    })

    test("Should produce concatenation error", () => { // this should fail
        expect(scraper.concatUrl("", "")).toBe("");
    })
    
    test('Should return array of products', async () =>{
        console.log(getEveTecGpuUrlMock())
        urls.forEach(element => {
            expect(element).toBeTruthy();
        });
        const product = await scraper.scrapeSilon(getEveTecGpuUrlMock().urls, selectorsArray[0], "https://www.dreamwaretech.co.za/", "gpu");
        
        //expect(mockAxios.get).toHaveBeenCalledTimes(33);
        expect(getEveTecGpuUrlMock).toBeCalled();
        //for(const url_ in urls){
            //expect(mockAxios.get).toHaveBeenCalledWith(urls[0]().urls);
        //}

        
        // expect(mockAxios.get).toHaveBeenNthCalledWith(2, 'https://www.evetech.co.za/components/buy-cpu-processors-online-164.aspx')
        // expect(selectorsArray[0].getTableSelector).toHaveBeenCalled();
        
       //expect(products).not.toBeNull();
    })

    test("fetches data successfully", async () =>{
        const expected = {
            image: "image",
            brand: "brand",
            model: "model",
            price: "test",
            availability: "availability",
            link: "link",
            retailer: "retailer"
        };

        //const data = eve.getEveTechMockUrl();

       // mockAxios.get.mockResolvedValueOnce( data )(() => Promise.resolve(data));
      //  const product = await scraper.scrape();
        // expect(product).toEqual(expect.arrayContaining([]));
    
    })
})


