const url = require("../src/utilities/url")
import { getEveTecGpuUrl } from "../src/utilities/url"
import { mockFunction } from "./JestHelpers"

jest.mock("../src/utilities/url")

let getEveTecGpuUrlMock = getEveTecGpuUrl as jest.MockedFunction<typeof getEveTecGpuUrl>//mockFunction(url.getEveTecGpuUrl);
getEveTecGpuUrlMock = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )

let getEveTecCpuUrl = url.getEveTecCpuUrl as jest.MockedFunction<typeof url.getEveTecCpuUrl>;
getEveTecCpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )

let getAmpTekGpuUrl = url.getAmpTekGpuUrl as jest.MockedFunction<typeof url.getAmpTekGpuUrl>;
getAmpTekGpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )

let getAmpTekCpuUrl = url.getAmpTekCpuUrl as jest.MockedFunction<typeof url.getAmpTekCpuUrl>;
getAmpTekCpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )

let getDreamwareGpuUrl = url.getDreamwareGpuUrl as jest.MockedFunction<typeof url.getDreamwareGpuUrl>;
getDreamwareGpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} )
let getDreamwareCpuUrl = url.getDreamwareCpuUrl as jest.MockedFunction<typeof url.getDreamwareCpuUrl>;
getDreamwareCpuUrl = jest.fn().mockResolvedValue({
    urls: ["https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx"]
} );

const getAmptekUrl = mockFunction(url.getAmpTekUrl);
const getDreamwareUrl = mockFunction(url.getDreamwareUrl);
const getEveTecUrl = mockFunction(url.getEveTecUrl);

export const urls = [getEveTecGpuUrlMock,getEveTecCpuUrl,getAmpTekGpuUrl,getAmpTekCpuUrl,getDreamwareGpuUrl, getDreamwareCpuUrl]//,getAmptekUrl,getDreamwareUrl,getEveTecUrl];

// const mockUrls = () => ({
//     getAmpTekCpuUrl: jest.fn(),
//     getEveTecGpuUrl: jest.fn(),
//     getDreamwareCpuUrl: jest.fn(),
//     getDreamwareGpuUrl: jest.fn(),
//     getEveTecGpuUrlMock: jest.fn(),
//     getEveTecCpuUrl: jest.fn(),

// })
// jest.mock("../../src/utilities/url.ts", mockUrls);