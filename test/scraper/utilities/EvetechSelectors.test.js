const selectors = require("@utilities/EvetechSelectors");

describe("EvetechSelectors()", () =>{
    let index = 3;
    let expected;
    
    expected ="_ctl"+((index<10?'0':'')+index);

    const select = [
        selectors.getAvailabilitySelector(index),
        selectors.getLinkSelector(index),
        selectors.getImageSelector(index),
        selectors.getTitleSelector(index)
    ]

    test('Return string containing index', () => {
        expect(select).toEqual(expect.arrayContaining([expect.stringMatching(expected)]));
    })

    test('Should not return an empty string', () =>{
        expect(select).toEqual(expect.not.arrayContaining([expect.stringMatching(/^$/)]));
    })

})