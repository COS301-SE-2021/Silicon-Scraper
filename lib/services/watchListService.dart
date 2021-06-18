import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;

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
        var url = Uri.parse("localhost:3000/watchlist");
        Map <String,String> headers={
          "Content-Type":"application/json; charset=utf-8",
          "Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMzIwNjljMzItM2I5Yi00N2NhLThjNzktMTgxNWE1MzRjMDJiIiwidXNlcm5hbWUiOiJNcGVuZHVsbyIsImhhc2giOiIkMmIkMTIkRE1GbzRQaVBsOGhEdFVuU0o3WDZzdVBzU2lRLnUuUlU0S2pDWUxHc0FQck5uSXY2bnNZanUifSwiaWF0IjoxNjI0MDE3MzU2LCJleHAiOjE2MjQxMDM3NTZ9.9gy-JqAgFk8Oq_rdIh9ELzEsUONn_8ZAowLgE0ZgdtY"
        };
        var response = await http.get(url,headers: headers);

        return;
      }
  }
  WatchListService()
  {
//    setItems();
  }
  void setItems()async
  {
    items=await watchListtRequest(true);
    print("setItems");
  }
  void addItem(Product p)
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
  void removeItem(Product p)
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