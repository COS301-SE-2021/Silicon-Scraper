
import 'package:silicon_scraper/mocks/mock_login_service.dart';
import 'package:silicon_scraper/services/login_service.dart';
import 'dependency_types.dart';

class LoginInjector
{
  static final LoginInjector _singleton = LoginInjector._internal();

  static DependencyType _type;
  static bool _success=false;


  static void configure(DependencyType depType,{bool success=false})
  {
    _type=depType;
    _success=success;
  }

  factory LoginInjector(){
    return _singleton;
  }

  LoginService get dependency{
    switch(_type)
    {
      case DependencyType.PROD:
        return LoginSingleton.getState();
      case DependencyType.MOCK:
        return MockLoginService(_success);
      default:
        return MockLoginService(_success);
    }
  }

  LoginInjector._internal();
}