# Silicon Scraper API Documentation

This API uses POST, GET & DELETE requests to communicate and HTTP response codes to indicate status and errors. All responses come 
in standard JSON. All requests must include a content-type of application/json and the body must be valid JSON.

## Response Codes

```
200: Success
201: Success (Entity creation)
204: Success (Enitity removal)
404: Cannot be found
500: Server error
```

### Example Error Message

```
{
	"message": "An error occurred"
}
```

## The REST API

Description of the api endpoints and as well the request and response examples.

### Sign Up

Endpoint used to create an account for the application.

#### request

```
curl -i -H 'Accept: application/json' -X POST -d 'username=silicon&password=safe' https://api-silicon-scraper/users/
```

#### response

Note: 
- The response's user password property is not the exact password that is stored.
- The token returned is meant to be in requests made to endpoints other than the users route.

```
HTTP/1.1 201
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 201
Connection: close
Content-Type: application/json

{
	"token": "guiguoguofauogoagysdvsd",
	"user": {
		"id": "dhgfuvwifboe",
		"username": "silicon",
		"password": "safe"
	}
}
```

### Login

Endpoint used to login to the account of the user.

#### request

```
curl -i -H 'Accept: application/json' -X POST -d 'username=silicon&password=safe' https://api-silicon-scraper/users/login
```

#### response

```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 200 OK
Connection: close
Content-Type: application/json

{
	"token": "guiguoguofauogoagysdvsd"
}
```

### Delete account

Endpoint used to delete a user's account.

#### request

```
curl -i -H 'Accept: application/json' -X DELETE -d 'username=silicon&password=safe' https://api-silicon-scraper/users/
```

#### response

```
HTTP/1.1 204 NO CONTENT
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 204 NO CONTENT
Connection: close
Content-Type: application/json
```

### Add to watchlist
Endpoint used to add a product to a user's watchlist.

#### request

Note: The only types accepted at the moment are CPU and GPU (not case sensitive).

```
curl -i -H 'Accept: application/json' 'Authorization: Bearer thisisatoken' -X POST -d 'productID=thisisaid&type=CPU' https://api-silicon-scraper/watchlist/
```

#### response

```
HTTP/1.1 201
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 201
Connection: close
Content-Type: application/json
```

### Retrieve watchlist
Endpoint used to get a user's watchlist (list of products present in it).

#### request

```
curl -i -H 'Accept: application/json' 'Authorization: Bearer thisisatoken' -X GET https://api-silicon-scraper/watchlist/
```

#### response

```
HTTP/1.1 200 OK
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 200 OK
Connection: close
Content-Type: application/json

{
	"products": [ 
		{
			"id": "hifuvovuosaci",
			"type": "CPU",
			"brand": "AMD",
			"model": "Ryzen 5"
		}
	]
}
```

### Remove from watchlist
Endpoint used to remove a product from a user's watchlist.

#### request

```
curl -i -H 'Accept: application/json' 'Authorization: Bearer thisisatoken' -X DELETE -d 'productID=thisisaid&type=CPU' https://api-silicon-scraper/watchlist/
```

#### response

```
HTTP/1.1 204
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 204
Connection: close
Content-Type: application/json
```

### Fetch products
Endpoint used to fetch gpus and cpus.

#### Request
Add an optional userId field i.e. userId=user_id to determine if the products are in the user's watchlist.

```
curl -i -H 'Accept: application/json' 'Authorization: Bearer thisisatoken' -X GET https://api-silicon-scraper/products?userId={user_id}
```

#### Response
Example: GET https://api-silicon-scraper/products
```
HTTP/1.1 200
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 200
Connection: close
Content-Type: application/json

{
	"products": [
		{
			"id": "d6442690-24a9-4969-a329-a8d37563cfe8",
            "brand": "ASUS",
            "model": "ROG Strix RTX 3090 OC 24GB White",
            "image": "https://www.evetech.co.za/repository/components/asus-rog-strix-rtx-3090-oc-24gb-white-gaming-300px-v1_sml.jpg",
            "price": 45999,
            "availability": "Out of Stock",
            "retailer": "Evetech",
            "link": "https://www.evetech.co.za/asus-rog-strix-rtx-3090-oc-24gb-white-gaming/best-deal/11400.aspx",
            "type": "gpu",
            "description": ""
		},
		{
            "id": "7b05c566-be35-4829-9373-e36367e20937",
            "brand": "Intel",
            "model": "Core i9-11900KF Gen Processor",
            "image": "https://www.evetech.co.za/repository/components/intel-core-i9-11900kf-300px-v1_sml.jpg",
            "price": 11299,
            "availability": "In Stock",
            "retailer": "Evetech",
            "link": "https://www.evetech.co.za/intel-core-i9-11900kf/best-deal/11945.aspx",
            "type": "cpu",
            "description": ""
        }
	]
}
```

If the userId is specified:
Example: GET https://api-silicon-scraper/products?userId={user_id}
```
HTTP/1.1 200
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 200
Connection: close
Content-Type: application/json

{
	"products": [
		{
			"id": "d6442690-24a9-4969-a329-a8d37563cfe8",
            "brand": "ASUS",
            "model": "ROG Strix RTX 3090 OC 24GB White",
            "image": "https://www.evetech.co.za/repository/components/asus-rog-strix-rtx-3090-oc-24gb-white-gaming-300px-v1_sml.jpg",
            "price": 45999,
            "availability": "Out of Stock",
            "retailer": "Evetech",
            "link": "https://www.evetech.co.za/asus-rog-strix-rtx-3090-oc-24gb-white-gaming/best-deal/11400.aspx",
            "type": "gpu",
            "description": "",
			"watch": false
		},
		{
			"id": "7b05c566-be35-4829-9373-e36367e20937",
            "brand": "Intel",
            "model": "Core i9-11900KF Gen Processor",
            "image": "https://www.evetech.co.za/repository/components/intel-core-i9-11900kf-300px-v1_sml.jpg",
            "price": 11299,
            "availability": "In Stock",
            "retailer": "Evetech",
            "link": "https://www.evetech.co.za/intel-core-i9-11900kf/best-deal/11945.aspx",
            "type": "cpu",
            "description": "",
			"watch": false
		}
	]
}
```

