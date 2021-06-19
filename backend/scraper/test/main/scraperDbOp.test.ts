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

    //  test("Should call the query function only twice", async() => {
    //      await update({"gpu":["g1", "g2"], "cpu":["c1", "c2"]})
    //      expect(db.any.call.length).toBe(1)
    //  })
    //
    // test("When db is empty it should call exeQuery twice", async() =>{
    //     await update({"gpu":["g1", "g2"], "cpu":["c1", "c2"]})
    //     expect(db.none.call.length).toBe(1)
    // })
    //
    // test("", async () => {
    //     await queryProducts("gpu", [])
    // })

})