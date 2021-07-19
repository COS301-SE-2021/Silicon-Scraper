import 'package:silicon_scraper/mocks/mock_watch_list_service.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';
import 'dependency_types.dart';

class WatchListInjector
{
  static final WatchListInjector _singleton = WatchListInjector._internal();

  static DependencyType _type;

  static void configure(DependencyType depType)
  {
    _type=depType;
  }

   factory WatchListInjector(){
     return _singleton;
   }

  WatchListService get dependency{
    switch(_type)
    {
      case DependencyType.PROD:
        return WatchListService();
      case DependencyType.MOCK:
        return MockWatchListService();
      default:
        return MockWatchListService();
    }
  }

  WatchListInjector._internal();
}