### Fetch product by id
Endpoint used to retrieve a product with a matching id.

#### Request
Add an optional userId field i.e. userId=user_id to determine if the product is in the user's watchlist.
```
curl -i -H 'Accept: application/json' 'Authorization: Bearer thisisatoken' -X GET https://api-silicon-scraper/products/{product_id}?userId={user_id}
```

#### Response
Example: GET https://api-silicon-scraper/products/7b05c566-be35-4829-9373-e36367e20937?userId={user_id}

```
HTTP/1.1 200
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 200
Connection: close
Content-Type: application/json

{
	"products": [
		{
			"id": "7b05c566-be35-4829-9373-e36367e20937",
            "brand": "Intel",
            "model": "Core i9-11900KF Gen Processor",
            "image": "https://www.evetech.co.za/repository/components/intel-core-i9-11900kf-300px-v1_sml.jpg",
            "price": 11299,
            "availability": "In Stock",
            "retailer": "Evetech",
            "link": "https://www.evetech.co.za/intel-core-i9-11900kf/best-deal/11945.aspx",
            "type": "cpu",
            "description": ""
		}
	]
}
```

If the userId is specified:
Example: GET https://api-silicon-scraper/products/7b05c566-be35-4829-9373-e36367e20937?userId={user_id}
```
HTTP/1.1 200
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 200
Connection: close
Content-Type: application/json

{
	"products": [
		{
			"id": "7b05c566-be35-4829-9373-e36367e20937",
            "brand": "Intel",
            "model": "Core i9-11900KF Gen Processor",
            "image": "https://www.evetech.co.za/repository/components/intel-core-i9-11900kf-300px-v1_sml.jpg",
            "price": 11299,
            "availability": "In Stock",
            "retailer": "Evetech",
            "link": "https://www.evetech.co.za/intel-core-i9-11900kf/best-deal/11945.aspx",
            "type": "cpu",
            "description": "",
			"watch": false
		}
	]
}
```

### Search for product
Endpoint used to search for a gpu or cpu using a given key.

#### Request
Specify for the brand or model of cpu or gpu by adding the value to search for in the key field.
Add an optional userId field i.e. userId=user_id to determine if the products are in the user's watchlist.

```
curl -i -H 'Accept: application/json' 'Authorization: Bearer thisisatoken' -X GET https://api-silicon-scraper/products/search?key={key}&userId={user_id}
```

#### Response
Example: GET https://api-silicon-scraper/products/search?key=intel
```
HTTP/1.1 200
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 200
Connection: close
Content-Type: application/json

{
	"products": [
		{
            "id": "7b05c566-be35-4829-9373-e36367e20937",
            "brand": "Intel",
            "model": "Core i9-11900KF Gen Processor",
            "image": "https://www.evetech.co.za/repository/components/intel-core-i9-11900kf-300px-v1_sml.jpg",
            "price": 11299,
            "availability": "In Stock",
            "retailer": "Evetech",
            "link": "https://www.evetech.co.za/intel-core-i9-11900kf/best-deal/11945.aspx",
            "type": "cpu",
            "description": ""
		},
		{
            "id": "f5a8059f-25e1-4da5-abcc-726de609b012",
            "brand": "Intel",
            "model": "Core i9-9820X 4.1GHz Boost – 10 Core 20 Thread – LGA 2066 CPU",
            "image": "https://amptek.co.za/wp-content/uploads/2020/09/Intel-Core-i9-9960X-BOX-1-1024x1024.jpg",
            "price": 11699,
            "availability": "Out of Stock",
            "retailer": "Amptek",
            "link": "https://amptek.co.za/product/intel-core-i9-9820x-x-series-16-5m-cache-up-to-4-20-ghz-lga2066/",
            "type": "cpu",
            "description": ""
		}
	]
}
```

If the userId is specified:
Example: GET https://api-silicon-scraper/products/search?key=intel&userId={user_id}
```
HTTP/1.1 200
Date: Thu, 24 Feb 2021 12:36:30 GMT
Status: 200
Connection: close
Content-Type: application/json

{
	"products": [
		{
            "id": "7b05c566-be35-4829-9373-e36367e20937",
            "brand": "Intel",
            "model": "Core i9-11900KF Gen Processor",
            "image": "https://www.evetech.co.za/repository/components/intel-core-i9-11900kf-300px-v1_sml.jpg",
            "price": 11299,
            "availability": "In Stock",
            "retailer": "Evetech",
            "link": "https://www.evetech.co.za/intel-core-i9-11900kf/best-deal/11945.aspx",
            "type": "cpu",
            "description": "",
			"watch": false
		},
		{
			"id": "f5a8059f-25e1-4da5-abcc-726de609b012",
            "brand": "Intel",
            "model": "Core i9-9820X 4.1GHz Boost – 10 Core 20 Thread – LGA 2066 CPU",
            "image": "https://amptek.co.za/wp-content/uploads/2020/09/Intel-Core-i9-9960X-BOX-1-1024x1024.jpg",
            "price": 11699,
            "availability": "Out of Stock",
            "retailer": "Amptek",
            "link": "https://amptek.co.za/product/intel-core-i9-9820x-x-series-16-5m-cache-up-to-4-20-ghz-lga2066/",
            "type": "cpu",
            "description": "",
			"watch": false
		}
	]
}
```
