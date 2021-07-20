import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';

import 'json/productsjson.dart';

class MockWatchListService extends WatchListService
{
  MockWatchListService(this._initialReq, this._removeReq, this._addReq);
  /// attributes added to control the behaviour of our mock class
  bool _initialReq;
  bool _removeReq;
  bool _addReq;

  @override
  Future<List<Product>> watchListRequest()async
  {
    if(_initialReq)
      {
        return addProducts(JSONData());
      }
    else
      {
        throw Exception("error when sending initial request to server");
      }
  }

  @override
  Future addRequest(Product item)async
  {
    if(_addReq)
      {
        return true;
      }
    else
      {
        throw Exception("error when sending add request to server");
      }
  }

  @override
  Future removeRequest(Product item)async
  {
    if(_removeReq)
      {
        return true;
      }
    else
      {
        throw Exception("error when sending remove request to server");
      }
  }


}