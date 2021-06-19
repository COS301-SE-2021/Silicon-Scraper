import {update, queryProducts, getProducts} from "../../src/main/scraperDbOp";


let pgp = jest.fn(() => ({
    none: jest.fn(),
    any: jest.fn(),
    as:jest.fn(() => {
        format:jest.fn()

    }),
    helpers:jest.fn(() => {
        ColumnSet:jest.fn()
    })
}))

let db = pgp()

describe("Database operations tests", () => {
    test("should return product when found in database", () =>{

    })

    test("should 404 when not found", () => {
        
    })

})

describe("Testing the data operation",  () => {



})