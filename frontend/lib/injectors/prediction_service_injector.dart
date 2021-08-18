import 'package:silicon_scraper/mocks/mock_prediction_service.dart';
import 'package:silicon_scraper/services/prediction_service.dart';

import 'dependency_types.dart';

class PredictionInjector
{
  static final PredictionInjector _singleton = PredictionInjector._internal();

  static DependencyType _type;
  static bool _fail=false;

  static void configure(DependencyType depType,{bool fail=false})
  {
    _type=depType;
   _fail=fail;
  }

  factory PredictionInjector(){
    return _singleton;
  }

  PredictionService get dependency{
    switch(_type)
    {
      case DependencyType.PROD:
        return PredictionServiceSingleton.getState();
      case DependencyType.MOCK:
        return MockPredictionService(_fail);
      default:
        return MockPredictionService(_fail);
    }
  }

  PredictionInjector._internal();
}