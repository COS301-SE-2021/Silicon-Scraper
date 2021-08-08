import 'package:silicon_scraper/mocks/mock_watch_list_service.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';
import 'dependency_types.dart';

class WatchListInjector
{
  static final WatchListInjector _singleton = WatchListInjector._internal();

  static DependencyType _type;
  static bool _initialReq=true;
  static bool _removeReq=true;
  static bool _addReq=true;


  static void configure(DependencyType depType,{bool initialReq=true,bool removeReq=true,bool addReq=true})
  {
    _type=depType;
    _initialReq=initialReq;
    _removeReq=removeReq;
    _addReq=addReq;
  }

   factory WatchListInjector(){
     return _singleton;
   }

  WatchListService get dependency{
    switch(_type)
    {
      case DependencyType.PROD:
        return WatchListSingleton.getState();
      case DependencyType.MOCK:
        return MockWatchListService(_initialReq,_removeReq,_addReq);
      default:
        return MockWatchListService(_initialReq,_removeReq,_addReq);
    }
  }

  WatchListInjector._internal();
}
