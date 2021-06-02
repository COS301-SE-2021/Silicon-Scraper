const scrape = require('../../../backend/scraper/main/scraper');
const mockAxios = require('axios')
const selectors = require('../../../backend/scraper/utilities/EvetechSelectors')

jest.mock('../../../backend/scraper/utilities/EvetechSelectors', () => ({
    getAvailabilitySelector: jest.fn().mockImplementation(() => {return 'availabilty_selector'}),
    getLinkSelector: jest.fn().mockImplementation(() => "link_selector"),
    getImageSelector: jest.fn().mockImplementation(() => {return "image_selector"}),
    getTableSelector: jest.fn().mockImplementation(() => {return "table_selector"}),
    getRowSelector: jest.fn().mockImplementation(() => {return "row_selector"}),
    getTitleSelector: jest.fn().mockImplementation(() => {return "title_selector"}),
    getPriceSelection: jest.fn().mockImplementation(() => "price_selection")
}
)) 

describe("scraperTest()", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
      });

    test('Should return array of products', async () =>{
        const products = await scrape.scrape();
        expect(products).not.toBeNull();
        expect(mockAxios.get).toHaveBeenCalledTimes(2);
        expect(mockAxios.get).toHaveBeenNthCalledWith(1,'https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx')
        expect(mockAxios.get).toHaveBeenNthCalledWith(2, 'https://www.evetech.co.za/components/buy-cpu-processors-online-164.aspx')
        expect(selectors.getAvailabilitySelector).toBeTruthy()

    })

    test.skip("fetches data successfully", async () =>{
        const data = {
            image: "image",
            brand: "brand",
            model: "model",
            price: "test",
            availability: "availability",
            link: "link",
            retailer: "retailer"
        };



        
        mockAxios.get.mockResolvedValueOnce( data )(() => Promise.resolve(data));
        expect(scrape.scrape()).resolves.toEqual(data);
    
    })
})


