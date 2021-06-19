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
            ProductWidget( item:items[index]);
      }
  );
}

bool containsIgnoreCase(String modelOrBrand, String query) {
  return modelOrBrand.toLowerCase().contains(query.toLowerCase());
}

List<Product> getResults(List<Product> unProcessedProducts, String query){

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
  List<String> productBrandOrModel = [];
  for (int i = 0; i < unProcessedProducts.length; i++) {
    if (containsIgnoreCase(unProcessedProducts.elementAt(i).brand, query)) {
      productBrandOrModel
          .add(unProcessedProducts.elementAt(i).brand);
    } else if (containsIgnoreCase(unProcessedProducts.elementAt(i).model, query)) {
      productBrandOrModel
          .add(unProcessedProducts.elementAt(i).model);
    }
  }
  return productBrandOrModel;
}

double getMaxPrice(List<Product> products) {
  double maxPrice = 0.0;
  for (int i = 0; i < products.length; i++){
    if (products.elementAt(i).price > maxPrice) {
      maxPrice = products.elementAt(i).price;
    }
  }
  return maxPrice;
}

double getMinPrice(List<Product> products) {
  double minPrice = products.elementAt(0).price;
  for (int i = 1; i < products.length; i++){
    if (products.elementAt(i).price > minPrice) {
      minPrice = products.elementAt(i).price;
    }
  }
  return minPrice;
}

List<Product> applyFilters(List<Product> product, bool available, bool limitedStock, bool outOfStock, bool notSpecified, double maxPrice, double minPrice, bool retailer1, bool retailer2, bool retailer3) {
  List<Product> filteredProducts = [];

  bool add = false;
  for (int i = 0; i < product.length; i++){
    // check availability
    if (available) {
      if (product.elementAt(i).getAvailability().compareTo("available") == 0) {
        add = true;
      }
    }
    else if (limitedStock) {
      if (product.elementAt(i).getAvailability().compareTo("limited stock") == 0) {
        add = true;
      }
    }
    else if (outOfStock) {
      if (product.elementAt(i).getAvailability().compareTo("out of stock") == 0) {
        add = true;
      }
    }
    else if(notSpecified){
      if (product.elementAt(i).getAvailability().compareTo("not specified") == 0) {
        add = true;
      }
    }

    //check within price range
    if (product.elementAt(i).price >= minPrice && product.elementAt(i).price <= maxPrice){
      add = true;
    }

    // check retailer
    if(retailer1){
      if(product.elementAt(i).retailer.toLowerCase().contains("evetech")){
        add = true;
      }
    }
    else if (retailer2) {
      if(product.elementAt(i).retailer.toLowerCase().contains("wootware")){
        add = true;
      }
    }
    else if (retailer3){
      if(product.elementAt(i).retailer.toLowerCase().contains("pc link")){
        add = true;
      }
    }

    //add product that applies to the filters
    if (add) {
      filteredProducts.add(product.elementAt(i));
    }
    add = false;
  }
  return filteredProducts;
}
