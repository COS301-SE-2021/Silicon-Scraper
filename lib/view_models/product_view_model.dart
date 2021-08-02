import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/theme/colors.dart';
import 'package:silicon_scraper/view_models/watch_list_view_model.dart';
import 'package:flutter/material.dart';

class ProductViewModel
{
  WatchListViewModelSingleton watch=WatchListViewModelSingleton.getState();
  final Product item;
  Icon save;

  ProductViewModel(this.item)
  {
    if(item.watch)
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
    if(item.watch)
      {
        try
        {
          print('remove watch');
          item.watch=!await watch.removeProduct(item);
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
          item.watch=await watch.addProduct(item);
          save=Icon(Icons.bookmark,color: theOrange,);
          return;
        }
        catch(e)
        {
          ///push error screen
        }
      }
  }

}