import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    noConnectionReuse: false,
    duration: '30s',
    vus: 1
}

function fetchProductsTest() {
    var url = 'https://api-silicon-scraper.herokuapp.com/products';

    http.get(url);
    sleep(1);
}

function searchTest() {
    var url = 'https://api-silicon-scraper.herokuapp.com/products/search?key=ryzen';

    http.get(url);
    sleep(1);
}

export default function () {
    fetchProductsTest();
}