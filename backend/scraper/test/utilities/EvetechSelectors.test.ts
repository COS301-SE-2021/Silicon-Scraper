//import * as selectorsArray from "../../src/utilities/selectors";
let selectors = require("../../src/utilities/selectors.ts").selectorsArray;

describe("EvetechSelectors()", () =>{
    let index = 3;
    let expected = "_ctl"+((index<10?'0':'')+index);

    const select = [
        selectors[0].getAvailabilitySelector(index),
        selectors[0].getLinkSelector(index),
        selectors[0].getImageSelector(index),
        selectors[0].getTitleSelector(index)
    ]

    test('Return string containing index', () => {
        expect(select).toEqual(expect.arrayContaining([expect.stringMatching(expected)]));
    })

    test('Should not return an empty string', () =>{
        expect(select).toEqual(expect.not.arrayContaining([expect.stringMatching(/^$/)]));
    })

})