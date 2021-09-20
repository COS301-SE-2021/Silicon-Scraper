import 'package:flutter/cupertino.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/view_models/product_view_model.dart';
import 'package:silicon_scraper/views/widgets/floating_product_widget.dart';
import 'package:silicon_scraper/views/widgets/horizontal_product_widget.dart';
import 'package:silicon_scraper/views/widgets/vertical_product_widget.dart';

List<Product> addProducts(List json)
{
    List<Product> items=[];
    if(json.length>0)
      {
        for(int i=0;i<json.length;i++)
        {
          String name=json[i]['brand'];
          String model=json[i]['model'];
          double price=json[i]['price'].toDouble();
          String retailer=json[i]['retailer'];
          Map<String,dynamic> des=json[i]['description'];
          List<String> description=[];
          des.forEach((k,v) => description.add("$k"+"$v") );
          String url=json[i]['url'];
          String photo=json[i]['image'];
          String sAvailability=json[i]['availability'];
          String id=json[i]['id'];
          String type=json[i]['type'].toUpperCase();
          bool watch =json[i]['watch'];
          if(url==null)
            {
              url=json[i]['link'];
            }
          if(watch==null)
            {
              watch=false;
            }
          items.add(new Product(name, model, price, retailer, description, url, photo, sAvailability,id,type,watch));
        }
      }
    return items;
}

Future<String>_loadFromAsset() async {
  return await rootBundle.loadString("lib/mocks/json/products.json");
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

ListView productListView(BuildContext context,List<Product> items)
{
  return ListView.builder(
    itemCount:items.length ,
      itemBuilder: (_,index){
        return
            HorizontalProductWidget( state: ProductViewModel(items[index]));
      },
  );
}

GridView gridProductListView(BuildContext context, List<Product> items){
  // return GridView.builder(
  //   //crossAxisCount: 2,
  //   mainAxisSpacing: 15.0,
  //   scrollDirection: Axis.vertical,
  //   children: List.generate(items.length, (index) {
  //     return Center(child: VerticalProductWidget( state: ProductViewModel(items[index]))
  //     );
  //   }),
  // );

  return GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 8,
        mainAxisSpacing: 4,
        childAspectRatio: 1/1.3,
      ),
      itemCount: items.length,
      itemBuilder: (BuildContext context, int index) {
        return VerticalProductWidget( state: ProductViewModel(items[index]));
      }
  );
}

ListView productHorizontalListView(BuildContext context,List<Product> items)
{
  return ListView.builder(
      itemCount:10 ,
      scrollDirection: Axis.horizontal,
      itemBuilder: (_,index){
        return
          VerticalProductWidget( state: ProductViewModel(items[index]));
      }
  );
}

Center noProducts(BuildContext context, String productType){
  return Center(
    child: Padding(
      padding: EdgeInsets.all(25),
      child: RichText(
        textAlign: TextAlign.center,
        text: TextSpan(
          style: TextStyle(
            color: Colors.black12,
            fontWeight: FontWeight.bold,
            fontSize: 30,
          ),
          text: 'NO ' + productType +' \n TO DISPLAY',
        ),
      ),
    ),
  );
}

Center noConnection(BuildContext context){
  return Center(
    child: Padding(
      padding: EdgeInsets.all(25),
      child: RichText(
        textAlign: TextAlign.center,
        text: TextSpan(
          style: TextStyle(
            color: Colors.black12,
            fontWeight: FontWeight.bold,
            fontSize: 30,
          ),
          text: 'NO INTERNET \n CONNECTION',
        ),
      ),
    ),
  );
}



