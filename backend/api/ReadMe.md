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


