import 'dart:convert';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class SearchService {
  List<Product> items = [];

  Future searchRequest(String query) async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    String token = sharedPreferences.getString('token');
    String userId = sharedPreferences.getString('userId');

    Uri uri = Uri.parse("https://api-silicon-scraper.herokuapp.com/products/search?key=" +
        query+"&userId="+userId);
    print(uri.toString());
    Map<String, String> headers = {
      "Content-Type": "application/json; charset=utf-8",
      'Authorization':
          'Bearer '+ token};
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

