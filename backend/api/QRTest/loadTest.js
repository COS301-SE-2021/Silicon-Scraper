import http from 'k6/http';

export let options = {
    stages: [
        { duration: '30s', target: 1000 },
        { duration: '1m', target: 1000 },
        { duration: '30s', target: 0 }
    ]
}

function fetchProductsTest() {
    var url = 'https://api-silicon-scraper.herokuapp.com/products';

    http.get(url);
}

function searchTest() {
    var url = 'https://api-silicon-scraper.herokuapp.com/products/search?key=ryzen';

    http.get(url);
}

export default function () {
    fetchProductsTest();
}