import 'dart:convert';

import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;

class SearchService {
  List<Product> items=[];

  // Future searchRequest(String query) async {
  //   if(query.isEmpty) {
  //     return await getProducts();
  //   }
  //   else {
  //     var url = new Uri.http("192.168.56.1:3000", "/products/search?key="+query+"&page=1&limit=20");
  //     // http://example.org/path?q=dart.
  //     //var url = Uri.http("10.0.2.2:3000", "/products/search", { "key" : query,  "page" : "1", "limit" : "20"});
  //     //var url = Uri.parse("10.0.2.2:3000/products/search?key="+query+"&page=1&limit=20");
  //     //var url = Uri.dataFromString("http://localhost:3000/products/search?key="+query+"&page=1&limit=20");
  //     print(url);
  //     Map <String,String> headers={
  //       "Content-Type":"application/json; charset=utf-8",
  //       "Bearer":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMzIwNjljMzItM2I5Yi00N2NhLThjNzktMTgxNWE1MzRjMDJiIiwidXNlcm5hbWUiOiJNcGVuZHVsbyIsImhhc2giOiIkMmIkMTIkRE1GbzRQaVBsOGhEdFVuU0o3WDZzdVBzU2lRLnUuUlU0S2pDWUxHc0FQck5uSXY2bnNZanUifSwiaWF0IjoxNjI0MDE3MzU2LCJleHAiOjE2MjQxMDM3NTZ9.9gy-JqAgFk8Oq_rdIh9ELzEsUONn_8ZAowLgE0ZgdtY"
  //     };
  //     var response = await http.get(url,headers: headers);
  //
  //     print(response.statusCode);
  //     //print(response.body);
  //     return;
  //   }
  //
  // }

  Future searchRequest(String query) async {

    Uri uri = Uri.parse("http://10.0.2.2:3000/products/search?key="+query+"&page=1&limit=20");
    Map <String,String> headers={
      "Content-Type":"application/json; charset=utf-8",
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsInBhc3N3b3JkIjoiJDJiJDEyJFpuSGxxYXBBVkp6dlo1ZVc2d0JjeHUuOE01LnJFTm9kYUkwa1dvNWY3MXVsdlg1UHhlR3lHIn0sImlhdCI6MTYyNDA5OTk0MCwiZXhwIjoxNjI0MTg2MzQwfQ.TL0Zk9bh3NuM7m-5KwMlJAYWlwRRPiZHTuwIMQjqM38',
    };
    final response = await http.get(uri, headers: headers);
    print(response.statusCode);

    final jsonResponse = jsonDecode(response.body);
    // print(response.body);
    //print(jsonResponse);
    Map<String, dynamic> map = json.decode(response.body);
    List<dynamic> responseData = map["products"];

    if (response.statusCode == 200){
      return addProducts(responseData);
    }
    return false;
  }

  SearchService() {
    //setItems();
  }

  // void setItems() async {
  //   //items = await getProducts();
  //   items = await searchRequest(setQuery);
  //   print(items.length);
  // }

  Future<List<Product>> setProductList(String query) async {
    return await searchRequest(query);
    return addProducts(items);
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
class SearchSingleton extends SearchService {

  static SearchSingleton _instance;
  SearchSingleton._internal() {
//    setItems();
//    print("new singleton");
  }
  static SearchSingleton getState() {
    if(_instance==null) {
      _instance = SearchSingleton._internal();
    }
    return _instance;
  }
}

