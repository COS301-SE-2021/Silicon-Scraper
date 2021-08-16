import { CPU } from "../../src/entity/cpu";

/**
 * @constant {Object} - Contains data from db to be used for testing
 */

interface Product {
    id: string,
    image: string,
    brand: string,
    model: string,
    price: number,
    availability: string,
    retailer: string,
    link: string,
    description: string,
    type: string
    watch?: null | boolean
}

export const mockData: Product[] = [
    {
        id: "1b6d0e22-ca06-414a-80b8-1ca634f29d6e",
        image: "https://www.evetech.co.za/repository/components/asus-rog-strix-rtx-3090-oc-24gb-white-gaming-300px-v1_sml.jpg",
        brand: "ASUS",
        model: "ROG Strix RTX 3090 OC 24GB White",
        price: 45999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/asus-rog-strix-rtx-3090-oc-24gb-white-gaming/best-deal/11400.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "f245fba8-3b36-4e63-984b-cd7ad7d57451",
        image: "https://www.evetech.co.za/repository/components/asus-tuf-rtx-3090-oc-24gb-gaming-300px-v1_sml.jpg",
        brand: "ASUS",
        model: "TUF RTX 3090 OC 24GB",
        price: 44999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/asus-tuf-rtx-3090-oc-24gb-gaming/best-deal/9698.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "7223c468-7908-41db-a7fb-c30a5ca5ec7f",
        image: "https://www.evetech.co.za/repository/components/nvidia-quadro-rtxa6000-48gb-gddr6-300px-v2_sml.jpg",
        brand: "NVIDIA",
        model: "Quadro RTX A6000 48GB",
        price: 44999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/nvidia-quadro-rtx-a6000-48gb-gddr6/best-deal/10457.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "1d9ae105-f9b1-4e44-ad4b-5ee1d7ca4550",
        image: "https://www.evetech.co.za/repository/components/asus-rog-strix-rtx-3090-oc-24gb-gaming-300px-v1_sml.jpg",
        brand: "ASUS",
        model: "ROG Strix RTX 3090 OC 24GB",
        price: 44499,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/asus-rog-strix-rtx-3090-oc-24gb-gaming/best-deal/9696.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "15dead02-4987-4fa6-a984-149e88670934",
        image: "https://www.evetech.co.za/repository/components/asus-rog-strix-rtx-3090-24gb-gaming-300px-v1_sml.jpg",
        brand: "ASUS",
        model: "ROG Strix RTX 3090 24GB",
        price: 44499,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/asus-rog-strix-rtx-3090-24gb-gaming/best-deal/9697.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "5f407cf0-a1f0-4989-b093-367da7965226",
        image: "https://www.evetech.co.za/repository/components/gigabyte-rtx-3090-gaming-oc-24gb-graphics-card-300px-v1_sml.jpg",
        brand: "Gigabyte",
        model: "RTX 3090 GAMING OC 24GB Graphics",
        price: 43999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/gigabyte-rtx-3090-gaming-oc-24gb-graphics-card/best-deal/10547.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "36f27897-712e-4277-a5eb-03a453f9a085",
        image: "https://www.evetech.co.za/repository/components/aorus-geforce-rtx-3090-xtreme-24gb-graphics-card-300px-v1_sml.jpg",
        brand: "AORUS",
        model: "GeForce RTX 3090 XTREME 24GB Graphics",
        price: 41999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/aorus-geforce-rtx-3090-xtreme-24gb-graphics-card/best-deal/10559.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "07945e91-b0cd-40e6-a963-0f480eaff192",
        image: "https://www.evetech.co.za/repository/components/asus-tuf-rtx-3090-24gb-gaming-300px-v1_sml.jpg",
        brand: "ASUS",
        model: "TUF RTX 3090 24GB",
        price: 40699,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/asus-tuf-rtx-3090-24gb-gaming/best-deal/9699.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "840f791b-90a1-4572-a1dd-7eb5746eb424",
        image: "https://www.evetech.co.za/repository/components/msi-geforce-rtx-3090-ventus-3x-24gb-oc-300px-v1_sml.jpg",
        brand: "MSI",
        model: "GeForce RTX 3090 VENTUS 3X 24GB",
        price: 39999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/msi-geforce-rtx-3090-ventus-3x-24gb-oc/best-deal/9657.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "76913a39-9b54-42b3-ba82-6885db9d0d78",
        image: "https://www.evetech.co.za/repository/components/leadtek-nvidia-quadro-rtx5000-16gb-gddr6-300px-v1_sml.jpg",
        brand: "NVIDIA",
        model: "Quadro RTX 5000 16GB",
        price: 39999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/leadtek-nvidia-quadro-rtx5000-16gb-gddr6/best-deal/6993.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "137fd6c8-c3cc-4e14-94a3-d0477e36dda6",
        image: "https://www.evetech.co.za/repository/components/asus-tuf-gaming-radeon-rx-6900-xt-oc-16gb-gaming-300px-v1_sml.jpg",
        brand: "ASUS",
        model: "TUF GAMING Radeon RX 6900 XT OC 16GB",
        price: 39999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/asus-tuf-gaming-radeon-rx-6900-xt-oc-16gb-gaming/best-deal/11304.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "26d58c75-7c12-4d9a-a027-8f1539392154",
        image: "https://www.evetech.co.za/repository/components/gigabyte-rtx-3090-vision-oc-24gb-graphics-card-300px-v1_sml.jpg",
        brand: "Gigabyte",
        model: "RTX 3090 VISION OC 24GB Graphics",
        price: 39499,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/gigabyte-rtx-3090-vision-oc-24gb-graphics-card/best-deal/10557.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "0138ad7b-88c9-444c-bf3f-79d169d5d281",
        image: "https://www.evetech.co.za/repository/components/gigabyte-radeon-rx-6900-xt-gaming-oc-16gb-gddr6-300px-v1_sml.jpg",
        brand: "Gigabyte",
        model: "Radeon RX 6900 XT GAMING OC 16GB",
        price: 34999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/gigabyte-radeon-rx-6900-xt-gaming-oc-16gb-gddr6/best-deal/11555.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "279cc789-7fb3-4d3a-817c-20f7e57e9a29",
        image: "https://www.evetech.co.za/repository/components/msi-radeon-rx-6800-xt-gaming-x-trio-16gb-300px-v2_sml.jpg",
        brand: "MSI",
        model: "Radeon RX 6800 XT GAMING X TRIO",
        price: 22999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/msi-radeon-rx-6800-xt-gaming-x-trio-16gb/best-deal/11302.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "8698437f-0217-4159-b8b9-5dde3be4169a",
        image: "https://www.evetech.co.za/repository/components/apphire-nitro-amd-radeon-rx-6800-oc-graphics-card-300px-v1_sml.jpg",
        brand: "SAPPHIRE",
        model: "NITRO+ AMD Radeon RX 6800 OC Graphics",
        price: 19999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/sapphire-nitro-amd-radeon-rx-6800-oc-graphics-card/best-deal/11198.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "0bb76fa2-36a8-4294-9543-75692f28a61f",
        image: "https://www.evetech.co.za/repository/components/leadtek-nvidia-quadro-rtx4000-8gb-gddr6-300px-v2_sml.jpg",
        brand: "NVIDIA",
        model: "Quadro RTX 4000 8GB",
        price: 18999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/nvidia-quadro-rtx4000-8gb-gddr6/best-deal/6992.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "b2c3c055-2a5e-451f-8354-bced30d73bda",
        image: "https://www.evetech.co.za/repository/components/msi-radeon-rx-6700-xt-gaming-x-12gb-300px-v1_sml.jpg",
        brand: "MSI",
        model: "Radeon RX 6700 XT GAMING X",
        price: 17499,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/msi-radeon-rx-6700-xt-gaming-x-12gb/best-deal/11605.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "8aafbe82-b2c7-428a-8b9b-71362248e7f8",
        image: "https://www.evetech.co.za/repository/components/msi-rx-6700-xt-mech-2x-12gb-300px-v1_sml.jpg",
        brand: "MSI",
        model: "RX 6700 XT MECH 2X",
        price: 16999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/msi-rx-6700-xt-mech-2x-12gb/best-deal/11712.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "dcb25b97-f28a-4026-89be-f43771109c58",
        image: "https://www.evetech.co.za/repository/components/msi-radeon-rx-6700-xt-12gb-300px-v1_sml.jpg",
        brand: "MSI",
        model: "Radeon RX 6700 XT",
        price: 15999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/msi-radeon-rx-6700-xt-12gb/best-deal/11606.aspx",
        description: "",
        type: "gpu"
    },
    {
        id: "026a60c2-fa8c-4d52-be34-c0a336de5c77",
        image: "https://www.evetech.co.za/repository/components/asus-rog-strix-rx-5700-oc-8gb-gddr6-graphics-card-300px-v1_sml.jpg",
        brand: "ASUS",
        model: "ROG Strix RX 5700 OC 8GB GDDR6 Graphics",
        price: 10999,
        availability: "Out of Stock",
        retailer: "Evetech",
        link: "https://www.evetech.co.za/asus-rog-strix-rx-5700-oc-8gb-gddr6-graphics-card/best-deal/6906.aspx",
        description: "",
        type: "gpu"
    }
];