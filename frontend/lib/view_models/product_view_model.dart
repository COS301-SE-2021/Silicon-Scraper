import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/theme/colors.dart';
import 'package:silicon_scraper/view_models/prediction_view_model.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
import 'package:flutter/material.dart';

class ProductViewModel extends ChangeNotifier
{
  WatchListViewModelSingleton watch=WatchListViewModelSingleton.getState();
  PredictionViewModel predict;
  final Product _item;

  Product get item => _item;
  Icon save;

  ProductViewModel(this._item)
  {
    predict=PredictionViewModel(_item);
    if(_item.watching)
      {
        save=Icon(Icons.bookmark,color: theOrange,);
      }
    else
    {
      save=Icon(Icons.bookmark_outline,color: Colors.black ,);
    }
  }

  Future<bool> changeState(context)async
  {
    if(_item.watching)
      {
        try
        {
          print('remove watch');
          print('change state ${_item.id}');
          await watch.removeProduct(_item);
          _item.watch=false;
          save=Icon(Icons.bookmark_outline,color: Colors.black ,);
          try{notifyListeners();}catch(e){}
          return true;
        }
        catch(e)
        {
          return showDialog(context: context, builder: (_)=> AlertDialog(
              title: Text("${e.message}")),);
          print(e.message);
        }
      }
    else
      {
        try
        {
          print('put in watch ${_item.id}');
//          print('change state ${_item.id}');
          await watch.addProduct(_item);
          _item.watch=true;
          save=Icon(Icons.bookmark,color: theOrange,);
          try{notifyListeners();}catch(e){}
          return true;
        }
        catch(e)
        {
          return showDialog(context: context, builder: (_)=> AlertDialog(
              title: Text("${e.message}")),);
          print(e.message);
        }
      }
  }

  Widget getAvailabilityText(double size,TextAlign align)
  {
    if(_item.stockAvailability==availability.inStock)
    {
      return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.green),textAlign: align,);
    }
    // else if(_item.stockAvailability==availability.notSpecified)
    // {
    //   return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.grey),textAlign: align);
    // }
    // else if(_item.stockAvailability==availability.outOfStock||_item.stockAvailability==availability.limitedStock)
    // {
    //   return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,color: Colors.red),textAlign: align);
    // }
    return Text(this.getAvailability(),style: TextStyle(fontSize: size,fontWeight: FontWeight.bold,),textAlign: align);
  }

  String getAvailability()
  {
    if(_item.stockAvailability==availability.inStock)
    {
      return "in stock";
    }
    // else if(_item.stockAvailability==availability.limitedStock)
    // {
    //   return "limited stock";
    // }
    else if(_item.stockAvailability==availability.outOfStock)
    {
      return "out of stock";
    }
    // else if(_item.stockAvailability==availability.notSpecified)
    // {
    //   return "not specified";
    // }
    return "out of stock";
  }
}