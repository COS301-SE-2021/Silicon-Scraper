//import { Selectors } from "../src/utilities/selectors";

jest.mock("../src/utilities/selectors", () => {
    return {
        Selectors: jest.fn().mockImplementation(() => {
            return {
                getLinkSelector: () => {},
                getAvailabilitySelector: () => {},
                getImageSelector: () => {},
                getPriceSelector: () => {},
                getTitlrSelector: () => {},
                getTableSelector: () => {},
                getRowSelector: () => {}
            }
        })
    }
})

// const mockSelectors = () => ({
//     getAvailabilitySelector: jest.fn(),//.mockImplementation(() => {return 'availabilty_selector'}),
//     getLinkSelector: jest.fn(),//.mockImplementation(() => "link_selector"),
//     getImageSelector: jest.fn(),//.mockImplementation(() => {return "image_selector"}),
//     getTableSelector: jest.fn(),//.mockImplementation(() => {return "table_selector"}),
//     getRowSelector: jest.fn(),//.mockImplementation(() => {return "row_selector"}),
//     getTitleSelector: jest.fn(),//.mockImplementation(() => {return "title_selector"}),
//     getPriceSelector: jest.fn(),//.mockImplementation(() => "price_selection")
// })
// jest.mock("../../src/utilities/selectors.ts", mockSelectors)