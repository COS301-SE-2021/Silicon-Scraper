import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:silicon_scraper/widgets/productWidget.dart';

List<Product> addProducts(List json) {
  List<Product> items = [];
  if (json.length > 0) {
    for (int i = 0; i < json.length; i++) {
      String name = json[i]['brand'];
      String model = json[i]['model'];
      double price = json[i]['price'].toDouble();
      String retailer = json[i]['retailer'];
      String description = json[i]['description'];
      String url = json[i]['url'];
      String photo = json[i]['image'];
      String sAvailability = json[i]['availability'];
      items.add(new Product(name, model, price, retailer, description, url,
          photo, sAvailability));
    }

  }

  return items;
}

Future<String> _loadFromAsset() async {
  return await rootBundle.loadString("test/mobile/mocks/json/products.json");
}

Future<dynamic> parseJson() async {
  String jsonString = await _loadFromAsset();
  final jsonResponse = jsonDecode(jsonString);
  return jsonResponse;
}

Future<List<Product>> getProducts() async {
  var json = await parseJson();
  return addProducts(json);
}

ListView ProductListView(BuildContext context, List<Product> items) {
  return ListView.builder(
      itemCount: items.length,
      itemBuilder: (_, index) {
        return ProductWidget(item: items[index]);
      });
}

