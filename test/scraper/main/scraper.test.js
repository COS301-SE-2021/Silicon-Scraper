const scrape = require('../../../backend/scraper/main/scraper');
const mockedAxios = require('axios')

describe("scraperTest()", () => {
    //jest.mock('../../__mocks__/axios');
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
      });

    test('fetches data successfully', async () => scrape.scrapeSilon()
        .then((response) => {
            expect(response).toEqual({
                image: "image",
                title: "title",
                price: "test",
                availability: "availability",
                link: "link",
                retailer: "retailer"
            })
        }))
})

// const data = {
//     image: "image",
//     title: "title",
//     price: "test",
//     availability: "availability",
//     link: "link",
//     retailer: "retailer"
// };

// mockedAxios.get.mockResolvedValueOnce(data)(() => Promise.resolve(data));

// await expect(scrapeSilon).resolves.toEqual(data);