import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';

class MockWatchListService extends WatchListService
{
  MockWatchListService();

  @override
  Future addRequest(Product item) {
    // TODO: implement addRequest
    throw UnimplementedError();
  }

  @override
  Future removeRequest(Product item) {
    // TODO: implement removeRequest
    throw UnimplementedError();
  }

  @override
  Future<List<Product>> watchListRequest(bool mock) {
    // TODO: implement watchListRequest
    throw UnimplementedError();
  }

}