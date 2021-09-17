import 'package:silicon_scraper/models/product_model.dart';
import 'package:silicon_scraper/services/explore_page_service.dart';
import 'package:silicon_scraper/services/getProducts.dart';
import 'package:silicon_scraper/services/recommendation_page_service.dart';

class MockRecommendationPageService extends RecommendationPageService {

  static int page=0;
  static int limit=20;
  List<Product> items=[];

  MockRecommendationPageService() {
    //setItems();
  }

  @override
  Future recommendationPageRequest() async {
    return await getProducts();
  }

  @override
  Future setItems()async {
    items = await recommendationPageRequest();
    //print("setItems");
    return items;
  }

  @override
  void nextPage() {
    page++;
  }


}