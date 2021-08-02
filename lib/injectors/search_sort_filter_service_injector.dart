import 'package:silicon_scraper/mocks/mock_explore_page_service.dart';
import 'package:silicon_scraper/services/explore_page_service.dart';
import 'package:silicon_scraper/services/search_service.dart';
import 'dependency_types.dart';

class SearchSortFilterInjector
{
  static final SearchSortFilterInjector _singleton = SearchSortFilterInjector._internal();

  static DependencyType _type;

  static void configure(DependencyType depType) {
    _type = depType;
  }

  factory SearchSortFilterInjector(){
    return _singleton;
  }

  SearchService get dependency{
    switch(_type) {
      case DependencyType.PROD:
        return SearchService();
      case DependencyType.MOCK:
        //return MockExplorePageService();
      default:
        //return MockExplorePageService();
    }
  }

  SearchSortFilterInjector._internal();
}
