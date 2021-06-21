import { selectorsArray } from "../../src/utilities/selectors";

describe("selectorsTest()", () =>{
    let index = 3;
    let expected = "_ctl"+((index<10?'0':'')+index);
    let select: any = [];
    for(let i = 0; i<selectorsArray.length; i++){
        select.push(selectorsArray[i].getAvailabilitySelector(index))
        select.push(selectorsArray[i].getImageSelector(index));
        select.push(selectorsArray[i].getLinkSelector(index));
        select.push(selectorsArray[i].getTitleSelector(index));
        select.push(selectorsArray[i].getPriceSelector());
        select.push(selectorsArray[i].getRowSelector());
        select.push(selectorsArray[i].getTableSelector());
    }

    test('Should not return an empty string', () =>{
        expect(select).toEqual(expect.not.arrayContaining([expect.stringMatching(/^$/)]));
    })

    describe("Evetech selectors", () => {
        let evetech: any = [];
        beforeEach(() =>{
            evetech = [
                selectorsArray[0].getAvailabilitySelector(index),
                selectorsArray[0].getLinkSelector(index),
                selectorsArray[0].getImageSelector(index),
                selectorsArray[0].getTitleSelector(index)
            ]
            index = -1;
        })
    
        test('Return string containing index', () => {
            expect(evetech).toEqual(expect.arrayContaining([expect.stringMatching(expected)]));
        });

    })

})