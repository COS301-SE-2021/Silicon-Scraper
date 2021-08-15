import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class WatchListService
{
  WatchListService();

  Future<List<Product>> watchListRequest()async
  {
        var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/watchlist");
        Map <String,String> headers=
        {
          "Content-Type":"application/json; charset=utf-8",
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsImhhc2giOiIkMmIkMTIkWm5IbHFhcEFWSnp2WjVlVzZ3QmN4dS44TTUuckVOb2RhSTBrV281ZjcxdWx2WDVQeGVHeUcifSwiaWF0IjoxNjI4MTY5MDY3LCJleHAiOjE2NTk3MDUwNjd9.LzjoAKcGmYrwf-27ZFPtCxWAxnDuSSYlBMgIfA6nW1g',
        };
        final response = await http.get(url,headers: headers);
        Map<String, dynamic> map = json.decode(response.body);

        List<dynamic> responseData = map["products"];
        print(responseData);

        if(response.statusCode==200)
        {
          if(response.statusCode==200)
          {
            return addProducts(responseData);
          }
        }
  }

  Future removeRequest(Product item)async
  {
    var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/watchlist");
    Map <String,String> headers={
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsImhhc2giOiIkMmIkMTIkWm5IbHFhcEFWSnp2WjVlVzZ3QmN4dS44TTUuckVOb2RhSTBrV281ZjcxdWx2WDVQeGVHeUcifSwiaWF0IjoxNjI4MTY5MDY3LCJleHAiOjE2NTk3MDUwNjd9.LzjoAKcGmYrwf-27ZFPtCxWAxnDuSSYlBMgIfA6nW1g',
    };
    Map vars={
      "productID":item.id,
      "type":item.type
    };

    var send=jsonEncode(vars);
    final response = await http.delete(url,headers: headers,body:send);

    print(response.statusCode);
    if(response.statusCode==204)
    {
      return true;
    }
    throw Exception("could not remove item from the watch list");
  }

  Future addRequest(Product item)async
  {

    var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/watchlist");
    Map <String,String> headers={
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsImhhc2giOiIkMmIkMTIkWm5IbHFhcEFWSnp2WjVlVzZ3QmN4dS44TTUuckVOb2RhSTBrV281ZjcxdWx2WDVQeGVHeUcifSwiaWF0IjoxNjI4MTY5MDY3LCJleHAiOjE2NTk3MDUwNjd9.LzjoAKcGmYrwf-27ZFPtCxWAxnDuSSYlBMgIfA6nW1g',
    };
    Map vars={
      "productID":item.id,
      "type":item.type
    };
    var send=jsonEncode(vars);
    final response = await http.post(url,headers: headers,body:send );
    print(response.statusCode);
    var responseData = json.decode(response.body);
    print(responseData);
    if(response.statusCode==201)
    {
        return true;
    }
    throw Exception("add item to the watch lis");
  }

}

class WatchListSingleton extends WatchListService
{
  static WatchListSingleton _instance;

  WatchListSingleton._internal();

  static WatchListSingleton getState()
  {
    if(_instance==null)
      {
        _instance=WatchListSingleton._internal();
      }
    return _instance;
  }
}