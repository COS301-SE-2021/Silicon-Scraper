const url = require("../../src/utilities/url");

describe("urlTest()", () => {
    const urls = [
        url.getEveTecCpuUrl(),
        url.getEveTecGpuUrl(),
        url.getEveTecUrl(),
        url.getAmpTekGpuUrl(),
        url.getAmpTekCpuUrl(),
        url.getDreamwareGpuUrl(),
        url.getDreamwareCpuUrl(),
        url.getEveTecUrl(),
        url.getAmpTekUrl(),
        url.getDreamwareUrl()
    ]

    test('Should not return an empty string', () => {
        expect(urls).toEqual(expect.not.arrayContaining([expect.stringMatching(/^$/)]));
    })

    test("Should return a valid url", () => {
        expect(urls).toEqual(expect.arrayContaining([expect.stringMatching(/^(https:|http:|www\.)\S*/)]))
    })
})