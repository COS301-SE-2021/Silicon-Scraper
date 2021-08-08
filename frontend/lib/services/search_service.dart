import 'dart:convert';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:http/http.dart' as http;

class SearchService {
  List<Product> items = [];

  Future searchRequest(String query) async {
    Uri uri = Uri.parse("http://10.0.2.2:3000/products/search?key=" +
        query +
        "&page=1&limit=20");
    Map<String, String> headers = {
      "Content-Type": "application/json; charset=utf-8",
      'Authorization':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYzhhOTNmMzAtZmUxYi00Y2VhLWE3ZTItNDljMzdlOTA4MTMzIiwidXNlcm5hbWUiOiJMb3VpcyIsImhhc2giOiIkMmIkMTIkWm5IbHFhcEFWSnp2WjVlVzZ3QmN4dS44TTUuckVOb2RhSTBrV281ZjcxdWx2WDVQeGVHeUcifSwiaWF0IjoxNjI0MjY5OTM1LCJleHAiOjE2MjQzNTYzMzV9.zxMKowFfzwl3f9zCZSs9UKCu34Bg_4yOJqmaDt607dI',
    };
    final response = await http.get(uri, headers: headers);
    print(response.statusCode);

    final jsonResponse = jsonDecode(response.body);
    // print(response.body);
    print(jsonResponse);
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

