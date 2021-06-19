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
