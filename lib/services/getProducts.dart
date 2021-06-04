import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/classes/product.dart';
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:silicon_scraper/widgets/productWidget.dart';

List<Product> addProducts(var json)
{
    List<Product> items=[];
    for(int i=0;i<json["products"].length;i++)
    {
      String name=json["products"][i]['brand'];
      String model=json["products"][i]['model'];
      double price=json["products"][i]['price'];
      String retailer=json["products"][i]['retailer'];
      String description=json["products"][i]['description'];
      String url=json["products"][i]['url'];
      String photo=json["products"][i]['image'];
      String sAvailability=json["products"][i]['availability'];
      items.add(new Product(name, model, price, retailer, description, url, photo, sAvailability));
    }

    return items;
}

Future<String>_loadFromAsset() async {
  return await rootBundle.loadString("test/mobile/mocks/json/products.json");
}

Future<dynamic> parseJson() async {
  String jsonString = await _loadFromAsset();
  final jsonResponse = jsonDecode(jsonString);
  return jsonResponse;
}

Future<List<Product>> getProducts() async
{
  var json= await parseJson();
  return addProducts(json);
}

ListView ProductListView(BuildContext context,List<Product> items)
{
  return ListView.builder(
    itemCount:items.length ,
      itemBuilder: (_,index){
        return
            ProductWidget(items[index]);
      }
  );
}

