module.exports = {
    get: jest.fn(() => Promise.resolve({data: {}})),
    create: jest.fn(function () {
        return this;
    })

};

// if (url === 'https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx') {
//             return Promise.resolve({
//                 data: 'data'
//             });
//         }