const products = [];

const addToWatchlist = (req, res) => {
    const product = {
        "id": 1,
        "brand": "",
        "model": "",
        "url": "",
        "img": "",
        "description": "",
        "retailer": "",
        "price": 0,
        "availability": 1
    };

     products.push(product);
     res.send("Product has been added to user's watch list");
};

module.exports = {
    addToWatchlist
};