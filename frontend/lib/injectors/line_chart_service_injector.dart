import 'package:silicon_scraper/mocks/mock_line_chart_service.dart';
import 'package:silicon_scraper/services/line_chart_service.dart';
import 'dependency_types.dart';

class LineChartInjector
{
  static final LineChartInjector _singleton = LineChartInjector._internal();

  static DependencyType _type;
  static bool _success=true;

  static void configure(DependencyType depType,{bool success=true})
  {
    _type=depType;
    _success=success;
  }

  factory LineChartInjector(){
    return _singleton;
  }

  LineChartService get dependency{
    switch(_type)
    {
      case DependencyType.PROD:
        return LineChartSingleton.getState();
      case DependencyType.MOCK:
        return MockLineChartService(_success);
      default:
        return MockLineChartService(_success,);
    }
  }

  LineChartInjector._internal();
}