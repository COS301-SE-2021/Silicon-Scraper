import 'dart:convert';
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;

class SearchService {
  List<Product> items=[];

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
    print(jsonResponse);
    Map<String, dynamic> map = json.decode(response.body);
    List<dynamic> responseData = map["products"];

    if (response.statusCode == 200){
      return addProducts(responseData);
    }
    return false;
  }

  SearchService();

  Future<List<Product>> setProductList(String query) async {
    return await searchRequest(query);
  }

}
class SearchSingleton extends SearchService {

  static SearchSingleton _instance;
  SearchSingleton._internal();
  static SearchSingleton getState() {
    if(_instance==null) {
      _instance = SearchSingleton._internal();
    }
    return _instance;
  }
}

bool containsIgnoreCase(String modelOrBrand, String query) {
  return modelOrBrand.toLowerCase().contains(query.toLowerCase());
}


List<Product> getResults(List<Product> unProcessedProducts, String query) {
  List<Product> products = [];
  for (int i = 0; i < unProcessedProducts.length; i++) {
    if (containsIgnoreCase(unProcessedProducts.elementAt(i).brand, query) ||
        containsIgnoreCase(unProcessedProducts.elementAt(i).model, query)) {
      products.add(unProcessedProducts.elementAt(i));
    }
  }
  return products;
}

List<String> getSuggestions(List<Product> unProcessedProducts, String query) {
  List<String> productSuggestions = [];
  for (int i = 0; i < unProcessedProducts.length; i++) {
    if (containsIgnoreCase(unProcessedProducts.elementAt(i).brand, query) || containsIgnoreCase(
        unProcessedProducts.elementAt(i).model, query)) {
      productSuggestions.add(unProcessedProducts.elementAt(i).model);
    }
  }
  return productSuggestions;
}

