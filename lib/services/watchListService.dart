import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class WatchListService
{
  List<Product> items=[];

  Future watchListRequest(bool mock)async
  {
    if(mock)
      {
        return await getProducts();
      }
    else
      {
        var url = Uri.parse("http://10.0.2.2:3000/watchlist");
        Map <String,String> headers={
          "Content-Type":"application/json; charset=utf-8",
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsImhhc2giOiIkMmIkMTIkWm5IbHFhcEFWSnp2WjVlVzZ3QmN4dS44TTUuckVOb2RhSTBrV281ZjcxdWx2WDVQeGVHeUcifSwiaWF0IjoxNjI0MTgxNDQ2LCJleHAiOjE2MjQyNjc4NDZ9.a0c0qLz7pBzau4r_T9Tcy4O-UqQlL8IJMOF7ZjAqTZQ',
        };
        final response = await http.get(url,headers: headers);
        print(response.statusCode);
        var responseData = json.decode(response.body);
        print(responseData);
        if(response.statusCode==200)
         {
            return addProducts(responseData);
         }
        return false;
      }
  }
  WatchListService()
  {
    setItems();
  }
  Future setItems()async
  {
    items=await watchListRequest(false);
    print("setItems");
    return items;
  }
  void addItem(Product p)async
  {
    bool contains=false;
    for(Product e in items)
      {
        if(e == p)
          {
            contains=true;
          }
      }

    if(!contains)
      {
        items.add(p);
      }
  }
  Future removeItem(Product p) async
  {
    bool contains=false;
    for(var e in items)
    {
      if(e == p)
      {
        contains=true;
      }
    }
    if(contains)
    {
          items.remove(p);
    }
    else
      {
      return false;
    }

  }
  Future<List<Product>> getProductlist()
  {
    return Future.value(items);
  }
  bool findItem(Product p)
  {
    for(var e in items)
    {
      if(e == p)
      {
        return true;
      }
    }
     return false;
  }
  Future removeRequest(Product item)async
  {
    var url = Uri.parse("http://10.0.2.2:3000/watchlist");
    Map <String,String> headers={
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsImhhc2giOiIkMmIkMTIkWm5IbHFhcEFWSnp2WjVlVzZ3QmN4dS44TTUuckVOb2RhSTBrV281ZjcxdWx2WDVQeGVHeUcifSwiaWF0IjoxNjI0MTgxNDQ2LCJleHAiOjE2MjQyNjc4NDZ9.a0c0qLz7pBzau4r_T9Tcy4O-UqQlL8IJMOF7ZjAqTZQ',
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
    var url = Uri.parse("http://10.0.2.2:3000/watchlist");
    Map <String,String> headers={
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsImhhc2giOiIkMmIkMTIkWm5IbHFhcEFWSnp2WjVlVzZ3QmN4dS44TTUuckVOb2RhSTBrV281ZjcxdWx2WDVQeGVHeUcifSwiaWF0IjoxNjI0MTgxNDQ2LCJleHAiOjE2MjQyNjc4NDZ9.a0c0qLz7pBzau4r_T9Tcy4O-UqQlL8IJMOF7ZjAqTZQ',
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

  WatchListSingleton._internal(){
//    setItems();
//    print("new singleton");
  }

  static WatchListSingleton getState()
  {
    if(_instance==null)
      {
        _instance=WatchListSingleton._internal();
      }
    return _instance;
  }
}