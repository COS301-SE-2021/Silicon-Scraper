
import 'package:silicon_scraper/classes/product.dart';
import 'package:silicon_scraper/services/getProducts.dart';

class WatchListService
{
  List<Product> items=[];

  WatchListService()
  {
    setItems();
  }
  void setItems()async
  {
    items=await getProducts();
  }
  void addItem()
  {

  }
  void removeItem()
  {

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
    setItems();
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