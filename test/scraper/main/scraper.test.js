const scrape = require('@main/scraper');
const mockAxios = require('axios')
const selectors = require('@utilities/EvetechSelectors')
const eve = require("../../__mocks__/mockUrl")

jest.mock('../../../backend/scraper/utilities/EvetechSelectors', () => ({
    getAvailabilitySelector: jest.fn().mockImplementation(() => {return 'availabilty_selector'}),
    getLinkSelector: jest.fn().mockImplementation(() => "link_selector"),
    getImageSelector: jest.fn().mockImplementation(() => {return "image_selector"}),
    getTableSelector: jest.fn().mockImplementation(() => {return "table_selector"}),
    getRowSelector: jest.fn().mockImplementation(() => {return "row_selector"}),
    getTitleSelector: jest.fn().mockImplementation(() => {return "title_selector"}),
    getPriceSelector: jest.fn().mockImplementation(() => "price_selection")
}
)) 

describe("scraperTest()", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
      });

    const index = 0;
    const select = [
        selectors.getAvailabilitySelector,
        selectors.getLinkSelector(index),
        selectors.getImageSelector(index),
        selectors.getTitleSelector(index),
        selectors.getTableSelector(),
        selectors.getPriceSelector(),
        selectors.getRowSelector()
    ]
    
    test('Should return array of products', async () =>{
        const products = await scrape.scrape();

        expect(mockAxios.get).toHaveBeenCalledTimes(2);
        expect(mockAxios.get).toHaveBeenNthCalledWith(1,'https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx')
        expect(mockAxios.get).toHaveBeenNthCalledWith(2, 'https://www.evetech.co.za/components/buy-cpu-processors-online-164.aspx')
        expect(selectors.getTableSelector).toHaveBeenCalled();
        select.forEach(element => {
            expect(element).toBeTruthy();
        });
        expect(products).not.toBeNull();
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

        const data = eve.getEveTechMockUrl();

        mockAxios.get.mockResolvedValueOnce( data )(() => Promise.resolve(data));
        const product = await scrape.scrape();
        expect(product).toEqual(expect.arrayContaining([]));
    
    })
})


