import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class WatchListService
{

  Future<List<Product>> watchListRequest()async
  {
    SharedPreferences sharedPreferences=await SharedPreferences.getInstance();
    String token=sharedPreferences.get('token');
        var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/watchlist");
        Map <String,String> headers=
        {
          "Content-Type":"application/json; charset=utf-8",
          'Authorization': "Bearer "+token,
        };
        final response = await http.get(url,headers: headers);
        print(response.statusCode);
        if(response.statusCode==200)
        {
            Map<String, dynamic> map = json.decode(response.body);
            List<dynamic> responseData = map["products"];
            print(responseData);
            return addProducts(responseData);
        }
        throw Exception('Unable to get products from the server');
  }

  Future removeRequest(Product item)async
  {
    var url = Uri.parse("https://api-silicon-scraper.herokuapp.com/watchlist");
    Map <String,String> headers={
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwiaWF0IjoxNjI5MDM4OTkyLCJleHAiOjE2NjA1NzQ5OTJ9.EunDH2NFzq66c-NKdm_I-Wld5HtUrGAkZVyStixQKHQ',
    };
    Map vars={
      "productID":item.id,
      "type":item.type
    };
    print(vars);

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
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwiaWF0IjoxNjI5MDM4OTkyLCJleHAiOjE2NjA1NzQ5OTJ9.EunDH2NFzq66c-NKdm_I-Wld5HtUrGAkZVyStixQKHQ',
    };
    Map vars={
      "productID":item.id,
      "type":item.type
    };
    var send=jsonEncode(vars);
    final response = await http.post(url,headers: headers,body:send );
    print(response.statusCode);
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

//todo get error codes from api and throw exact messages
