import 'package:silicon_scraper/mocks/json/mock_line_chart_service.dart';
import 'package:silicon_scraper/mocks/mock_watch_list_service.dart';
import 'package:silicon_scraper/services/line_chart_service.dart';
import 'package:silicon_scraper/services/watch_list_service.dart';
import 'dependency_types.dart';

class LineChartInjector
{
  static final LineChartInjector _singleton = LineChartInjector._internal();

  static DependencyType _type;
  static bool _initialReq=true;

  static void configure(DependencyType depType,{bool initialReq=true,bool removeReq=true,bool addReq=true})
  {
    _type=depType;
    _initialReq=initialReq;

  }

  factory LineChartInjector(){
    return _singleton;
  }

  LineChartService get dependency{
    switch(_type)
    {
      case DependencyType.PROD:
        return WatchListSingleton.getState();
      case DependencyType.MOCK:
        return MockLineChartService(_initialReq);
      default:
        return MockLineChartService(_initialReq,);
    }
  }

  LineChartInjector._internal();
}