    import {selectorsArray} from "../../src/utilities/selectors";

describe("EvetechSelectors()", () =>{
    let index = 3;
    let expected: string;
    
    expected ="_ctl"+((index<10?'0':'')+index);

    const select = [
        selectorsArray[0].getAvailabilitySelector(index),
        selectorsArray[0].getLinkSelector(index),
        selectorsArray[0].getImageSelector(index),
        selectorsArray[0].getTitleSelector(index)
    ]

    test('Return string containing index', () => {
        expect(select).toEqual(expect.arrayContaining([expect.stringMatching(expected)]));
    })

    test('Should not return an empty string', () =>{
        expect(select).toEqual(expect.not.arrayContaining([expect.stringMatching(/^$/)]));
    })

})