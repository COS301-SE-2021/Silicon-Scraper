import 'package:silicon_scraper/mocks/mock_recommendation_service.dart';
import 'package:silicon_scraper/services/recommendation_page_service.dart';

import 'dependency_types.dart';

class RecommendationPageInjector
{
  static final RecommendationPageInjector _singleton = RecommendationPageInjector._internal();

  static DependencyType _type;

  static void configure(DependencyType depType) {
    _type = depType;
  }

  factory RecommendationPageInjector(){
    return _singleton;
  }

  RecommendationPageService get dependency{
    switch(_type) {
      case DependencyType.PROD:
      //print("Explore getting production service");
        return RecommendationPageService();
      case DependencyType.MOCK:
      //print("Explore getting mock service");
        return MockRecommendationPageService();
      default:
      //print("Explore getting default: mock service");
        return MockRecommendationPageService();
    }
  }

  RecommendationPageInjector._internal();
}
