import 'package:silicon_scraper/models/product_model.dart';
import 'getProducts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class ExplorePageService {
  static int page = 0;
  static int limit = 20;

  List<Product> items = [];

  ExplorePageService() {
    //setItems();
  }

  Future explorePageRequest(String productType) async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    String token = sharedPreferences.getString('token');
    String userId = sharedPreferences.getString('userId');
    // print("user id");
    // print(sharedPreferences.get('userId'));

    var url = Uri.parse(
        "https://api-silicon-scraper.herokuapp.com/products/?type=" +
            productType +
            "&userId="+userId);
    Map<String, String> headers = {
      "Content-Type": "application/json; charset=utf-8",
      'Authorization': 'Bearer ' + token
    };
    final response = await http.get(url, headers: headers);
    var responseData = json.decode(response.body);
    if (response.statusCode == 200) {
      return addProducts(responseData["products"]);
    }
    return false;
  }

  Future setItems(String productType) async {
    items = await explorePageRequest(productType);
    return items;
  }

  void nextPage() {
    page++;
  }
}

class ExplorePageSingleton extends ExplorePageService {
  static ExplorePageSingleton _instance;

  ExplorePageSingleton._internal() {
//
  }

  static ExplorePageSingleton getState() {
    if (_instance == null) {
      _instance = ExplorePageSingleton._internal();
    }
    return _instance;
  }
}
