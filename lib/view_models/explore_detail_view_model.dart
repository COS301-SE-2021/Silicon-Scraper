import 'package:flutter/material.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/widgets/vertical_product_widget.dart';

class ExploreViewModel {
  List<Product> items=[];

  ExploreViewModel();

  String getTitle(String productType){
    String title = "Products";
    if (productType.compareTo("cpu") == 0){
      title = "CPUs";
    }
    else if (productType.compareTo("gpu") == 0){
      title = "GPUs";
    }
    return title;
  }

  List<Product> getExplorePageProducts(List<Product> unprocessedProducts, String productType){

    if (productType.compareTo("all") == 0){
      return unprocessedProducts;
    }
    List<Product> products = [];
    for(int i = 0; i < unprocessedProducts.length; i++){
      if (unprocessedProducts.elementAt(i).type.toLowerCase().compareTo(productType) == 0){
        products.add(unprocessedProducts.elementAt(i));
      }
    }
    return products;
  }

  // ListView horizontalProductListView(BuildContext context,items)
  // {
  //   return ListView.builder(
  //       itemCount:items.length ,
  //       itemBuilder: (_,index)
  //       {
  //         return HorizontalProductWidget(item:items[index]);
  //       }
  //   );
  // }
  //
  // ListView verticalProductListView(BuildContext context,items)
  // {
  //   return ListView.builder(
  //       itemCount:items.length ,
  //       itemBuilder: (_,index)
  //       {
  //         return VerticalProductWidget(item:items[index]);
  //       }
  //   );
  // }
}

class ExplorePageViewModelSingleton extends ExploreViewModel
{
  static ExplorePageViewModelSingleton _instance;
  ExplorePageViewModelSingleton._internal(){
//
  }
  static ExplorePageViewModelSingleton getState()
  {
    if(_instance==null)
    {
      _instance=ExplorePageViewModelSingleton._internal();
    }
    return _instance;
  }
}