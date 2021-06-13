const url = require("@utilities/url.ts");

describe("urlTest()", () => {
    const urls = [
        url.getEveTecCpuUrl(),
        url.getEveTecGpuUrl(),
        url.getEveTecUrl(),
        url.getAmpTekCpuUrl(),
        url.getAmpTekGpuUrl(),
        url.getDreamwareCpuUrl(),
        url.getDreamwareGpuUrl()
    ]

    test('Should not return an empty string', () => {
        expect(urls).toEqual(expect.not.arrayContaining([expect.stringMatching(/^$/)]));
    })

    test("Should return a valid url", () => {
        expect(urls).toEqual(expect.arrayContaining([expect.stringMatching(/^(https:|http:|www\.)\S*/)]))
    })
})