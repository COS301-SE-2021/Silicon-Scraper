import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/services/search_service.dart';

class MockSearchService extends SearchService {

  List<Product> items = [];

  @override
  Future searchRequest(String query) async {
    return await getProducts();
  }

  MockSearchService();

  @override
  Future<List<Product>> setProductList(String query) async {
    return await searchRequest(query);
  }

}