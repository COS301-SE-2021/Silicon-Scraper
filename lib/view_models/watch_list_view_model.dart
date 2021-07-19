import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';
import 'package:silicon_scraper/widgets/productWidget.dart';
import 'package:flutter/material.dart';

class WatchListViewModel
{
  WatchListSingleton watch= WatchListSingleton.getState();
  List<Product> items=[];



  ListView horizontalProductListView(BuildContext context,items)
  {
    return ListView.builder(
        itemCount:items.length ,
        itemBuilder: (_,index)
        {
          return ProductWidget(item:items[index]);
        }
    );
  }

}