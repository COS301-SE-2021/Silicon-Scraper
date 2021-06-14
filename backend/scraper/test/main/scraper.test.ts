import axios from "axios";
import * as scraper  from "../../src/main/scraper";
import { selectorsArray } from "../../src/utilities/selectors";
//const scrape = require('../../src/main/scraper');

const eve = require("../../__mocks__/mockUrl")
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

let d = eve.getEveTechMockUrl()
export const mockedResponse = {
    data: d,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {},
}
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
    
     
    const index = 0;
    const select = [
        selectorsArray[0].getAvailabilitySelector(),
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
    
    test.skip('Should return array of products', async () =>{
        const products = await scraper.scrape();
        // mockAxios.get.mockResolvedValueOnce(mockedResponse);
        // expect(mockAxios.get).toHaveBeenCalledTimes(2);
        // expect(mockAxios.get).toHaveBeenNthCalledWith(1,'https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx')
        // expect(mockAxios.get).toHaveBeenNthCalledWith(2, 'https://www.evetech.co.za/components/buy-cpu-processors-online-164.aspx')
        // expect(selectorsArray[0].getTableSelector).toHaveBeenCalled();
        select.forEach(element => {
            expect(element).toBeTruthy();
        });
       //expect(products).not.toBeNull();
    })

    test.skip("fetches data successfully", async () =>{
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
        // const product = await scrape.scrape();
        // expect(product).toEqual(expect.arrayContaining([]));
    
    })
})


