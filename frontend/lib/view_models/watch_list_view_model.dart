import 'package:silicon_scraper/injectors/watch_list_service_injector.dart';
import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/view_models/product_view_model.dart';
import 'package:silicon_scraper/views/widgets/floating_product_widget.dart';
import 'package:silicon_scraper/views/widgets/horizontal_product_widget.dart';
import 'package:flutter/material.dart';
import 'package:silicon_scraper/views/widgets/vertical_product_widget.dart';

class WatchListViewModel extends ChangeNotifier
{
  WatchListInjector watch=WatchListInjector();
  List<Product> items=[];

  WatchListViewModel();

  Future setInitialProducts()async
  {
    if(items.isNotEmpty)
      {
        return true;
      }
    else
      {
      try
      {
        items= await watch.dependency.watchListRequest();
        return true;
      }
      catch(e)
      {
        throw e;
      }
    }
  }

  bool findProduct(Product p)
  {
    for(var e in items)
    {
      if(e.isTheSame(p))
      {
        return true;
      }
    }
    return false;
  }


  Future removeProduct(Product p)async
  {
    print('VM '+p.id);
    if(findProduct(p))
    {
      try
      {
        await watch.dependency.removeRequest(p);// check response
        items.removeWhere((t){ return t.id==p.id;});
        notifyListeners();
        return true;
      }
      catch(e)
      {
        throw e;
      }
    }
    else
    {
      //display error message product is not in your watch list
      throw Exception("can't remove a product that is not in your watch list");
    }
  }

  Future addProduct(Product p)async
  {
    print('VM '+p.id);
    if(!findProduct(p))
    {
      try
      {
        await watch.dependency.addRequest(p);// check response
        items.add(p);
        notifyListeners();
        return true;
      }
      catch(e)
      {
        throw e;
      }
    }
    else
    {
      //display message product is already in your watch list
      throw Exception("can't add a product that is already in your watch list");
    }
  }

  ListView horizontalProductListView(BuildContext context,items)
  {
    return ListView.builder(
        itemCount:items.length ,
        itemBuilder: (_,index)
        {
          return HorizontalProductWidget(state: ProductViewModel(items[index]));
        }
    );
  }

  ListView verticalProductListView(BuildContext context,items)
  {
    return ListView.builder(
        itemCount:items.length ,
        itemBuilder: (_,index)
        {
          return VerticalProductWidget(state: ProductViewModel(items[index]));
        }
    );
  }

  ListView floatingProductListView(BuildContext context,items)
  {
    return ListView.builder(
        itemCount:items.length ,
        itemBuilder: (_,index)
        {
          return FloatingProductWidget(state: ProductViewModel(items[index]));
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