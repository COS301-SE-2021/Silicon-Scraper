module.exports = {
    get: jest.fn((url) => {
        if (url === 'https://www.evetech.co.za/components/nvidia-ati-graphics-cards-21.aspx') {
            return Promise.resolve({
                data: 'data'
            });
        }
    }),
    create: jest.fn(function () {
        return this;
    })
    
};