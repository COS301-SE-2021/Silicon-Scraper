export const scrape = async () => {
    return {
        gpus: [{
            image: "gpuTitle", 
            brand: "gpubrand",
            model: "gpuModel",
            price: "gpuPrice",
            availability: "gpuAvailabilty",
            link: "gpuLink",
            retailer: "gpuRetailer",
            details: {
                productDetails: [
                    {
                        dateTime: "dateTime",
                        price: 500000,
                        availabilty: "gpuAvailabilty"
                    }
                ]
            },
            type: "gpu",
            description: "gpuDescr"
        }],
        cpus: []
    }
}