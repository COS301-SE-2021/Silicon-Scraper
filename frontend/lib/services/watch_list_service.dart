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
        var responseData = json.decode(response.body);

//        print(response.statusCode);
        print(responseData);

        if(response.statusCode==200)
         {
            return addProducts(responseData);
         }
        else
          {
//            throw
          }
  }

  Future removeRequest(Product item)async
  {
    var url = Uri.parse("http://10.0.2.2:3000/watchlist");
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
    var responseData = json.decode(response.body);
    print(responseData);
    if(response.statusCode==200)
    {
      if(responseData['message']=="Success")
        {
//          await removeItem(item);
          return false;
        }
    }
    return true;
  }

  Future addRequest(Product item)async
  {
    print("==============================================");
    var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/");
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
    if(response.statusCode==200)
    {
      if(responseData['message']=="Success")
      {
//        await addItem(item);
        return true;
      }
    }
    return false;
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