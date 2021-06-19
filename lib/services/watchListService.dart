import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class WatchListService
{
  List<Product> items=[];

  Future watchListtRequest(bool mock)async
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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsInBhc3N3b3JkIjoiJDJiJDEyJFpuSGxxYXBBVkp6dlo1ZVc2d0JjeHUuOE01LnJFTm9kYUkwa1dvNWY3MXVsdlg1UHhlR3lHIn0sImlhdCI6MTYyNDA5OTk0MCwiZXhwIjoxNjI0MTg2MzQwfQ.TL0Zk9bh3NuM7m-5KwMlJAYWlwRRPiZHTuwIMQjqM38',
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
    items=await watchListtRequest(true);
    print("setItems");
    return true;
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
  void removeItem(Product p) async
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
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsInBhc3N3b3JkIjoiJDJiJDEyJFpuSGxxYXBBVkp6dlo1ZVc2d0JjeHUuOE01LnJFTm9kYUkwa1dvNWY3MXVsdlg1UHhlR3lHIn0sImlhdCI6MTYyNDA5OTk0MCwiZXhwIjoxNjI0MTg2MzQwfQ.TL0Zk9bh3NuM7m-5KwMlJAYWlwRRPiZHTuwIMQjqM38',
    };
    Map vars={
      "productID":item.id,
    };
    final response = await http.delete(url,headers: headers,body:vars );
    print(response.statusCode);
    var responseData = json.decode(response.body);
    print(responseData);
    if(response.statusCode==200)
    {
      if(responseData.data=="Success")
        {
          return true;
        }
    }
    return false;
  }
  Future addRequest(Product item)async
  {
    var url = Uri.parse("http://10.0.2.2:3000/watchlist");
    Map <String,String> headers={
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsInBhc3N3b3JkIjoiJDJiJDEyJFpuSGxxYXBBVkp6dlo1ZVc2d0JjeHUuOE01LnJFTm9kYUkwa1dvNWY3MXVsdlg1UHhlR3lHIn0sImlhdCI6MTYyNDA5OTk0MCwiZXhwIjoxNjI0MTg2MzQwfQ.TL0Zk9bh3NuM7m-5KwMlJAYWlwRRPiZHTuwIMQjqM38',
    };
    Map vars={
      "productID":item.id,
    };
    final response = await http.post(url,headers: headers,body:vars );
    print(response.statusCode);
    var responseData = json.decode(response.body);
    print(responseData);
    if(response.statusCode==200)
    {
      if(responseData.data=="Success")
      {
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