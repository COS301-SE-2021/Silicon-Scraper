
import 'package:silicon_scraper/mocks/mock_sign_up_service.dart';
import 'package:silicon_scraper/services/sign_up_service.dart';
import 'dependency_types.dart';

class SignUpInjector
{
  static final SignUpInjector _singleton = SignUpInjector._internal();

  static DependencyType _type;
  static bool _success=false;

  static void configure(DependencyType depType,{bool success=false})
  {
    _type=depType;
    _success=success;
  }

  factory SignUpInjector(){
    return _singleton;
  }

  SignUpService get dependency{
    switch(_type)
    {
      case DependencyType.PROD:
        return SignUpSingleton.getState();
      case DependencyType.MOCK:
        return MockSignUpService(_success);
      default:
        return MockSignUpService(_success);
    }
  }

  SignUpInjector._internal();
}