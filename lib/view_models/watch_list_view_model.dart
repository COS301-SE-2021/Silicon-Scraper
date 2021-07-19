import 'package:silicon_scraper/injectors/watch_list_service_injector.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';
import 'package:silicon_scraper/widgets/horizontal_product_widget.dart';
import 'package:silicon_scraper/widgets/vertical_product_widget.dart';
import 'package:flutter/material.dart';

class WatchListViewModel
{
  WatchListInjector watch= WatchListInjector();
  List<Product> items=[];

  WatchListViewModel();

  Future setInitialProducts(bool mock)async
  {
    if(items.isNotEmpty)
      {
        return true;
      }
    else
      {
      try
      {
        items= await watch.dependency.watchListRequest(mock);
        return true;
      }
      catch(e)
      {
        //handle error message
        return;
      }
    }
  }

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

  Future removeItem(Product p)async
  {
    if(findProduct(p))
    {
      try
      {
        watch.dependency.removeRequest(p);// check response
        items.remove(p);
      }
      catch(e)
      {
        // display error message
      }
    }
    else
    {
      //display error message product is not in your watch list
    }
  }

  Future addProduct(Product p)async
  {
    if(findProduct(p))
    {
      try
      {
        watch.dependency.addRequest(p);// check response
        items.add(p);
      }
      catch(e)
      {
        // display error message
      }
    }
    else
    {
      //display message product is already in your watch list
    }
  }

  ListView horizontalProductListView(BuildContext context,items)
  {
    return ListView.builder(
        itemCount:items.length ,
        itemBuilder: (_,index)
        {
          return HorizontalProductWidget(item:items[index]);
        }
    );
  }

  ListView verticalProductListView(BuildContext context,items)
  {
    return ListView.builder(
        itemCount:items.length ,
        itemBuilder: (_,index)
        {
          return VerticalProductWidget(item:items[index]);
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