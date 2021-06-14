
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/services/getProducts.dart';

class WatchListService
{
  List<Product> items=[];

  WatchListService()
  {
//    setItems();
  }
  void setItems()async
  {
    items=await getProducts();
    print("setItems");
  }
  void addItem(Product p)
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
  void removeItem(Product p)
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
  }

  Future<List<Product>> getProductlist()
  {
    return Future.value(items);
  }

}

class WatchListSingleton extends WatchListService
{
  static WatchListSingleton _instance;

  WatchListSingleton._internal(){
//    setItems();
    print("new singleton");
  }

  static WatchListSingleton getState()
  {
    if(_instance==null)
      {
        _instance=WatchListSingleton._internal();
      }
    return _instance;
  }
}