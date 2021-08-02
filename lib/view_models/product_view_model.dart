import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/theme/colors.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
import 'package:flutter/material.dart';

class ProductViewModel
{
  WatchListViewModelSingleton watch=WatchListViewModelSingleton.getState();
  final Product _item;
  Icon save;

  ProductViewModel(this._item)
  {
    if(_item.watch)
      {
        save=Icon(Icons.bookmark,color: theOrange,);
      }
    else
    {
      save=Icon(Icons.bookmark_outline,color: Colors.black ,);
    }
  }

  void changeState(context)async
  {
    if(_item.watch)
      {
        try
        {
          print('remove watch');
          _item.watch=!await watch.removeProduct(_item);
          save=Icon(Icons.bookmark_outline,color: Colors.black ,);
          return;
        }
        catch(e)
        {
          ///push error screen
        }
      }
    else
      {
        try
        {
          print('put in watch');
          _item.watch=await watch.addProduct(_item);
          save=Icon(Icons.bookmark,color: theOrange,);
          return;
        }
        catch(e)
        {
          ///push error screen
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