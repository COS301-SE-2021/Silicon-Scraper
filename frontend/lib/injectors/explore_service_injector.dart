import 'package:silicon_scraper/mocks/mock_explore_page_service.dart';
import 'package:silicon_scraper/services/explore_page_service.dart';
import 'dependency_types.dart';

class ExplorePageInjector
{
  static final ExplorePageInjector _singleton = ExplorePageInjector._internal();

  static DependencyType _type;

  static void configure(DependencyType depType) {
    _type = depType;
  }

  factory ExplorePageInjector(){
    return _singleton;
  }

  ExplorePageService get dependency{
    switch(_type) {
      case DependencyType.PROD:
        //print("Explore getting production service");
        return ExplorePageService();
      case DependencyType.MOCK:
        //print("Explore getting mock service");
        return MockExplorePageService();
      default:
        //print("Explore getting default: mock service");
        return MockExplorePageService();
    }
  }

  ExplorePageInjector._internal();
}
