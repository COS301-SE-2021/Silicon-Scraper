
import 'package:silicon_scraper/mocks/mock_sentiment_service.dart';
import 'package:silicon_scraper/services/sentiment_service.dart';

import 'dependency_types.dart';

class SentimentInjector
{
  static final SentimentInjector _singleton = SentimentInjector._internal();

  static DependencyType _type;
  static bool _success=false;

  static void configure(DependencyType depType,{bool success=false})
  {
    _type=depType;
    _success=success;
  }

  factory SentimentInjector(){
    return _singleton;
  }

  SentimentService get dependency{
    switch(_type)
    {
      case DependencyType.PROD:
        return SentimentSingleton.getState();
      case DependencyType.MOCK:
        return MockSentimentService(_success);
      default:
        return MockSentimentService(_success);
    }
  }

  SentimentInjector._internal();
}