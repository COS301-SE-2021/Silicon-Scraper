import 'package:silicon_scraper/models/product.dart';
import 'getProducts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ExplorePageService
{
  static int page=0;
  static int limit=20;

  List<Product> items=[];
  Future explorePageRequest(bool mock)async
  {
    if(mock)
    {
      return await getProducts();
    }
    else
     {
      var url = Uri.parse("http://10.0.2.2:3000/products/getProducts");
      Map <String,String> headers={
        "Content-Type":"application/json; charset=utf-8",
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsImhhc2giOiIkMmIkMTIkWm5IbHFhcEFWSnp2WjVlVzZ3QmN4dS44TTUuckVOb2RhSTBrV281ZjcxdWx2WDVQeGVHeUcifSwiaWF0IjoxNjI0MjY5OTM1LCJleHAiOjE2MjQzNTYzMzV9.zxMKowFfzwl3f9zCZSs9UKCu34Bg_4yOJqmaDt607dI',
      };
      final response = await http.get(url,headers: headers);
      print(response.statusCode);
      var responseData = json.decode(response.body);
      print("===============================");
      print(responseData);
      if(response.statusCode==200)
      {
        return addProducts(responseData["products"]);
      }
      return false;
    }
  }
  ExplorePageService()
  {
    setItems();
  }

  Future setItems()async {
    items=await explorePageRequest(true);
    print("setItems");
    return items;
  }

  void nextPage()
  {
    page++;
  }

}

class ExplorePageSingleton extends ExplorePageService
{
  static ExplorePageSingleton _instance;
  ExplorePageSingleton._internal(){
//
  }
  static ExplorePageSingleton getState()
  {
    if(_instance==null)
    {
      _instance=ExplorePageSingleton._internal();
    }
    return _instance;
  }
}