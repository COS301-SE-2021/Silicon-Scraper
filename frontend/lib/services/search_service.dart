import 'dart:convert';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;

class SearchService {
  List<Product> items = [];

  Future searchRequest(String query) async {
    Uri uri = Uri.parse("https://api-silicon-scraper.herokuapp.com/products/?search?key=" +
        query);
    //print(uri.toString());
    Map<String, String> headers = {
      "Content-Type": "application/json; charset=utf-8",
      'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwiaWF0IjoxNjI5MDM4OTkyLCJleHAiOjE2NjA1NzQ5OTJ9.EunDH2NFzq66c-NKdm_I-Wld5HtUrGAkZVyStixQKHQ'};
    final response = await http.get(uri, headers: headers);
    //print(response.statusCode);

    Map<String, dynamic> map = json.decode(response.body);
    List<dynamic> responseData = map["products"];

    if (response.statusCode == 200) {
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
    if (_instance == null) {
      _instance = SearchSingleton._internal();
    }
    return _instance;
  }
}

