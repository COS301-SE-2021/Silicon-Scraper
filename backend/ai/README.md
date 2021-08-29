# AI API Documentation

This API uses a POST request to communicate and HTTP response codes to indicate status and errors. All responses come 
in standard JSON. All requests must include a content-type of application/json and the body must be valid JSON.

## Response Codes

```
200: Success
400: Bad Request
500: Server error
```

### Example Error Message

```
{
	"message": "An error occurred"
    "success": false
}
```

## The REST API

Description of the api endpoints and as well the request and response examples.

### predict
Endpoint used to predict future price and availability values 

#### request 

```
curl -i -H "Content-Type: application/json" -X POST -d '{"brand":"AMD","model":"RYZEN Threadripper 3990X","availability":"Out of Stock","date":"202108310345765","type":"CPU","price": 84599.0}' https://silicon-scraper-ai-api.herokuapp.com/predict/price-and-availability
```

#### response 
Example: POST https://silicon-scraper-ai-api.herokuapp.com/predict/price-and-availability

```
HTTP/1.0 200 OK
Date: Mon, 20 May 2013 05:57:44 GMT
Connection: close
Content-Type: application/json
Content-Length: 67

{
    "predictions": {
        "availability": 0,
        "price": 27517.29
    },
    "success": true
}
```