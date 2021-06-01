import 'package:flutter/material.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:flutter/services.dart';

List<product> addProducts(var json)
{
  json.then((){
    List<product> items=[];
    print(json.length);
    for(int i=0;i<json["products"].length;i++)
    {
      print(json["products"][i]);
      String name=json["products"][i]['name'];
      String model=json["products"][i]['model'];
      double price=json["products"][i]['price'];
      String retailer=json["products"][i]['retailer'];
      String description=json["products"][i]['description'];
      String url=json["products"][i]['url'];
      String photo=json["products"][i]['image'];
      String sAvailability=json["products"][i]['availability'];
      items.add(new product(name, model, price, retailer, description, url, photo, sAvailability));
    }

    return items;
  });
}

Future<String>_loadFromAsset() async {
  return await rootBundle.loadString("test/mobile/mocks/json/products.json");
}
Future parseJson() async {
  String jsonString = await _loadFromAsset();
  final jsonResponse = jsonDecode(jsonString);
  return jsonResponse;
}

Future<List<product>> getProducts() async
{
  var json= await parseJson();
  var then = json.then((){
    return addProducts(json);
  });

  return then;
}


