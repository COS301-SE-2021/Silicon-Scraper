import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/theme/colors.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
import 'package:flutter/material.dart';

class ProductViewModel
{
  WatchListViewModelSingleton watch=WatchListViewModelSingleton.getState();
  final Product _item;

  Product get item => _item;
  Icon save;

  ProductViewModel(this._item)
  {
    if(_item.watching)
      {
        save=Icon(Icons.bookmark,color: theOrange,);
      }
    else
    {
      save=Icon(Icons.bookmark_outline,color: Colors.black ,);
    }
  }

  Future changeState(context)async
  {
    if(_item.watching)
      {
        try
        {
          print('remove watch');
          print('change state ${_item.id}');
          watch.removeProduct(_item);
          _item.watch=false;
          save=Icon(Icons.bookmark_outline,color: Colors.black ,);
          return;
        }
        catch(e)
        {
          ///push error screen
          print(e.message);
        }
      }
    else
      {
        try
        {
          print('put in watch ${_item.id}');
//          print('change state ${_item.id}');
           watch.addProduct(_item);
          _item.watch=true;
          save=Icon(Icons.bookmark,color: theOrange,);
          return;
        }
        catch(e)
        {
          ///push error screen
          print(e.message);
        }
      }
  }

  Widget getAvailabilityText(double size,TextAlign align)
  {
    if(_item.stockAvailability==availability.available)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.green),textAlign: align,);
    }
    else if(_item.stockAvailability==availability.notSpecified)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.grey),textAlign: align);
    }
    else if(_item.stockAvailability==availability.outOfStock||_item.stockAvailability==availability.limitedStock)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.red),textAlign: align);
    }
    return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,),textAlign: align);
  }

  String getAvailability()
  {
    if(_item.stockAvailability==availability.available)
    {
      return "available";
    }
    else if(_item.stockAvailability==availability.limitedStock)
    {
      return "limited stock";
    }
    else if(_item.stockAvailability==availability.outOfStock)
    {
      return "out of stock";
    }
    else if(_item.stockAvailability==availability.notSpecified)
    {
      return "not specified";
    }
    return "not specified";
  }
}