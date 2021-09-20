import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    noConnectionReuse: false,
    duration: '30s',
    vus: 1
}

function fetchProductsTest() {
    var url = 'https://api-silicon-scraper.herokuapp.com/products/search?key=ryzen';
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMzI0OThmY2UtNGM0My00YzcxLThlMDAtMzhlNDBhNDRiMjg0IiwiaWF0IjoxNjMxOTgyMTk3LCJleHAiOjE2NjM1MTgxOTd9.YxAiAT0QSEIs6O1W7fnR6_EndEPQrfFTsnY4auP2KuM';
  
    var params = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    http.get(url, params);
    sleep(1);
}

function searchTest() {
    
}

export default function () {
    fetchProductsTest();
}