import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';
import 'package:silicon_scraper/widgets/productWidget.dart';
import 'package:flutter/material.dart';

class WatchListViewModel
{
  WatchListSingleton watch= WatchListSingleton.getState();
  List<Product> items=[];

  bool findProduct(Product p)
  {
    for(var e in items)
    {
      if(e == p)
      {
        return true;
      }
    }
    return false;
  }

  Future removeItem(Product p) async
  {
    bool contains=false;
    for(var e in items)
    {
      if(e == p)
      {
        contains=true;
      }
    }
    if(contains)
    {
      items.remove(p);
    }
    else
    {
      return false;
    }
  }

  Future addProduct(Product p)async
  {
    bool contains=false;
    for(Product e in items)
    {
      if(e == p)
      {
        contains=true;
      }
    }

    if(!contains)
    {
      items.add(p);
    }
  }

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

class WatchListViewModelSingleton extends WatchListViewModel
{
  static WatchListViewModelSingleton _instance;

  WatchListViewModelSingleton._internal();

  static WatchListViewModelSingleton getState()
  {
    if(_instance==null)
    {
      _instance=WatchListViewModelSingleton._internal();
    }
    return _instance;
  }
}