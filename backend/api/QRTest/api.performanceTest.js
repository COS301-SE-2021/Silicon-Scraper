import http from 'k6/http';

export let options = {
    iterations: 100,
    vus: 100
}

function fetchProductsTest() {
    var url = 'https://api-silicon-scraper.herokuapp.com/products';
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMzI0OThmY2UtNGM0My00YzcxLThlMDAtMzhlNDBhNDRiMjg0IiwiaWF0IjoxNjMxOTgyMTk3LCJleHAiOjE2NjM1MTgxOTd9.YxAiAT0QSEIs6O1W7fnR6_EndEPQrfFTsnY4auP2KuM';
  
    var params = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    http.get(url, params);
}

export default function () {
    fetchProductsTest();
}