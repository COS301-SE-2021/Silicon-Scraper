import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/explore_page_service.dart';
import 'package:silicon_scraper/services/getProducts.dart';

class MockExplorePageService extends ExplorePageService {

  static int page=0;
  static int limit=20;
  List<Product> items=[];

  MockExplorePageService() {
    //setItems();
  }

  @override
  Future explorePageRequest(String productType) async {
    return await getProducts();
  }

  @override
  Future setItems(String productType)async {
    items=await explorePageRequest(productType);
    //print("setItems");
    return items;
  }

  @override
  void nextPage() {
    page++;
  }


}