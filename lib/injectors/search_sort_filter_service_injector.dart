import 'package:silicon_scraper/mocks/mock_search_service.dart';
import 'package:silicon_scraper/services/search_service.dart';
import 'dependency_types.dart';

class SearchSortFilterInjector {
  static final SearchSortFilterInjector _singleton =
      SearchSortFilterInjector._internal();

  static DependencyType _type;

  static void configure(DependencyType depType) {
    _type = depType;
  }

  factory SearchSortFilterInjector() {
    return _singleton;
  }

  DependencyType get dependencyType {
    switch (_type) {
      case DependencyType.PROD:
        return DependencyType.PROD;
      case DependencyType.MOCK:
        return DependencyType.MOCK;
      default:
        return DependencyType.MOCK;
    }
  }

  SearchService get dependency {
    switch (_type) {
      case DependencyType.PROD:
        return SearchService();
      case DependencyType.MOCK:
        return MockSearchService();
      default:
        return MockSearchService();
    }
  }

  SearchSortFilterInjector._internal();
}
