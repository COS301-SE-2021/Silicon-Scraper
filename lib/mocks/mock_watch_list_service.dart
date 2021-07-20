import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';

import 'json/productsjson.dart';

class MockWatchListService extends WatchListService
{
  MockWatchListService();
  /// attributes added to control the behaviour of our mock class
  bool _initialReq=true;
  bool _removeReq=true;
  bool _addReq=true;

  bool get initialReq => _initialReq;
  bool get removeReq => _removeReq;
  bool get addReq => _addReq;

  set initialReq(bool value)
  {
    _initialReq = value;
  }
  set removeReq(bool value)
  {
    _removeReq = value;
  }
  set addReq(bool value)
  {
    _addReq = value;
  }


  @override
  Future<List<Product>> watchListRequest()async
  {
    if(initialReq)
      {
        return addProducts(JSONData());
      }
    else
      {
//        throw
      }
  }

  @override
  Future addRequest(Product item)async
  {
    if(addReq)
      {
        return true;
      }
    else
      {
//        throw
      }
  }

  @override
  Future removeRequest(Product item)async
  {
    if(removeReq)
      {
        return true;
      }
    else
      {
//        throw
      }
  }


}