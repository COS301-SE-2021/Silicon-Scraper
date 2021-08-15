import 'package:silicon_scraper/services/login_service.dart';

class MockLoginService extends LoginService
{
  bool success;

  MockLoginService(this.success);

  Future<bool> LoginRequest(String username,password)async
  {

    if(success)
    {
      print('in');
      return true;
    }
    else
    {
      throw Exception("failed to login");
    }

  }

}


//todo get error codes from api and throw exact messages
