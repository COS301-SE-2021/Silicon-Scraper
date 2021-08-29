import 'package:silicon_scraper/services/sign_up_service.dart';

class MockSignUpService extends SignUpService
{
  bool success;

  MockSignUpService(this.success);
  Future signUpRequest(String username,String password)async
  {

    if(success)
    {
      var data={
        "token": "guiguoguofauogoagysdvsd",
        "user": {
          "id": "dhgfuvwifboe",
          "username": "silicon",
          "password": "safe"
        }
      };
      return data;
    }
    else
    {
      throw Exception('Unable to register');
    }

    throw Exception('Unable to get products from the server');
  }
}